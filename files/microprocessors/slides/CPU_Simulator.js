/* CPU Simulator: 8-bit accumulator CPU, five-phase micro-steps */
(function () {
'use strict';
if (!document.getElementById('cpu-sim')) return;
const $ = id => document.getElementById(id);
const EXAMPLES = {
  sum: {
    help: 'Accumulate 1 + 2 + 3 + 4 + 5. Expected output: 15. RAM[240] is the total; RAM[241] is the counter.',
    code: `; Sum 1 to 5\n.DATA 240 0\n.DATA 241 1\nloop: LDA 240\nADDM 241\nSTA 240\nLDA 241\nADD 1\nSTA 241\nCMP 6\nJNZ loop\nLDA 240\nOUT\nHLT`
  },
  arithmetic: {
    help: 'Compute (5 + 9) × 2 using a shift, then store the result. Expected output: 28.',
    code: `LDI 5\nADD 9\nSHL\nSTA 200\nOUT\nHLT`
  },
  overflow: {
    help: '250 + 10 wraps to 4 with carry. JC skips the fallback. Expected output: 4.',
    code: `LDI 250\nADD 10\nJC carried\nLDI 0\ncarried: OUT\nHLT`
  },
  multiply: {
    help: 'Multiply 7 × 6 by repeated addition. Expected output: 42.',
    code: `.DATA 240 0\n.DATA 241 6\nloop: LDA 240\nADD 7\nSTA 240\nLDA 241\nSUB 1\nSTA 241\nJNZ loop\nLDA 240\nOUT\nHLT`
  },
  input: {
    help: 'Queue a number. Output is 1 if it equals 10; otherwise 0. IN waits until a byte is queued.',
    code: `IN\nCMP 10\nJZ equal\nLDI 0\nJMP done\nequal: LDI 1\ndone: OUT\nHLT`
  },
  bits: {
    help: 'Mask the low nibble, invert it with XOR, then shift right. Expected output: 5, 250, 125.',
    code: `LDI 0b10100101\nAND 0x0F\nOUT\nXOR 255\nOUT\nSHR\nOUT\nHLT`
  }
};
const OPS = {
  LDI: 'imm',
  LDA: 'mem',
  STA: 'mem',
  ADD: 'imm',
  SUB: 'imm',
  ADDM: 'mem',
  SUBM: 'mem',
  AND: 'imm',
  OR: 'imm',
  XOR: 'imm',
  CMP: 'imm',
  JMP: 'jump',
  JZ: 'jump',
  JNZ: 'jump',
  JC: 'jump',
  JN: 'jump',
  NOT: 'none',
  SHL: 'none',
  SHR: 'none',
  IN: 'none',
  OUT: 'none',
  NOP: 'none',
  HLT: 'none'
};

function number(t) {
  if (!/^(?:\d+|0x[\da-f]+|0b[01]+)$/i.test(t)) throw Error('Invalid number: ' + t);
  const n = Number(t);
  if (!Number.isInteger(n) || n < 0 || n > 255) throw Error('Byte/address must be 0–255: ' + t);
  return n;
}

function compile(src) {
  let rows = [],
    labels = {},
    data = Array(256).fill(0);
  src.split(/\r?\n/).forEach((line, i) => {
    let s = line.split(';')[0].trim();
    if (!s) return;
    const m = s.match(/^([A-Za-z_]\w*):\s*/);
    let label = null;
    if (m) {
      label = m[1].toUpperCase();
      if (Object.hasOwn(OPS, label)) throw Error('Line ' + (i + 1) + ': ' + m[1] + ' is an instruction name and cannot be a label');
      if (Object.hasOwn(labels, label)) throw Error('Line ' + (i + 1) + ': duplicate label ' + m[1]);
      labels[label] = rows.length;
      s = s.slice(m[0].length).trim();
    }
    if (!s) return;
    const parts = s.replace(/,/g, ' ').split(/\s+/);
    if (parts[0].toUpperCase() === '.DATA') {
      if (label) throw Error('Line ' + (i + 1) + ': a label cannot mark a .DATA line (labels name instructions)');
      if (parts.length !== 3) throw Error('Line ' + (i + 1) + ': .DATA needs address and value');
      try {
        data[number(parts[1])] = number(parts[2]);
      } catch (e) {
        throw Error('Line ' + (i + 1) + ': ' + e.message);
      }
      return;
    }
    rows.push({
      op: parts[0].toUpperCase(),
      args: parts.slice(1),
      line: i + 1
    });
  });
  if (!rows.length || rows.length > 256) throw Error('Use 1–256 instructions.');
  const program = rows.map(r => {
    if (!Object.hasOwn(OPS, r.op)) throw Error('Line ' + r.line + ': unknown instruction ' + r.op);
    let kind = OPS[r.op];
    if (r.args.length !== (kind === 'none' ? 0 : 1)) throw Error('Line ' + r.line + ': incorrect operand count');
    let arg = null;
    if (kind !== 'none') {
      const token = r.args[0].toUpperCase();
      if (kind === 'jump' && Object.hasOwn(labels, token)) arg = labels[token];
      else if (kind === 'jump' && /^[A-Z_]\w*$/.test(token)) throw Error('Line ' + r.line + ': unknown label ' + r.args[0]);
      else {
        try {
          arg = number(r.args[0]);
        } catch (e) {
          throw Error('Line ' + r.line + ': ' + e.message);
        }
      }
      if (kind === 'jump' && arg >= rows.length) throw Error('Line ' + r.line + ': jump outside program');
    }
    return {
      op: r.op,
      arg,
      line: r.line,
      text: r.op + (arg === null ? '' : ' ' + arg)
    };
  });
  return {
    program,
    data
  };
}
let assembled = null,
  program = [],
  s, history = [],
  running = false,
  timer = null,
  breaks = new Set(),
  selected = 0,
  dirty = false,
  budget = 0;

function fresh(data) {
  return {
    pc: 0,
    acc: 0,
    z: 0,
    n: 0,
    c: 0,
    ram: [...data],
    phase: 0,
    last: -1,
    ir: null,
    at: 0,
    operand: null,
    mar: null,
    mdr: null,
    pending: null,
    halted: false,
    waiting: false,
    fault: false,
    count: 0,
    ticks: 0,
    output: [],
    input: [],
    trace: [],
    changed: null,
    active: [],
    wires: [],
    text: 'Ready. Fetch the first instruction to begin.'
  };
}

function flags(n, c = 0) {
  return {
    z: +(n === 0),
    n: +!!(n & 128),
    c: +!!c
  };
}

function fmt(n) {
  if (n === null || n === undefined) return '—';
  const f = $('format').value;
  return f === 'hex' ? '0x' + n.toString(16).toUpperCase().padStart(2, '0') : f === 'bin' ? n.toString(2).padStart(8, '0') : String(n);
}

/* addresses follow the chosen format too (binary values keep hex addresses) */
function addr(n) {
  if (n === null || n === undefined) return '—';
  return $('format').value === 'dec' ? String(n) : '0x' + n.toString(16).toUpperCase().padStart(2, '0');
}

/* show the data-memory page the program actually uses */
function focusPage() {
  const first = program.find(ins => OPS[ins.op] === 'mem');
  const used = first ? first.arg : assembled.data.findIndex(v => v !== 0);
  const at = used >= 0 ? used : 0;
  $('page').value = String(Math.floor(at / 32) * 32);
  selected = at;
}

function pause() {
  running = false;
  clearTimeout(timer);
  timer = null;
}

function reset() {
  pause();
  if (!assembled) return;
  s = fresh(assembled.data);
  history = [];
  render();
}

function assemble() {
  pause();
  try {
    const result = compile($('source').value);
    assembled = result;
    program = result.program;
    breaks.clear();
    dirty = false;
    focusPage();
    reset();
    message(program.length + ' instructions assembled. Ready.');
  } catch (e) {
    dirty = true;
    message(e.message, true);
    render();
  }
}

function message(t, error = false) {
  $('message').textContent = t;
  $('message').classList.toggle('error', error);
}

function micro() {
  if (!s || dirty || s.halted || s.fault) return false;
  if (s.phase === 0 && s.pc >= program.length) {
    s.fault = true;
    s.text = 'PC is outside the program. Add HLT or a valid jump.';
    pause();
    render();
    return false;
  }
  if (s.phase === 2 && s.ir.op === 'IN' && !s.input.length) {
    s.waiting = true;
    s.text = 'IN is waiting. Queue a byte, then continue.';
    pause();
    render();
    return false;
  }
  history.push(JSON.stringify(s));
  if (history.length > 2000) history.shift();
  s.waiting = false;
  s.active = [];
  s.wires = [];
  s.changed = null;
  const phase = s.phase;
  s.last = phase;
  if (phase === 0) {
    s.at = s.pc;
    s.ir = program[s.pc++];
    s.operand = null;
    s.pending = null;
    s.mar = null;
    s.mdr = null;
    s.active = ['Program', 'PC', 'IR'];
    s.wires = ['Fetch', 'PC'];
    s.text = 'IR ← program[' + s.at + ']; PC ← ' + s.pc + '. Fetched ' + s.ir.text + '.';
  }
  if (phase === 1) {
    s.active = ['IR', 'Control'];
    s.wires = ['Decode'];
    s.text = 'Decode ' + s.ir.op + ': ' + ({
      imm: 'immediate operand',
      mem: 'RAM address',
      jump: 'branch target',
      none: 'no explicit operand'
    } [OPS[s.ir.op]]) + '.';
  }
  if (phase === 2) {
    const {
      op,
      arg
    } = s.ir;
    const k = OPS[op];
    if (k === 'mem') {
      s.mar = arg;
      if (op === 'STA') {
        s.operand = s.acc;
        s.text = 'MAR ← ' + arg + '; prepare ACC for a RAM write.';
        s.active = ['RAM', 'ACC'];
        s.wires = ['Address'];
      } else {
        s.mdr = s.ram[arg];
        s.operand = s.mdr;
        s.text = 'MAR ← ' + arg + '; MDR ← RAM[' + arg + '] = ' + s.mdr + '.';
        s.active = ['RAM', 'Operand'];
        s.wires = ['Address', 'Read'];
      }
    } else if (op === 'IN') {
      s.operand = s.input[0];
      s.active = ['Operand'];
      s.text = 'Latch the next input byte: ' + s.operand + '. It is consumed at write back.';
    } else if (arg !== null) {
      s.operand = arg;
      s.active = ['IR', 'Operand'];
      s.wires = ['Immediate'];
      s.text = 'Operand latch ← ' + arg + '.';
    } else {
      s.text = 'No operand transfer is needed for ' + op + '.';
      s.active = ['Control'];
    }
  }
  if (phase === 3) {
    const {
      op,
      arg
    } = s.ir;
    const a = s.acc,
      b = s.operand;
    let p = {};
    let raw = null,
      c = 0;
    switch (op) {
      case 'LDI':
      case 'LDA':
      case 'IN':
        raw = b;
        break;
      case 'ADD':
      case 'ADDM':
        raw = a + b;
        c = raw > 255;
        break;
      case 'SUB':
      case 'SUBM':
      case 'CMP':
        raw = a - b;
        c = raw < 0;
        break;
      case 'AND':
        raw = a & b;
        break;
      case 'OR':
        raw = a | b;
        break;
      case 'XOR':
        raw = a ^ b;
        break;
      case 'NOT':
        raw = (~a) & 255;
        break;
      case 'SHL':
        raw = a << 1;
        c = !!(a & 128);
        break;
      case 'SHR':
        raw = a >>> 1;
        c = a & 1;
        break;
      case 'STA':
        p.store = [arg, a];
        break;
      case 'OUT':
        p.out = a;
        break;
      case 'HLT':
        p.halt = true;
        break;
      case 'JMP':
      case 'JZ':
      case 'JNZ':
      case 'JC':
      case 'JN':
        p.taken = op === 'JMP' || op === 'JZ' && s.z === 1 || op === 'JNZ' && s.z === 0 || op === 'JC' && s.c === 1 || op === 'JN' && s.n === 1;
        if (p.taken) p.pc = arg;
        break;
    }
    if (raw !== null) {
      p.result = ((raw % 256) + 256) % 256;
      p.flags = flags(p.result, c);
      if (op !== 'CMP') p.acc = p.result;
      const load = ['LDI', 'LDA', 'IN'].includes(op),
        unary = ['NOT', 'SHL', 'SHR'].includes(op);
      s.active = load ? ['Operand', 'ALU'] : unary ? ['ACC', 'ALU'] : ['ACC', 'Operand', 'ALU'];
      s.wires = load ? ['Operand'] : unary ? ['Acc'] : ['Acc', 'Operand'];
      s.text = op + ': result = ' + p.result + (raw !== p.result ? ' (wrapped from ' + raw + ')' : '') + '; pending flags Z=' + p.flags.z + ', N=' + p.flags.n + ', C=' + p.flags.c + '.';
    } else if (OPS[op] === 'jump') {
      s.active = ['Control', 'Flags'];
      s.text = op + ': branch ' + (p.taken ? 'taken → ' + arg : 'not taken') + '.';
    } else {
      s.active = ['Control'];
      s.text = op + ': ' + (op === 'STA' ? 'prepare RAM write' : op === 'OUT' ? 'prepare output' : op === 'HLT' ? 'prepare halt' : 'no state change') + '.';
    }
    s.pending = p;
  }
  if (phase === 4) {
    const p = s.pending,
      op = s.ir.op;
    if (p.acc !== undefined) {
      s.acc = p.acc;
      s.active.push('ACC');
      s.wires.push('Write');
    }
    if (p.flags) {
      Object.assign(s, p.flags);
      s.active.push('Flags');
      s.wires.push('Flags');
    }
    if (p.store) {
      s.ram[p.store[0]] = p.store[1];
      s.changed = p.store[0];
      s.mdr = p.store[1];
      s.active.push('RAM', 'ACC');
      s.wires.push('Store');
    }
    if (p.pc !== undefined) {
      s.pc = p.pc;
      s.active.push('PC', 'Control');
      s.wires.push('Branch');
    }
    if (p.out !== undefined) {
      s.output.push(p.out);
      s.active.push('Output', 'ACC');
      s.wires.push('Out');
    }
    if (op === 'IN') s.input.shift();
    if (p.halt) s.halted = true;
    s.count++;
    s.trace.push(String(s.at).padStart(3, '0') + '  ' + s.ir.text.padEnd(10) + ' ACC=' + fmt(s.acc) + ' Z' + s.z + ' N' + s.n + ' C' + s.c);
    if (s.trace.length > 100) s.trace.shift();
    s.text = 'Committed ' + s.ir.text + '. ' + (s.halted ? 'CPU halted.' : p.store ? 'RAM[' + p.store[0] + '] ← ' + p.store[1] + '.' : 'Next PC = ' + s.pc + '.');
  }
  s.ticks++;
  s.phase = (phase + 1) % 5;
  if (s.halted) pause();
  render();
  return true;
}

function instruction() {
  pause();
  let guard = 0;
  do {
    if (!micro()) break;
  } while (s.phase !== 0 && ++guard < 5);
}

function run() {
  if (!s || running || dirty || s.halted || s.fault) return;
  running = true;
  budget = 0;
  let skip = s.phase === 0 ? s.pc : null;

  function tick() {
    if (!running) return;
    if (s.phase === 0 && breaks.has(s.pc) && s.pc !== skip) {
      pause();
      s.text = 'Breakpoint before instruction ' + s.pc + '. Press Run to resume.';
      render();
      return;
    }
    if (!micro()) {
      pause();
      return;
    }
    skip = null;
    if (++budget >= 10000) {
      pause();
      s.text = 'Paused after 10,000 micro-steps. Run to continue.';
      render();
      return;
    }
    if (running) timer = setTimeout(tick, 1100 - Number($('speed').value) * 100);
  }
  tick();
}

function render() {
  if (!s) return;
  for (const id of ['Program', 'PC', 'IR', 'Control', 'RAM', 'ACC', 'Operand', 'ALU', 'Flags', 'Output']) $('n' + id).classList.toggle('active', s.active.includes(id));
  for (const id of ['Fetch', 'PC', 'Decode', 'Read', 'Operand', 'Acc', 'Write', 'Store', 'Out', 'Address', 'Immediate', 'Branch', 'Flags']) $('w' + id).classList.toggle('on', s.wires.includes(id));
  $('vProgram').textContent = s.ir ? s.ir.text : 'slot 0';
  $('vPC').textContent = fmt(s.pc);
  $('vIR').textContent = s.ir ? s.ir.text : '—';
  $('vControl').textContent = ['FETCH', 'DECODE', 'OPERAND', 'EXECUTE', 'WRITE BACK'][s.last] || 'READY';
  $('vMAR').textContent = 'MAR: ' + fmt(s.mar);
  $('vMDR').textContent = 'MDR: ' + fmt(s.mdr);
  const ramStart = Math.floor((s.mar ?? selected) / 8) * 8;
  for (let i = 0; i < 8; i++) {
    const address = ramStart + i;
    $('ramAddress' + i).textContent = addr(address);
    $('ramData' + i).textContent = fmt(s.ram[address]);
    $('ramRow' + i).classList.toggle('is-mar', address === s.mar);
    $('ramRow' + i).classList.toggle('is-sel', address !== s.mar && address === selected);
  }
  $('vACC').textContent = fmt(s.acc);
  $('vOperand').textContent = fmt(s.operand);
  $('vResult').textContent = s.pending?.result === undefined ? '—' : fmt(s.pending.result);
  $('vFlags').textContent = 'Z ' + s.z + ' · N ' + s.n + ' · C ' + s.c;
  $('vOutput').textContent = fmt(s.output.at(-1));
  $('status').textContent = dirty ? 'Reassemble' : s.fault ? 'Fault' : s.halted ? 'Halted' : s.waiting ? 'Waiting' : running ? 'Running' : 'Paused';
  $('explanation').textContent = s.text;
  [...$('phases').children].forEach((el, i) => el.classList.toggle('active', i === s.last));
  $('count').textContent = s.count;
  $('ticks').textContent = s.ticks;
  $('binary').textContent = s.acc.toString(2).padStart(8, '0');
  $('signed').textContent = s.acc > 127 ? s.acc - 256 : s.acc;
  $('output').textContent = s.output.length ? s.output.map(fmt).join('  ') : 'No output yet.';
  $('queued').textContent = 'Input queue: ' + (s.input.length ? s.input.map(fmt).join(', ') : 'empty');
  $('trace').textContent = s.trace.join('\n') || 'Waiting for the first instruction.';
  $('trace').scrollTop = $('trace').scrollHeight;
  $('listing').replaceChildren();
  program.forEach((ins, i) => {
    const row = document.createElement('tr');
    row.className = i === (s.phase === 0 ? s.pc : s.at) ? 'current' : '';
    const td = document.createElement('td'),
      bt = document.createElement('button');
    bt.className = 'break' + (breaks.has(i) ? ' set' : '');
    bt.textContent = breaks.has(i) ? '●' : '○';
    bt.setAttribute('aria-label', 'Toggle breakpoint at ' + i);
    bt.setAttribute('aria-pressed', String(breaks.has(i)));
    bt.onclick = () => {
      breaks.has(i) ? breaks.delete(i) : breaks.add(i);
      render();
    };
    td.append(bt);
    row.append(td);
    for (const text of [String(i).padStart(3, '0'), ins.text]) {
      const cell = document.createElement('td');
      cell.textContent = text;
      row.append(cell);
    }
    $('listing').append(row);
  });
  $('memory').replaceChildren();
  $('memory').style.gridTemplateColumns = $('format').value === 'bin' ? 'repeat(4,1fr)' : 'repeat(8,1fr)';
  let start = Number($('page').value) || 0;
  for (let i = start; i < start + 32; i++) {
    const bt = document.createElement('button');
    bt.className = 'cell' + (s.changed === i ? ' changed' : '') + (selected === i ? ' selected' : '');
    bt.setAttribute('aria-label', 'RAM address ' + i + ', value ' + s.ram[i]);
    const sm = document.createElement('small');
    sm.textContent = addr(i);
    bt.append(sm, document.createTextNode(fmt(s.ram[i])));
    bt.onclick = () => {
      selected = i;
      $('memValue').value = s.ram[i];
      render();
    };
    $('memory').append(bt);
  }
  $('address').textContent = 'Address ' + addr(selected);
  $('run').disabled = running || dirty || s.halted || s.fault;
  for (const id of ['micro', 'step']) $(id).disabled = running || dirty || s.halted || s.fault;
  $('back').disabled = running || dirty || !history.length;
  $('pause').disabled = !running;
  $('memWrite').disabled = running || dirty || s.phase !== 0;
  $('queue').disabled = running;
  $('input').disabled = running;
}
for (let i = 0; i < 256; i += 32) {
  const o = document.createElement('option');
  o.value = i;
  o.textContent = i + '–' + (i + 31);
  $('page').append(o);
}
$('run').onclick = run;
$('pause').onclick = () => {
  pause();
  render();
};
$('micro').onclick = () => micro();
$('step').onclick = instruction;
$('back').onclick = () => {
  pause();
  if (history.length) s = JSON.parse(history.pop());
  render();
};
$('reset').onclick = reset;
$('assemble').onclick = assemble;
$('format').onchange = render;
$('page').onchange = render;
$('speed').oninput = () => {
  $('speedText').textContent = $('speed').value + ' / 10';
};
$('source').oninput = () => {
  pause();
  dirty = true;
  message('Source changed. Assemble & reset to apply it.');
  render();
};
$('memWrite').onclick = () => {
  try {
    const value = number($('memValue').value.trim());
    s.ram[selected] = value;
    s.changed = selected;
    history = [];
    message('RAM[' + selected + '] updated. Reset restores .DATA values.');
    render();
  } catch (e) {
    message(e.message, true);
  }
};
$('queue').onclick = () => {
  try {
    const tokens = $('input').value.trim().split(/[\s,]+/);
    const values = tokens.map(number);
    s.input.push(...values);
    s.waiting = false;
    history = [];
    $('input').value = '';
    message('Queued ' + values.length + ' byte(s).');
    render();
  } catch (e) {
    message(e.message, true);
  }
};

function example() {
  const ex = EXAMPLES[$('example').value];
  $('source').value = ex.code;
  $('exampleHelp').textContent = ex.help;
  assemble();
}
$('example').onchange = example;
$('save').onclick = () => {
  const blob = new Blob([$('source').value], {
    type: 'text/plain'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cpu-program.asm';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$('load').onclick = () => $('file').click();
$('file').onchange = async () => {
  const f = $('file').files[0];
  if (!f) return;
  if (f.size > 100000) {
    message('Source file must be smaller than 100 KB.', true);
    return;
  }
  try {
    const text = await f.text();
    pause();
    $('source').value = text;
    $('exampleHelp').textContent = 'Imported program: ' + f.name;
    dirty = true;
    message('Imported. Assemble & reset to run.');
    render();
  } catch (e) {
    message('Could not read this file.', true);
  }
  $('file').value = '';
};
example();})();
