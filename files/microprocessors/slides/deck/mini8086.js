/* Copyright (c) Sercan Külcü. Tüm hakları saklıdır. */
/* mini8086: sunumlara gömülü laboratuvarlar için küçük bir 8086 assembler'ı ve yorumlayıcısı.
   Ders doğrulayıcısının (tools8086/emu8086.py) .COM/.EXE düzeni, komut kodlaması (bayt uzunlukları,
   emu8086 gibi 3 baytlık doğrudan adresli LEA), bayrak kuralları ve INT hizmetleri esas alınmıştır.
   Kapsam: MOV, XCHG, LEA, LDS, LES, PUSH, POP, PUSHF, POPF, LAHF, SAHF, XLAT, CBW, CWD, ADD, ADC, SUB, SBB,
   INC, DEC, NEG, CMP, MUL, IMUL, DIV, IDIV, DAA, DAS, AAA, AAS, AAM, AAD, AND, OR, XOR, NOT, TEST,
   SHL/SAL, SHR, SAR, ROL, ROR, RCL, RCR, JMP, Jcc, LOOP/LOOPE/LOOPNE, JCXZ, CALL, RET, RETF, INT, IRET,
   CLC, STC, CMC, CLD, STD, CLI, STI, NOP, HLT, dizgi komutları (REP önekleriyle), IN/OUT (port belleği).
   Yönergeler: ORG, DB, DW, DD, DUP, EQU, =, PROC/ENDP, LABEL, OFFSET, .MODEL/.DATA/.CODE/.STACK.
   Makrolar (emu8086.py ön işlemcisiyle aynı açılım): MACRO/ENDM, parametreler, &param&, LOCAL (??0000 adları), REPT, IRP,
   IRPC, IF/IFE/IFB/IFNB/IFDEF/IFNDEF/IFIDN/IFDIF/ELSE/ENDIF, include 'emu8086.inc' (PUTC, GOTOXY, PRINT, PRINTN,
   CURSOROFF/ON, DEFINE_SCAN_NUM, DEFINE_PRINT_NUM, DEFINE_PRINT_NUM_UNS, DEFINE_PRINT_STRING, DEFINE_PTHIS,
   DEFINE_GET_STRING, DEFINE_CLEAR_SCREEN).
   INT 21h: 00h, 01h, 02h, 05h, 06h, 07h, 08h, 09h, 0Ah, 0Bh, 0Ch, 19h, 25h, 2Ah, 2Ch, 30h, 35h, 40h, 4Ch;
   INT 10h: 00h, 01h, 02h, 03h, 05h, 06h, 07h, 08h, 09h, 0Ah, 0Ch, 0Dh, 0Eh, 0Fh, 13h; INT 16h: 00h, 01h, 02h, 10h, 11h;
   INT 1Ah: 00h, 02h, 04h; INT 15h/86h; INT 20h, INT 3. Klavye girdisi bir kuyruktan okunur (opts.input); kuyruk boşsa
   InputWait fırlatılır ve adım hiç yürütülmemiş sayılır. IN/OUT: opts.ports (sabit, sıra ya da işlev; yoksa son OUT).
   Tarayıcıda window.Mini8086, Node'da module.exports olarak kullanılır. */
(function (root) {
  "use strict";
  if (typeof document !== "undefined" && typeof module === "undefined" &&
      ["sercankulcu.github.io", "localhost", "127.0.0.1", "[::1]"].indexOf(location.hostname) < 0) return;

  /* ================= sabitler ================= */
  var REG8 = { AL: 0, CL: 1, DL: 2, BL: 3, AH: 4, CH: 5, DH: 6, BH: 7 };
  var REG16 = { AX: 0, CX: 1, DX: 2, BX: 3, SP: 4, BP: 5, SI: 6, DI: 7 };
  var SREG = { ES: 0, CS: 1, SS: 2, DS: 3 };
  var FLAGBITS = { CF: 0, PF: 2, AF: 4, ZF: 6, SF: 7, TF: 8, IF: 9, DF: 10, OF: 11 };
  var FLAGORDER = ["OF", "DF", "IF", "TF", "SF", "ZF", "AF", "PF", "CF"];
  var ALU = { ADD: 0, OR: 1, ADC: 2, SBB: 3, AND: 4, SUB: 5, XOR: 6, CMP: 7 };
  var SHIFTS = { ROL: 0, ROR: 1, RCL: 2, RCR: 3, SHL: 4, SAL: 4, SHR: 5, SAR: 7 };
  var GRP3 = { TEST: 0, NOT: 2, NEG: 3, MUL: 4, IMUL: 5, DIV: 6, IDIV: 7 };
  var JCC = { JO: 0, JNO: 1, JB: 2, JNAE: 2, JC: 2, JNB: 3, JAE: 3, JNC: 3, JE: 4, JZ: 4, JNE: 5, JNZ: 5,
    JBE: 6, JNA: 6, JNBE: 7, JA: 7, JS: 8, JNS: 9, JP: 10, JPE: 10, JNP: 11, JPO: 11, JL: 12, JNGE: 12,
    JNL: 13, JGE: 13, JLE: 14, JNG: 14, JNLE: 15, JG: 15 };
  var LOOPS = { LOOPNE: 0xE0, LOOPNZ: 0xE0, LOOPE: 0xE1, LOOPZ: 0xE1, LOOP: 0xE2, JCXZ: 0xE3 };
  var SIMPLE = { CBW: 0x98, CWD: 0x99, PUSHF: 0x9C, POPF: 0x9D, SAHF: 0x9E, LAHF: 0x9F, CLC: 0xF8, STC: 0xF9,
    CMC: 0xF5, CLD: 0xFC, STD: 0xFD, CLI: 0xFA, STI: 0xFB, NOP: 0x90, HLT: 0xF4, IRET: 0xCF, XLATB: 0xD7,
    DAA: 0x27, DAS: 0x2F, AAA: 0x37, AAS: 0x3F, WAIT: 0x9B, INTO: 0xCE, MOVSB: 0xA4, MOVSW: 0xA5, CMPSB: 0xA6,
    CMPSW: 0xA7, STOSB: 0xAA, STOSW: 0xAB, LODSB: 0xAC, LODSW: 0xAD, SCASB: 0xAE, SCASW: 0xAF };
  var STRING_OPS = { MOVS: 0xA4, CMPS: 0xA6, STOS: 0xAA, LODS: 0xAC, SCAS: 0xAE };
  var PREFIXES = { REP: 0xF3, REPE: 0xF3, REPZ: 0xF3, REPNE: 0xF2, REPNZ: 0xF2, LOCK: 0xF0 };
  var SEGPFX = { ES: 0x26, CS: 0x2E, SS: 0x36, DS: 0x3E };
  var OTHER_MN = ["MOV", "XCHG", "LEA", "LDS", "LES", "PUSH", "POP", "INC", "DEC", "JMP", "CALL", "RET",
    "RETN", "RETF", "INT", "IN", "OUT", "XLAT", "AAM", "AAD"];
  var MNEMONICS = {};
  [ALU, SHIFTS, GRP3, JCC, LOOPS, SIMPLE, STRING_OPS].forEach(function (t) { for (var k in t) MNEMONICS[k] = 1; });
  OTHER_MN.forEach(function (k) { MNEMONICS[k] = 1; });
  var DIRECTIVES = {};
  ["DB", "DW", "DD", "EQU", "=", "PROC", "ENDP", "ORG", "END", "SEGMENT", "ENDS", "ASSUME", "LABEL", "EVEN",
    "ALIGN", ".MODEL", ".STACK", ".DATA", ".CODE", ".STARTUP", ".EXIT", "NAME", "TITLE", "PAGE", ".8086", ".186",
    ".286", "PUBLIC", "EXTRN", "EXTERN"].forEach(function (k) { DIRECTIVES[k] = 1; });
  var PSP_SEG = 0x0700, BIOS_SEG = 0xF000, BIOS_OFF = 0x1000, VIDEO_SEG = 0xB800;
  var R16NAMES = ["AX", "CX", "DX", "BX", "SP", "BP", "SI", "DI"];
  var SHOW_REGS = ["AX", "BX", "CX", "DX", "SI", "DI", "BP", "SP", "CS", "DS", "ES", "SS", "IP"];

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  function AsmError(msg, line, text) {
    this.msg = msg; this.line = line == null ? null : line; this.text = text || null;
    this.message = (this.line ? "satır " + this.line + ": " : "") + msg;
  }
  AsmError.prototype.toString = function () { return this.message; };
  function EmuError(msg) { this.message = msg; }
  EmuError.prototype.toString = function () { return this.message; };
  /* klavye kuyruğu boşken okuma: adım geri alınır, girdi gelince yeniden denenir */
  function InputWait(what) { this.message = "girdi bekleniyor"; this.what = what || ""; }

  /* ================= yardımcılar ================= */
  function stripComment(line) {
    var q = null;
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i);
      if (q) { if (ch === q) q = null; }
      else if (ch === "'" || ch === '"') q = ch;
      else if (ch === ";") return line.slice(0, i);
    }
    return line;
  }
  function splitTop(s, sep) {
    sep = sep || ",";
    var out = [], depth = 0, q = null, cur = "";
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (q) { cur += ch; if (ch === q) q = null; continue; }
      if (ch === "'" || ch === '"') q = ch;
      else if ("([<".indexOf(ch) >= 0) depth++;
      else if (")]>".indexOf(ch) >= 0) depth--;
      if (ch === sep && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
    }
    out.push(cur);
    return out.map(function (x) { return x.trim(); });
  }
  function splitWs1(s) {
    var m = /^(\S+)\s*([\s\S]*)$/.exec(s.trim());
    return m ? (m[2] ? [m[1], m[2]] : [m[1]]) : [];
  }
  var IDENT = "[A-Za-z_?@$.][\\p{L}\\p{N}_?@$.]*";
  var IDENT_G = new RegExp(IDENT, "gu");
  function parseNumber(tok) {
    var t = tok.toUpperCase().replace(/_/g, "");
    if (/^0X[0-9A-F]+$/.test(t)) return parseInt(t.slice(2), 16);
    if (t.charAt(t.length - 1) === "H") { if (/^[0-9A-F]+H$/.test(t)) return parseInt(t.slice(0, -1), 16); return NaN; }
    if (/^[01]+B$/.test(t)) return parseInt(t.slice(0, -1), 2);
    if (/^[0-7]+[OQ]$/.test(t)) return parseInt(t.slice(0, -1), 8);
    if (/^[0-9]+D$/.test(t)) return parseInt(t.slice(0, -1), 10);
    if (/^[0-9]+$/.test(t)) return parseInt(t, 10);
    return NaN;
  }
  function parity(v) { v &= 0xFF; var c = 0; while (v) { c += v & 1; v >>= 1; } return c % 2 === 0 ? 1 : 0; }
  function s8(v) { v &= 0xFF; return v & 0x80 ? v - 0x100 : v; }
  function s16(v) { v &= 0xFFFF; return v & 0x8000 ? v - 0x10000 : v; }
  function pymod(a, b) { var r = a % b; return r !== 0 && (r < 0) !== (b < 0) ? r + b : r; }
  function hx(v, w) {
    var n = w === 1 ? 2 : w === 4 ? 8 : 4;
    var s = (v >>> 0).toString(16).toUpperCase();
    while (s.length < n) s = "0" + s;
    return s + "h";
  }

  /* ================= ifade değerlendirici ================= */
  function Val(val, o) {
    o = o || {};
    this.val = val; this.vr = o.vr || null; this.reloc = !!o.reloc; this.unknown = !!o.unknown;
    this.label = o.label || null; this.segv = o.segv == null ? null : o.segv; this.isseg = !!o.isseg;
  }
  var TOKEN_RE = /\s*(?:('(?:[^']|'')*'|"(?:[^"]|"")*")|([0-9][0-9A-Za-z_]*)|([A-Za-z_?@$.][\p{L}\p{N}_?@$.]*)|([-+*/()\[\]:,<>=]))/uy;

  function Expr(text, lookup, here, line, pre) {
    this.toks = []; this.lookup = lookup; this.here = here; this.line = line; this.pre = pre;
    text = text.trim();
    var pos = 0;
    while (pos < text.length) {
      TOKEN_RE.lastIndex = pos;
      var m = TOKEN_RE.exec(text);
      if (!m || TOKEN_RE.lastIndex === pos) {
        if (text.slice(pos).trim() === "") break;
        throw new AsmError("ifade çözümlenemedi: " + text, line);
      }
      pos = TOKEN_RE.lastIndex;
      if (m[1] != null) this.toks.push(["str", m[1]]);
      else if (m[2] != null) this.toks.push(["num", m[2]]);
      else if (m[3] != null) this.toks.push(["id", m[3]]);
      else this.toks.push(["op", m[4]]);
    }
    this.i = 0;
  }
  Expr.prototype.peek = function () { return this.i < this.toks.length ? this.toks[this.i] : [null, null]; };
  Expr.prototype.take = function () { var t = this.peek(); this.i++; return t; };
  Expr.prototype.value = function () {
    var v = this.eOr();
    if (this.i !== this.toks.length) throw new AsmError("ifadede fazla öğe: " + this.toks.map(function (t) { return t[1]; }).join(" "), this.line);
    return v;
  };
  Expr.prototype.kw = function () {
    var t = this.peek();
    if (t[0] === "id" && Array.prototype.indexOf.call(arguments, t[1].toUpperCase()) >= 0) { this.i++; return t[1].toUpperCase(); }
    return null;
  };
  Expr.prototype.comb = function (a, b, val) { return new Val(val, { unknown: a.unknown || b.unknown }); };
  Expr.prototype.eOr = function () {
    var a = this.eAnd();
    for (;;) {
      var op = this.kw("OR", "XOR");
      if (!op) return a;
      var b = this.eAnd();
      a = this.comb(a, b, op === "OR" ? (a.val | b.val) : (a.val ^ b.val));
    }
  };
  Expr.prototype.eAnd = function () {
    var a = this.eNot();
    while (this.kw("AND")) { var b = this.eNot(); a = this.comb(a, b, a.val & b.val); }
    return a;
  };
  Expr.prototype.eNot = function () {
    if (this.kw("NOT")) { var a = this.eNot(); return new Val(~a.val & 0xFFFF, { unknown: a.unknown }); }
    return this.eRel();
  };
  Expr.prototype.eRel = function () {
    var a = this.eAdd();
    var op = this.kw("EQ", "NE", "LT", "LE", "GT", "GE");
    if (op) {
      var b = this.eAdd();
      var r = { EQ: a.val === b.val, NE: a.val !== b.val, LT: a.val < b.val, LE: a.val <= b.val, GT: a.val > b.val, GE: a.val >= b.val }[op];
      return new Val(r ? 0xFFFF : 0, { unknown: a.unknown || b.unknown });
    }
    return a;
  };
  Expr.prototype.eAdd = function () {
    var a = this.eMul();
    for (;;) {
      var t = this.peek();
      if (t[0] === "op" && (t[1] === "+" || t[1] === "-")) {
        this.i++;
        var b = this.eMul();
        if (t[1] === "+") {
          a = new Val(a.val + b.val, { vr: a.vr || b.vr, reloc: a.reloc || b.reloc, unknown: a.unknown || b.unknown,
            label: a.label || b.label, segv: a.segv || b.segv });
        } else {
          var both = a.reloc && b.reloc;
          a = new Val(a.val - b.val, { vr: both ? null : a.vr, reloc: both ? false : a.reloc, unknown: a.unknown || b.unknown,
            label: both ? null : a.label, segv: both ? null : a.segv });
        }
      } else return a;
    }
  };
  Expr.prototype.eMul = function () {
    var a = this.eUnary();
    for (;;) {
      var t = this.peek(), b;
      if (t[0] === "op" && (t[1] === "*" || t[1] === "/")) {
        this.i++;
        b = this.eUnary();
        if (t[1] === "*") a = this.comb(a, b, a.val * b.val);
        else {
          if (b.val === 0) {
            if (a.unknown || b.unknown) { a = this.comb(a, b, 0); continue; }
            throw new AsmError("ifadede sıfıra bölme", this.line);
          }
          a = this.comb(a, b, Math.trunc(a.val / b.val));
        }
        continue;
      }
      var op = this.kw("MOD", "SHL", "SHR");
      if (op) {
        b = this.eUnary();
        if (op === "MOD") a = this.comb(a, b, b.val ? pymod(a.val, b.val) : 0);
        else if (op === "SHL") a = this.comb(a, b, a.val * Math.pow(2, b.val));
        else a = this.comb(a, b, Math.floor(a.val / Math.pow(2, b.val)));
        continue;
      }
      return a;
    }
  };
  Expr.prototype.eUnary = function () {
    var t = this.peek(), a;
    if (t[0] === "op" && (t[1] === "+" || t[1] === "-")) {
      this.i++;
      a = this.eUnary();
      return t[1] === "-" ? new Val(-a.val, { unknown: a.unknown }) : a;
    }
    var op = this.kw("OFFSET", "SEG", "TYPE", "LOW", "HIGH", "LENGTH", "SIZE", "LENGTHOF", "SIZEOF");
    if (op) {
      a = this.eUnary();
      if (op === "OFFSET") return new Val(a.val, { reloc: a.reloc || a.vr != null || a.label != null, unknown: a.unknown, label: a.label });
      if (op === "SEG") return new Val(a.segv != null ? a.segv : 0, { unknown: a.unknown || a.segv == null, isseg: true, reloc: true });
      if (op === "TYPE") {
        if (a.vr) return new Val(a.vr.size, { unknown: a.unknown });
        if (a.label) return new Val(a.label.far ? 0xFFFE : 0xFFFF, { unknown: a.unknown });
        return new Val(0, { unknown: a.unknown });
      }
      if (op === "LOW") return new Val(a.val & 0xFF, { unknown: a.unknown });
      if (op === "HIGH") return new Val((a.val >> 8) & 0xFF, { unknown: a.unknown });
      if (op === "LENGTH" || op === "LENGTHOF") return new Val(a.vr ? a.vr.length : 1, { unknown: a.unknown });
      return new Val(a.vr ? a.vr.length * a.vr.size : 0, { unknown: a.unknown });
    }
    return this.primary();
  };
  Expr.prototype.primary = function () {
    var t = this.take(), k = t[0], s = t[1], v;
    if (k === null) throw new AsmError("eksik ifade", this.line);
    if (k === "num") {
      v = parseNumber(s);
      if (isNaN(v)) throw new AsmError("geçersiz sayı: " + s, this.line);
      return new Val(v);
    }
    if (k === "str") {
      var q = s.charAt(0), body = s.slice(1, -1).split(q + q).join(q);
      if (body.length > 2) throw new AsmError("ifadede 2 karakterden uzun dizgi: " + s, this.line);
      v = 0;
      for (var i = 0; i < body.length; i++) v = (v << 8) | (body.charCodeAt(i) & 0xFF);
      return new Val(v);
    }
    if (k === "op" && (s === "(" || s === "[")) {
      v = this.eOr();
      var c = this.take();
      if (c[0] !== "op" || c[1] !== (s === "(" ? ")" : "]")) throw new AsmError(s === "(" ? "kapanmayan parantez" : "kapanmayan köşeli parantez", this.line);
      return v;
    }
    if (k === "id") {
      var u = s.toUpperCase();
      if (u === "$") return new Val(this.here, { reloc: true });
      if (u === "?") return new Val(0);
      if (u === "BYTE") return new Val(1);
      if (u === "WORD") return new Val(2);
      if (u === "DWORD") return new Val(4);
      if (has(REG16, u) || has(REG8, u) || has(SREG, u)) throw new AsmError("ifadede yazmaç kullanılamaz: " + s, this.line);
      if (this.pre && !/^[0-9A-F]+H$/.test(u)) throw new AsmError("bilinmeyen sembol " + s, this.line);
      var r = this.lookup(u);
      if (r == null) {
        if (/^[A-F][0-9A-F]*H$/.test(u)) throw new AsmError("onaltılık sayı rakamla başlamalı: '" + s + "' yerine '0" + s + "' yazılmalı", this.line);
        return new Val(0, { unknown: true });
      }
      return r;
    }
    throw new AsmError("beklenmeyen öğe: " + s, this.line);
  };

  /* ================= semboller, işlenenler, deyimler ================= */
  function Sym(name, kind, seg, off, o) {
    o = o || {};
    this.name = name; this.kind = kind; this.seg = seg; this.off = off;
    this.size = o.size || 0; this.length = o.length == null ? 1 : o.length; this.far = !!o.far; this.value = o.value == null ? null : o.value;
  }
  Sym.prototype.key = function () {
    var v = this.value;
    if (v instanceof Val) v = "V" + v.val + (v.unknown ? "?" : "");
    return [this.kind, this.seg, this.off, this.size, v].join("|");
  };
  function Op(kind, o) {
    this.kind = kind; this.reg = null; this.size = null; this.val = 0; this.base = null; this.index = null; this.disp = 0;
    this.seg = null; this.reloc = false; this.vr = null; this.unknown = false; this.ptr = null; this.short = false;
    this.label = null; this.segv = null; this.text = ""; this.direct = false; this.isseg = false;
    if (o) for (var k in o) this[k] = o[k];
  }
  function Stmt(line, text, macro) {
    this.line = line; this.text = text; this.macro = macro || null; this.label = null; this.op = null; this.args = "";
    this.name = null; this.prefixes = []; this.addr = 0; this.seg = null; this.size = 0; this.bytes = []; this.ops = [];
    this.long = false; this.wide = {}; this.far = false; this.target = null; this.targetSeg = null; this.kind = "instr";
    this.show = text;
  }
  function Segment(name, kind) { this.name = name; this.kind = kind || "code"; this.loc = 0; this.size = 0; this.para = 0; this.stack = false; }

  var EMU8086_INC = [
    "PUTC    MACRO   char",
    "        PUSH    AX",
    "        MOV     AL, char",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        POP     AX",
    "ENDM",
    "",
    "GOTOXY  MACRO   col, row",
    "        PUSH    AX",
    "        PUSH    BX",
    "        PUSH    DX",
    "        MOV     AH, 02h",
    "        MOV     DH, row",
    "        MOV     DL, col",
    "        MOV     BH, 0",
    "        INT     10h",
    "        POP     DX",
    "        POP     BX",
    "        POP     AX",
    "ENDM",
    "",
    "PRINT   MACRO   sdat",
    "LOCAL   next_char, s_dcl, printed, skip_dcl",
    "        PUSH    AX",
    "        PUSH    SI",
    "        JMP     skip_dcl",
    "        s_dcl DB sdat, 0",
    "skip_dcl:",
    "        LEA     SI, s_dcl",
    "next_char:",
    "        MOV     AL, CS:[SI]",
    "        CMP     AL, 0",
    "        JZ      printed",
    "        INC     SI",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        JMP     next_char",
    "printed:",
    "        POP     SI",
    "        POP     AX",
    "ENDM",
    "",
    "PRINTN  MACRO   sdat",
    "LOCAL   next_char, s_dcl, printed, skip_dcl",
    "        PUSH    AX",
    "        PUSH    SI",
    "        JMP     skip_dcl",
    "        s_dcl DB sdat, 13, 10, 0",
    "skip_dcl:",
    "        LEA     SI, s_dcl",
    "next_char:",
    "        MOV     AL, CS:[SI]",
    "        CMP     AL, 0",
    "        JZ      printed",
    "        INC     SI",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        JMP     next_char",
    "printed:",
    "        POP     SI",
    "        POP     AX",
    "ENDM",
    "",
    "CURSOROFF MACRO",
    "        PUSH    AX",
    "        PUSH    CX",
    "        MOV     AH, 1",
    "        MOV     CH, 28h",
    "        MOV     CL, 09h",
    "        INT     10h",
    "        POP     CX",
    "        POP     AX",
    "ENDM",
    "",
    "CURSORON MACRO",
    "        PUSH    AX",
    "        PUSH    CX",
    "        MOV     AH, 1",
    "        MOV     CH, 08h",
    "        MOV     CL, 09h",
    "        INT     10h",
    "        POP     CX",
    "        POP     AX",
    "ENDM",
    "",
    "DEFINE_SCAN_NUM MACRO",
    "LOCAL make_minus, ten, next_digit, set_minus, too_big, backspace_checked, too_big2",
    "LOCAL stop_input, not_minus, skip_proc_scan_num, remove_not_digit, ok_AE_0, ok_digit, not_cr",
    "        JMP     skip_proc_scan_num",
    "SCAN_NUM PROC NEAR",
    "        PUSH    DX",
    "        PUSH    AX",
    "        PUSH    SI",
    "        MOV     CX, 0",
    "        MOV     CS:make_minus, 0",
    "next_digit:",
    "        MOV     AH, 00h",
    "        INT     16h",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        CMP     AL, '-'",
    "        JE      set_minus",
    "        CMP     AL, 0Dh",
    "        JNE     not_cr",
    "        JMP     stop_input",
    "not_cr:",
    "        CMP     AL, 8",
    "        JNE     backspace_checked",
    "        MOV     DX, 0",
    "        MOV     AX, CX",
    "        DIV     CS:ten",
    "        MOV     CX, AX",
    "        PUTC    ' '",
    "        PUTC    8",
    "        JMP     next_digit",
    "backspace_checked:",
    "        CMP     AL, '0'",
    "        JAE     ok_AE_0",
    "        JMP     remove_not_digit",
    "ok_AE_0:",
    "        CMP     AL, '9'",
    "        JBE     ok_digit",
    "remove_not_digit:",
    "        PUTC    8",
    "        PUTC    ' '",
    "        PUTC    8",
    "        JMP     next_digit",
    "ok_digit:",
    "        PUSH    AX",
    "        MOV     AX, CX",
    "        MUL     CS:ten",
    "        MOV     CX, AX",
    "        POP     AX",
    "        CMP     DX, 0",
    "        JNE     too_big",
    "        SUB     AL, 30h",
    "        MOV     AH, 0",
    "        MOV     DX, CX",
    "        ADD     CX, AX",
    "        JC      too_big2",
    "        JMP     next_digit",
    "set_minus:",
    "        MOV     CS:make_minus, 1",
    "        JMP     next_digit",
    "too_big2:",
    "        MOV     CX, DX",
    "        MOV     DX, 0",
    "too_big:",
    "        MOV     AX, CX",
    "        DIV     CS:ten",
    "        MOV     CX, AX",
    "        PUTC    8",
    "        PUTC    ' '",
    "        PUTC    8",
    "        JMP     next_digit",
    "stop_input:",
    "        CMP     CS:make_minus, 0",
    "        JE      not_minus",
    "        NEG     CX",
    "not_minus:",
    "        POP     SI",
    "        POP     AX",
    "        POP     DX",
    "        RET",
    "make_minus DB ?",
    "ten        DW 10",
    "SCAN_NUM ENDP",
    "skip_proc_scan_num:",
    "ENDM",
    "",
    "DEFINE_PRINT_NUM MACRO",
    "LOCAL not_zero, positive, printed, skip_proc_print_num",
    "        JMP     skip_proc_print_num",
    "PRINT_NUM PROC NEAR",
    "        PUSH    DX",
    "        PUSH    AX",
    "        CMP     AX, 0",
    "        JNZ     not_zero",
    "        PUTC    '0'",
    "        JMP     printed",
    "not_zero:",
    "        CMP     AX, 0",
    "        JNS     positive",
    "        NEG     AX",
    "        PUTC    '-'",
    "positive:",
    "        CALL    PRINT_NUM_UNS",
    "printed:",
    "        POP     AX",
    "        POP     DX",
    "        RET",
    "PRINT_NUM ENDP",
    "skip_proc_print_num:",
    "ENDM",
    "",
    "DEFINE_PRINT_NUM_UNS MACRO",
    "LOCAL begin_print, calc, skip, print_zero, end_print, ten, skip_proc_print_num_uns",
    "        JMP     skip_proc_print_num_uns",
    "PRINT_NUM_UNS PROC NEAR",
    "        PUSH    AX",
    "        PUSH    BX",
    "        PUSH    CX",
    "        PUSH    DX",
    "        MOV     CX, 1",
    "        MOV     BX, 10000",
    "        CMP     AX, 0",
    "        JZ      print_zero",
    "begin_print:",
    "        CMP     BX, 0",
    "        JZ      end_print",
    "        CMP     CX, 0",
    "        JE      calc",
    "        CMP     AX, BX",
    "        JB      skip",
    "calc:",
    "        MOV     CX, 0",
    "        MOV     DX, 0",
    "        DIV     BX",
    "        ADD     AL, 30h",
    "        PUTC    AL",
    "        MOV     AX, DX",
    "skip:",
    "        PUSH    AX",
    "        MOV     DX, 0",
    "        MOV     AX, BX",
    "        DIV     CS:ten",
    "        MOV     BX, AX",
    "        POP     AX",
    "        JMP     begin_print",
    "print_zero:",
    "        PUTC    '0'",
    "end_print:",
    "        POP     DX",
    "        POP     CX",
    "        POP     BX",
    "        POP     AX",
    "        RET",
    "ten     DW      10",
    "PRINT_NUM_UNS ENDP",
    "skip_proc_print_num_uns:",
    "ENDM",
    "",
    "DEFINE_PRINT_STRING MACRO",
    "LOCAL next_char, printed, skip_proc_print_string",
    "        JMP     skip_proc_print_string",
    "PRINT_STRING PROC NEAR",
    "        PUSH    AX",
    "        PUSH    SI",
    "next_char:",
    "        MOV     AL, [SI]",
    "        CMP     AL, 0",
    "        JZ      printed",
    "        INC     SI",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        JMP     next_char",
    "printed:",
    "        POP     SI",
    "        POP     AX",
    "        RET",
    "PRINT_STRING ENDP",
    "skip_proc_print_string:",
    "ENDM",
    "",
    "DEFINE_PTHIS MACRO",
    "LOCAL next_char, printed, skip_proc_pthis, temp1",
    "        JMP     skip_proc_pthis",
    "PTHIS PROC NEAR",
    "        MOV     CS:temp1, SI",
    "        POP     SI",
    "        PUSH    AX",
    "next_char:",
    "        MOV     AL, CS:[SI]",
    "        INC     SI",
    "        CMP     AL, 0",
    "        JZ      printed",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        JMP     next_char",
    "printed:",
    "        POP     AX",
    "        PUSH    SI",
    "        MOV     SI, CS:temp1",
    "        RET",
    "temp1   DW      ?",
    "PTHIS ENDP",
    "skip_proc_pthis:",
    "ENDM",
    "",
    "DEFINE_GET_STRING MACRO",
    "LOCAL empty_buffer, wait_for_key, skip_proc_get_string, exit_get_string, add_to_buffer",
    "        JMP     skip_proc_get_string",
    "GET_STRING PROC NEAR",
    "        PUSH    AX",
    "        PUSH    CX",
    "        PUSH    DI",
    "        PUSH    DX",
    "        MOV     CX, 0",
    "        CMP     DX, 1",
    "        JBE     empty_buffer",
    "        DEC     DX",
    "wait_for_key:",
    "        MOV     AH, 0",
    "        INT     16h",
    "        CMP     AL, 0Dh",
    "        JZ      exit_get_string",
    "        CMP     AL, 8",
    "        JNE     add_to_buffer",
    "        JCXZ    wait_for_key",
    "        DEC     CX",
    "        DEC     DI",
    "        PUTC    8",
    "        PUTC    ' '",
    "        PUTC    8",
    "        JMP     wait_for_key",
    "add_to_buffer:",
    "        CMP     CX, DX",
    "        JAE     wait_for_key",
    "        MOV     [DI], AL",
    "        INC     DI",
    "        INC     CX",
    "        MOV     AH, 0Eh",
    "        INT     10h",
    "        JMP     wait_for_key",
    "exit_get_string:",
    "        MOV     BYTE PTR [DI], 0",
    "empty_buffer:",
    "        POP     DX",
    "        POP     DI",
    "        POP     CX",
    "        POP     AX",
    "        RET",
    "GET_STRING ENDP",
    "skip_proc_get_string:",
    "ENDM",
    "",
    "DEFINE_CLEAR_SCREEN MACRO",
    "LOCAL skip_proc_clear_screen",
    "        JMP     skip_proc_clear_screen",
    "CLEAR_SCREEN PROC NEAR",
    "        PUSH    AX",
    "        PUSH    DS",
    "        PUSH    BX",
    "        PUSH    CX",
    "        PUSH    DI",
    "        MOV     AX, 40h",
    "        MOV     DS, AX",
    "        MOV     AH, 06h",
    "        MOV     AL, 0",
    "        MOV     BH, 07",
    "        MOV     CH, 0",
    "        MOV     CL, 0",
    "        MOV     DI, 84h",
    "        MOV     DH, [DI]",
    "        MOV     DI, 4Ah",
    "        MOV     DL, [DI]",
    "        DEC     DL",
    "        INT     10h",
    "        MOV     BH, 0",
    "        MOV     DL, 0",
    "        MOV     DH, 0",
    "        MOV     AH, 02",
    "        INT     10h",
    "        POP     DI",
    "        POP     CX",
    "        POP     BX",
    "        POP     DS",
    "        POP     AX",
    "        RET",
    "CLEAR_SCREEN ENDP",
    "skip_proc_clear_screen:",
    "ENDM"
  ].join("\n");

  /* ================= ön işlemci: makrolar, REPT/IRP/IRPC, koşullu assembly, emu8086.inc =================
     emu8086.py Preprocessor sınıfının birebir karşılığı (aynı LOCAL sayacı, aynı satır numaraları): açılan her satır
     çağrının satır numarasını taşır; macro alanı açılımın makro adıdır, anchor alanı açılımın kod panelinde hangi kaynak
     satırının altında gösterileceğidir. emu8086.inc gövdeleri doğrulayıcıdaki yeniden yazımla aynıdır. */
  function PLine(no, text, macro, anchor) { this.no = no; this.text = text; this.macro = macro || null; this.anchor = anchor == null ? no : anchor; }
  var BLOCK_OPEN = new RegExp("^\\s*(?:" + IDENT + "\\s+MACRO\\b|REPT\\b|IRP\\b|IRPC\\b)", "iu");
  var ENDM_RE = new RegExp("^(?:" + IDENT + "\\s+)?ENDM\\b", "iu");
  var IDENT_Y = new RegExp(IDENT, "uy");
  var WORDCH = /[\p{L}\p{N}_?@$]/u;
  function Preprocessor() { this.macros = {}; this.localCounter = 0; this.consts = {}; this.included = false; }
  var PPP = Preprocessor.prototype;
  PPP.run = function (source) {
    var raw = source.replace(/\t/g, " ").split(/\r\n|\r|\n/), lines = [];
    if (raw.length && raw[raw.length - 1] === "") raw.pop();
    for (var i = 0; i < raw.length; i++) lines.push(new PLine(i + 1, raw[i], null));
    return this.process(lines, 0);
  };
  PPP.collect = function (lines, i) {
    var body = [], depth = 1;
    for (var j = i + 1; j < lines.length; j++) {
      var t = stripComment(lines[j].text).trim();
      if (BLOCK_OPEN.test(t)) depth++;
      else if (ENDM_RE.test(t)) { depth--; if (depth === 0) return [body, j]; }
      body.push(lines[j]);
    }
    throw new AsmError("ENDM bulunamadı", lines[i].no, lines[i].text.trim());
  };
  PPP.subst = function (text, map) {
    if (!Object.keys(map).length) return text;
    text = text.replace(new RegExp("&(" + IDENT + ")&?", "gu"), function (m0, g1) { var u = g1.toUpperCase(); return has(map, u) ? map[u] : m0; });
    var res = "", i = 0;
    while (i < text.length) {
      var ch = text.charAt(i);
      if (ch === "'" || ch === '"') {
        var j = text.indexOf(ch, i + 1);
        if (j < 0) j = text.length - 1;
        res += text.slice(i, j + 1); i = j + 1; continue;
      }
      IDENT_Y.lastIndex = i;
      var m = IDENT_Y.exec(text);
      if (m && (i === 0 || !WORDCH.test(text.charAt(i - 1)))) {
        var u = m[0].toUpperCase();
        res += has(map, u) ? map[u] : m[0];
        i += m[0].length; continue;
      }
      res += ch; i++;
    }
    return res;
  };
  PPP.evalConst = function (expr, no) {
    var self = this;
    expr = expr.trim().replace(IDENT_G, function (w) { var u = w.toUpperCase(); return has(self.consts, u) ? String(self.consts[u]) : w; });
    try { return new Expr(expr, function () { return null; }, 0, no, true).value().val; }
    catch (e) { if (e instanceof AsmError) return 0; throw e; }
  };
  PPP.process = function (lines, depth) {
    if (depth > 50) throw new AsmError("makro açılımı çok derin (özyineleme?)");
    var out = [], cond = [], i = 0, m, self = this;
    var reIf = /^(IF|IFE|IFB|IFNB|IFDEF|IFNDEF|IFIDN|IFDIF)\b([\s\S]*)$/i;
    var reMac = new RegExp("^(" + IDENT + ")\\s+MACRO\\b([\\s\\S]*)$", "iu");
    var reEqu = new RegExp("^(" + IDENT + ")\\s+(EQU|=)\\s*([\\s\\S]+)$", "iu");
    var reLab = new RegExp("^(" + IDENT + ")\\s*:(?!\\s*\\[)\\s*([\\s\\S]*)$", "u");
    var reCall = new RegExp("^(" + IDENT + ")(\\s+([\\s\\S]*))?$", "u");
    function active() { return cond.every(function (c) { return c[0]; }); }
    while (i < lines.length) {
      var ln = lines[i], t = stripComment(ln.text).trim(), u = t.toUpperCase(), act = active();
      m = reIf.exec(t);
      if (m) {
        if (!act) cond.push([false, true]);
        else {
          var kw = m[1].toUpperCase(), arg = m[2].trim(), v;
          if (kw === "IF") v = this.evalConst(arg, ln.no) !== 0;
          else if (kw === "IFE") v = this.evalConst(arg, ln.no) === 0;
          else if (kw === "IFB" || kw === "IFNB") {
            var a = arg.trim();
            if (a.charAt(0) === "<" && a.charAt(a.length - 1) === ">") a = a.slice(1, -1);
            v = (a.trim() === "") === (kw === "IFB");
          } else if (kw === "IFDEF" || kw === "IFNDEF") v = (has(this.consts, arg.toUpperCase()) || has(this.macros, arg.toUpperCase())) === (kw === "IFDEF");
          else {
            var aa = splitTop(arg).map(function (x) { return x.replace(/^[<>]+|[<>]+$/g, "").trim().toUpperCase(); }).concat(["", ""]);
            v = (aa[0] === aa[1]) === (kw === "IFIDN");
          }
          cond.push([v, v]);
        }
        i++; continue;
      }
      if (/^ELSE\b/.test(u)) {
        if (!cond.length) throw new AsmError("ELSE için IF yok", ln.no, ln.text.trim());
        var taken = cond.pop()[1];
        cond.push([active() && !taken, true]);
        i++; continue;
      }
      if (/^ENDIF\b/.test(u)) {
        if (!cond.length) throw new AsmError("ENDIF için IF yok", ln.no, ln.text.trim());
        cond.pop(); i++; continue;
      }
      if (!act) {
        if (BLOCK_OPEN.test(t)) i = this.collect(lines, i)[1] + 1; else i++;
        continue;
      }
      if (!t) { i++; continue; }
      if (t.charAt(0) === "#" && t.charAt(t.length - 1) === "#") { i++; continue; }
      m = /^INCLUDE\s+['"<]?([^'">]+)['">]?\s*$/i.exec(t);
      if (m) {
        if (/emu8086\.inc$/.test(m[1].trim().toLowerCase())) {
          if (!this.included) {
            this.included = true;
            var inc = EMU8086_INC.split("\n").map(function (x) { return new PLine(ln.no, x, "emu8086.inc", ln.anchor); });
            out = out.concat(this.process(inc, depth + 1));
          }
        } else throw new AsmError("include desteklenmiyor: " + m[1] + " (yalnız emu8086.inc)", ln.no, ln.text.trim());
        i++; continue;
      }
      m = reMac.exec(t);
      if (m) {
        var blk = this.collect(lines, i);
        var params = splitTop(m[2]).filter(function (p) { return p.trim(); }).map(function (p) { return p.split(":")[0].trim().toUpperCase(); });
        this.macros[m[1].toUpperCase()] = { name: m[1].toUpperCase(), raw: m[1], params: params, body: blk[0] };
        i = blk[1] + 1; continue;
      }
      m = /^(REPT|IRP|IRPC)\b([\s\S]*)$/i.exec(t);
      if (m) {
        var b2 = this.collect(lines, i), body = b2[0], kw2 = m[1].toUpperCase(), arg2 = m[2].trim(), exp = [];
        var anc = ln.macro ? ln.anchor : lines[b2[1]].no;
        if (kw2 === "REPT") {
          var n = this.evalConst(arg2, ln.no);
          for (var r = 0; r < n; r++) body.forEach(function (b) { exp.push(new PLine(ln.no, b.text, b.macro || "REPT", anc)); });
        } else {
          var cm = arg2.indexOf(",");
          if (cm < 0) throw new AsmError(kw2 + " için parametre ve liste gerekir", ln.no, ln.text.trim());
          var p = arg2.slice(0, cm).trim().toUpperCase(), rest = arg2.slice(cm + 1).trim(), items;
          if (kw2 === "IRP") {
            if (rest.charAt(0) === "<" && rest.charAt(rest.length - 1) === ">") rest = rest.slice(1, -1);
            items = splitTop(rest);
          } else items = rest.replace(/^[<>]+|[<>]+$/g, "").split("");
          items.forEach(function (it) {
            var mp = {}; mp[p] = it;
            body.forEach(function (b) { exp.push(new PLine(ln.no, self.subst(b.text, mp), b.macro || kw2, anc)); });
          });
        }
        out = out.concat(this.process(exp, depth + 1));
        i = b2[1] + 1; continue;
      }
      m = reEqu.exec(t);
      if (m) { try { this.consts[m[1].toUpperCase()] = this.evalConst(m[3], ln.no); } catch (e) { /* yok say */ } }
      var lab = "", rest2 = t;
      m = reLab.exec(t);
      if (m && !has(SREG, m[1].toUpperCase())) { lab = m[1] + ":"; rest2 = m[2]; }
      m = reCall.exec(rest2);
      if (m && has(this.macros, m[1].toUpperCase())) {
        var mac = this.macros[m[1].toUpperCase()], g3 = m[3] || "";
        var args = g3.trim() ? splitTop(g3) : [];
        args = args.map(function (x) { return x.charAt(0) === "<" && x.charAt(x.length - 1) === ">" ? x.slice(1, -1) : x; });
        var map = {}, exl = [];
        mac.params.forEach(function (pp, k) { map[pp] = k < args.length ? args[k] : ""; });
        if (lab) exl.push(new PLine(ln.no, lab, mac.raw, ln.anchor));
        mac.body.forEach(function (b) {
          var bt = stripComment(b.text).trim(), mm = /^LOCAL\b([\s\S]*)$/i.exec(bt);
          if (mm) {
            splitTop(mm[1]).forEach(function (nm) {
              if (!nm) return;
              var hxs = self.localCounter.toString(16).toUpperCase();
              while (hxs.length < 4) hxs = "0" + hxs;
              map[nm.toUpperCase()] = "??" + hxs;
              self.localCounter++;
            });
            return;
          }
          exl.push(new PLine(ln.no, b.text, mac.raw, ln.anchor));
        });
        exl = exl.map(function (e) { return new PLine(e.no, self.subst(e.text, map), e.macro, e.anchor); });
        out = out.concat(this.process(exl, depth + 1));
        i++; continue;
      }
      if (/^END\b/.test(u) && !/^ENDP|^ENDS|^ENDM/.test(u)) { out.push(ln); break; }
      out.push(ln);
      i++;
    }
    if (cond.length) throw new AsmError("kapanmamış IF bloğu");
    return out;
  };

  /* ================= assembler ================= */
  function Assembler(source, opts) {
    this.source = source; this.leaMasm = !!(opts && opts.leaMasm); this.warnings = []; this._grew = false;
  }
  Assembler.prototype.preprocess = function () {
    var pp = new Preprocessor(), lines = pp.run(this.source);
    this.lines = lines;
    return lines;
  };
  Assembler.prototype.parse = function () {
    var lines = this.preprocess(), stmts = [], pending = [];
    this.rawName = {};
    var labRe = new RegExp("^(" + IDENT + ")\\s*:(?!\\s*\\[)\\s*(.*)$", "u");
    for (var li = 0; li < lines.length; li++) {
      var ln = lines[li];
      var t = stripComment(ln.text).trim();
      if (!t) continue;
      var st = new Stmt(ln.no, t, ln.macro);
      st.eid = li;
      var m = labRe.exec(t);
      if (m && !has(SREG, m[1].toUpperCase())) { st.label = m[1].toUpperCase(); this.rawName[st.label] = this.rawName[st.label] || m[1]; t = m[2].trim(); }
      st.show = t;
      if (!t) { st.kind = "label"; stmts.push(st); continue; }
      var toks = splitWs1(t), first = toks[0].toUpperCase(), rest = toks.length > 1 ? toks[1].trim() : "";
      var second = rest ? splitWs1(rest)[0].toUpperCase() : "";
      if (has(DIRECTIVES, first) || has(MNEMONICS, first) || has(PREFIXES, first) || first.charAt(0) === ".") {
        st.op = first; st.args = rest;
      } else if (["DB", "DW", "DD", "EQU", "=", "PROC", "ENDP", "LABEL", "SEGMENT", "ENDS"].indexOf(second) >= 0 || rest.charAt(0) === "=") {
        st.name = toks[0].toUpperCase();
        this.rawName[st.name] = this.rawName[st.name] || toks[0];
        if (rest.charAt(0) === "=" && second !== "=") { st.op = "="; st.args = rest.slice(1).trim(); }
        else { st.op = second; var r2 = splitWs1(rest); st.args = r2.length > 1 ? r2[1].trim() : ""; }
      } else if (/:$/.test(first) && has(SREG, first.replace(/:+$/, ""))) {
        st.op = "SEGPFX"; st.args = first.slice(0, 2);
      } else {
        var known = { IMUL: 0, PUSHA: "80186", POPA: "80186", ENTER: "80186", LEAVE: "80186", BOUND: "80186", ESC: 0 };
        throw new AsmError(has(known, first) ? first + " komutu bu laboratuvarda desteklenmiyor" :
          "bilinmeyen ya da desteklenmeyen komut: " + toks[0], ln.no, ln.text.trim());
      }
      var dropped = false;
      while (has(PREFIXES, st.op)) {
        var pf = st.op;
        if (!st.args) { pending.push(pf); dropped = true; break; }
        var tk = splitWs1(st.args);
        st.prefixes.push(pf);
        st.op = tk[0].toUpperCase();
        st.args = tk.length > 1 ? tk[1].trim() : "";
      }
      if (dropped) continue;
      if (st.op === "SEGPFX") { pending.push(st.args + ":"); continue; }
      if (pending.length) { st.prefixes = pending.concat(st.prefixes); pending = []; }
      if (st.op === "DB" || st.op === "DW" || st.op === "DD") st.kind = "data";
      else if (has(MNEMONICS, st.op)) st.kind = "instr";
      else st.kind = "dir";
      if (st.op === "EQU" || st.op === "=") st.kind = "equ";
      stmts.push(st);
      if (st.op === "END") break;
    }
    this.stmts = stmts;
  };
  Assembler.prototype.lookup = function (name) {
    var s = has(this.syms, name) ? this.syms[name] : null;
    if (s == null) {
      s = has(this.prev, name) ? this.prev[name] : null;
      if (s == null) {
        if (name === "@DATA") {
          var dn = ["DATA", "_DATA"];
          for (var i = 0; i < 2; i++) if (has(this.prevSegs, dn[i])) { var p = this.prevSegs[dn[i]]; return new Val(p, { isseg: true, reloc: true, segv: p }); }
          if (has(this.segs, "DATA") || has(this.segs, "_DATA")) { this.unresolved[name] = 1; return new Val(0, { unknown: true, isseg: true }); }
        }
        if (has(this.prevSegs, name)) return new Val(this.prevSegs[name], { isseg: true, reloc: true, segv: this.prevSegs[name] });
        this.unresolved[name] = 1;
        if (this.unresLine && !has(this.unresLine, name)) this.unresLine[name] = this.curLine;
        return null;
      }
    }
    if (s.kind === "const") {
      if (s.value instanceof Val) return new Val(s.value.val, { vr: s.value.vr, reloc: s.value.reloc, label: s.value.label, segv: s.value.segv, unknown: s.value.unknown });
      return new Val(s.value);
    }
    var segp = has(this.prevSegs, s.seg) ? this.prevSegs[s.seg] : 0;
    if (s.kind === "var") return new Val(s.off, { vr: s, reloc: true, segv: segp });
    return new Val(s.off, { reloc: true, label: s, segv: segp });
  };
  Assembler.prototype.ev = function (text, st) {
    var self = this;
    return new Expr(this.substText(text), function (n) { return self.lookup(n); }, this.curLoc, st.line).value();
  };
  Assembler.prototype.substText = function (text) {
    var te = this.textEqu, any = false;
    for (var k in te) { any = true; break; }
    if (!any) return text;
    for (var i = 0; i < 10; i++) {
      var nw = text.replace(IDENT_G, function (w) { var u = w.toUpperCase(); return has(te, u) ? te[u] : w; });
      if (nw === text) break;
      text = nw;
    }
    return text;
  };
  Assembler.prototype.operand = function (text, st) {
    var t = this.substText(text.trim()), op = new Op("imm", { text: t }), size = null, m;
    for (;;) {
      m = /^(BYTE|WORD|DWORD|NEAR|FAR)\s+PTR\b\s*([\s\S]*)$/i.exec(t);
      if (m) { op.ptr = m[1].toUpperCase(); size = { BYTE: 1, WORD: 2, DWORD: 4 }[op.ptr] || null; t = m[2].trim(); continue; }
      m = /^SHORT\s+([\s\S]*)$/i.exec(t);
      if (m) { op.short = true; t = m[1].trim(); continue; }
      m = /^([BW])\.\s*([\s\S]*)$/i.exec(t);
      if (m) { size = m[1].toUpperCase() === "B" ? 1 : 2; op.ptr = size === 1 ? "BYTE" : "WORD"; t = m[2].trim(); continue; }
      break;
    }
    var segovr = null;
    m = /^(ES|CS|SS|DS)\s*:\s*([\s\S]+)$/i.exec(t);
    if (m) { segovr = m[1].toUpperCase(); t = m[2].trim(); }
    var u = t.toUpperCase();
    if (segovr == null && size == null && !op.short) {
      if (has(REG8, u)) return new Op("r8", { reg: u, size: 1, text: t });
      if (has(REG16, u)) return new Op("r16", { reg: u, size: 2, text: t });
      if (has(SREG, u)) return new Op("sreg", { reg: u, size: 2, text: t });
    }
    if (t.indexOf("[") >= 0 || segovr) return this.memOperand(t, st, size, segovr, op.ptr);
    m = /^([^:\[\]]+):([^:\[\]]+)$/.exec(t);
    if (m && !/^'.*'$/.test(t)) {
      var a = this.ev(m[1], st), b = this.ev(m[2], st);
      return new Op("farimm", { val: b.val & 0xFFFF, segv: a.val & 0xFFFF, unknown: a.unknown || b.unknown, text: t });
    }
    var v = this.ev(t, st);
    if (v.vr && !v.isseg) {
      return new Op("mem", { size: size || v.vr.size, disp: v.val, reloc: true, vr: v.vr, unknown: v.unknown, text: t, direct: true, ptr: op.ptr });
    }
    return new Op("imm", { val: v.val, reloc: v.reloc, unknown: v.unknown, label: v.label, segv: v.segv, text: t,
      short: op.short, ptr: op.ptr, size: null, isseg: v.isseg });
  };
  function balanced(s) {
    var d = 0;
    for (var i = 0; i < s.length; i++) { var c = s.charAt(i); if (c === "(") d++; else if (c === ")") { d--; if (d < 0) return false; } }
    return d === 0;
  }
  function splitTerms(s) {
    var terms = [], depth = 0, cur = "", sign = "+";
    s += "+";
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === "(") depth++; else if (ch === ")") depth--;
      if (depth === 0 && (ch === "+" || ch === "-")) {
        if (cur.trim()) { terms.push([sign, cur.trim()]); sign = ch; }
        else sign = (sign === "-") !== (ch === "-") ? "-" : "+";
        cur = "";
      } else cur += ch;
    }
    return terms;
  }
  Assembler.prototype.memOperand = function (t, st, size, segovr, ptr) {
    var s = t, m = /\[\s*(ES|CS|SS|DS)\s*:/i.exec(s);
    if (m) { segovr = m[1].toUpperCase(); s = s.slice(0, m.index) + "[" + s.slice(m.index + m[0].length); }
    s = s.split("[").join("+(").split("]").join(")+");
    var terms = [], depth = 0, cur = "", sign = "+", q = null, i, ch;
    s += "+";
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      if (q) { cur += ch; if (ch === q) q = null; continue; }
      if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
      if (ch === "(") depth++; else if (ch === ")") depth--;
      if (depth === 0 && (ch === "+" || ch === "-")) {
        if (cur.trim()) { terms.push([sign, cur.trim()]); sign = ch; }
        else sign = (sign === "-") !== (ch === "-") ? "-" : "+";
        cur = "";
      } else cur += ch;
    }
    var regs = [], expr = [], flat = [];
    function flatten(sg, term) {
      var tt = term;
      while (tt.charAt(0) === "(" && tt.charAt(tt.length - 1) === ")" && balanced(tt.slice(1, -1))) {
        tt = tt.slice(1, -1).trim();
        var sub = splitTerms(tt);
        if (sub.length > 1) {
          sub.forEach(function (x) { flatten((sg === "-") !== (x[0] === "-") ? "-" : "+", x[1]); });
          return;
        }
      }
      flat.push([sg, tt]);
    }
    terms.forEach(function (x) { flatten(x[0], x[1]); });
    flat.forEach(function (x) {
      var u = x[1].toUpperCase();
      if (["BX", "BP", "SI", "DI"].indexOf(u) >= 0) {
        if (x[0] === "-") throw new AsmError("yazmaç çıkarılamaz: " + t, st.line);
        regs.push(u);
      } else if (has(REG16, u) || has(REG8, u) || has(SREG, u)) {
        throw new AsmError("8086 adreslemede yalnız BX, BP, SI, DI kullanılabilir: " + t, st.line);
      } else expr.push(x[0] + "(" + x[1] + ")");
    });
    var base = null, index = null;
    regs.forEach(function (r) {
      if (r === "BX" || r === "BP") { if (base) throw new AsmError("iki taban yazmacı birlikte kullanılamaz: " + t, st.line); base = r; }
      else { if (index) throw new AsmError("iki indis yazmacı birlikte kullanılamaz: " + t, st.line); index = r; }
    });
    var v = expr.length ? this.ev(expr.join(""), st) : new Val(0);
    if (size == null && v.vr) size = v.vr.size;
    return new Op("mem", { size: size, base: base, index: index, disp: v.val, reloc: v.reloc || !!v.vr, vr: v.vr,
      unknown: v.unknown, seg: segovr, text: t, direct: base == null && index == null, ptr: ptr });
  };
  Assembler.prototype.dataItems = function (st, unit) {
    var out = [], countFirst = null, self = this;
    splitTop(st.args).forEach(function (it) {
      if (it === "") throw new AsmError("boş veri öğesi", st.line, st.text);
      var n = self.dataItem(it, st, unit, out);
      if (countFirst == null) countFirst = n;
    });
    return [out, countFirst || 1];
  };
  Assembler.prototype.dataItem = function (it, st, unit, out) {
    var m = /^([\s\S]+?)\s+DUP\s*\(([\s\S]*)\)\s*$/i.exec(it), self = this, i;
    if (m) {
      var n = this.ev(m[1], st).val, sub = [];
      splitTop(m[2]).forEach(function (x) { self.dataItem(x, st, unit, sub); });
      for (i = 0; i < n; i++) for (var j = 0; j < sub.length; j++) out.push(sub[j]);
      return n;
    }
    var q = it.charAt(0);
    if ((q === "'" || q === '"') && it.charAt(it.length - 1) === q && it.length >= 2 && it.split(q).length % 2 === 1) {
      var s = it.slice(1, -1).split(q + q).join(q);
      if (unit === 1) { for (i = 0; i < s.length; i++) out.push(s.charCodeAt(i) & 0xFF); return s.length; }
      if (s.length <= 2 && unit === 2) {
        var v0 = 0;
        for (i = 0; i < s.length; i++) v0 = (v0 << 8) | s.charCodeAt(i);
        out.push(v0 & 0xFF, (v0 >> 8) & 0xFF);
        return 1;
      }
      throw new AsmError("DW/DD içinde uzun dizgi", st.line, st.text);
    }
    if (it === "?") { for (i = 0; i < unit; i++) out.push(0); return 1; }
    var v = this.ev(it, st), x = v.val;
    if (unit === 1) {
      if (!v.unknown && !(x >= -128 && x <= 255)) throw new AsmError("bayt değeri sığmıyor: " + it + " = " + x, st.line, st.text);
      out.push(x & 0xFF);
    } else if (unit === 2) {
      if (!v.unknown && !(x >= -32768 && x <= 65535)) throw new AsmError("sözcük değeri sığmıyor: " + it, st.line, st.text);
      out.push(x & 0xFF, (x >> 8) & 0xFF);
    } else {
      if ((v.label || v.vr) && v.reloc) { var sg = v.segv || 0; out.push(x & 0xFF, (x >> 8) & 0xFF, sg & 0xFF, (sg >> 8) & 0xFF); }
      else { x = x >>> 0; out.push(x & 0xFF, (x >>> 8) & 0xFF, (x >>> 16) & 0xFF, (x >>> 24) & 0xFF); }
    }
    return 1;
  };
  Assembler.prototype.assemble = function () {
    this.parse();
    this.prev = {}; this.prevSegs = {};
    for (var p = 0; p < 40; p++) {
      this.final = false;
      var changed = this.layoutPass(false);
      if (!changed && p > 0) break;
    }
    this.final = true;
    this.unresolved = {};
    this.unresLine = {};
    this.layoutPass(true);
    var un = Object.keys(this.unresolved).sort(), self = this;
    if (un.length) {
      var lines = un.map(function (k) { return self.unresLine[k]; }).filter(Boolean);
      throw new AsmError("tanımsız sembol(ler): " + un.map(function (k) { return self.rawName[k] || k.toLowerCase(); }).join(", "), lines.length ? Math.min.apply(null, lines) : null);
    }
    return this.build();
  };
  Assembler.prototype.layoutPass = function (final) {
    var self = this;
    this.syms = {}; this.segs = {}; this.unresolved = {}; this.textEqu = {}; this.com = true; this.entry = null;
    this.hasOrg = false; this.stackSize = null; this.segOrder = [];
    var cur = null, procStack = [];
    function getseg(name, kind) {
      if (!has(self.segs, name)) { self.segs[name] = new Segment(name, kind); self.segOrder.push(name); }
      cur = self.segs[name];
      return cur;
    }
    var NOSEG = [".MODEL", "SEGMENT", ".DATA", ".CODE", ".STACK", "ASSUME", "NAME", "TITLE", "PAGE", ".8086", ".186", "ORG"];
    for (var si = 0; si < this.stmts.length; si++) {
      var st = this.stmts[si];
      this.curLine = st.line;
      if (cur == null && !(NOSEG.indexOf(st.op) >= 0 || st.kind === "equ")) {
        getseg(this.com ? "CODE" : "_TEXT");
        if (!this.hasOrg && this.com && st.kind !== "equ") { cur.loc = 0x100; this.implicitOrg = true; }
      }
      this.curLoc = cur ? cur.loc : 0;
      st.seg = cur ? cur.name : null;
      st.addr = this.curLoc;
      if (st.label) this.define(st.label, new Sym(st.label, "label", st.seg, cur ? cur.loc : 0), st);
      var op = st.op, size = 0;
      if (st.kind === "label") { /* yalnız etiket */ }
      else if (st.kind === "equ") this.doEqu(st);
      else if (st.kind === "data") {
        var unit = { DB: 1, DW: 2, DD: 4 }[op];
        if (!st.args) throw new AsmError("veri tanımında değer yok", st.line, st.text);
        var di = this.dataItems(st, unit);
        st.bytes = di[0]; size = di[0].length;
        if (st.name) this.define(st.name, new Sym(st.name, "var", st.seg, cur.loc, { size: unit, length: di[1] }), st);
      } else if (st.kind === "dir") {
        if (op === "ORG") {
          if (cur == null) getseg("CODE");
          var ov = this.ev(st.args, st).val;
          this.hasOrg = true; cur.loc = ov; st.addr = ov;
        } else if (op === ".MODEL") this.com = false;
        else if (op === ".DATA") { this.com = false; getseg("DATA", "data"); }
        else if (op === ".CODE") { this.com = false; getseg("_TEXT", "code"); }
        else if (op === ".STACK") {
          this.com = false;
          var n = st.args ? this.ev(st.args, st).val : 0x400;
          this.stackSize = n;
          var prevCur = cur, sg = getseg("STACK", "stack");
          sg.stack = true; sg.loc = sg.size = n;
          cur = prevCur;
        } else if (op === "SEGMENT") {
          this.com = false;
          var sg2 = getseg(st.name, "code");
          if (/\bSTACK\b/i.test(st.args)) sg2.stack = true;
        } else if (op === "ENDS") cur = null;
        else if (op === "PROC") {
          var far = /\bFAR\b/i.test(st.args);
          this.define(st.name, new Sym(st.name, "label", st.seg, cur.loc, { far: far }), st);
          procStack.push(far);
        } else if (op === "ENDP") { if (procStack.length) procStack.pop(); }
        else if (op === "LABEL") {
          var typ = st.args.trim().toUpperCase();
          if (typ === "BYTE" || typ === "WORD" || typ === "DWORD") this.define(st.name, new Sym(st.name, "var", st.seg, cur.loc, { size: { BYTE: 1, WORD: 2, DWORD: 4 }[typ] }), st);
          else this.define(st.name, new Sym(st.name, "label", st.seg, cur.loc, { far: typ === "FAR" }), st);
        } else if (op === "EVEN") { if (cur.loc % 2) { st.bytes = [0x90]; size = 1; } }
        else if (op === "ALIGN") {
          var al = st.args ? this.ev(st.args, st).val : 2, pad = pymod(-cur.loc, al);
          st.bytes = []; for (var q = 0; q < pad; q++) st.bytes.push(0x90);
          size = pad;
        } else if (op === "END") { if (st.args) this.entry = st.args.trim().toUpperCase(); }
        else if (op === ".EXIT") { st.kind = "instr"; st.op = ".EXIT"; st.bytes = [0xB4, 0x4C, 0xCD, 0x21]; size = 4; }
      } else {
        st.procFar = procStack.length ? procStack[procStack.length - 1] : false;
        var b;
        try { b = this.encode(st, final); }
        catch (e) {
          if (!(e instanceof AsmError)) throw e;
          if (final || !Object.keys(this.unresolved).length) throw new AsmError(e.msg, st.line, st.text);
          b = st.bytes.length ? st.bytes : [0x90];
        }
        st.bytes = b; size = b.length;
      }
      st.size = size;
      if (cur != null) { cur.loc += size; cur.size = Math.max(cur.size, cur.loc); }
    }
    var name;
    if (this.com) { for (name in this.segs) this.segs[name].para = PSP_SEG; }
    else {
      var para = PSP_SEG + 0x10;
      this.segOrder.forEach(function (nm) { var sgx = self.segs[nm]; sgx.para = para; para += Math.floor((sgx.size + 15) / 16); });
      this.stackPara = para;
    }
    var ns = {}, os = {}, segs = {};
    for (name in this.syms) ns[name] = this.syms[name].key();
    for (name in this.prev) os[name] = this.prev[name].key();
    for (name in this.segs) segs[name] = this.segs[name].para;
    var changed = JSON.stringify(sortObj(ns)) !== JSON.stringify(sortObj(os)) || JSON.stringify(sortObj(segs)) !== JSON.stringify(sortObj(this.prevSegs)) || this._grew;
    this.prev = this.syms; this.prevSegs = segs; this._grew = false;
    return changed;
  };
  function sortObj(o) { var r = {}; Object.keys(o).sort().forEach(function (k) { r[k] = o[k]; }); return r; }
  Assembler.prototype.define = function (name, sym, st) {
    if (has(this.syms, name)) throw new AsmError("sembol iki kez tanımlandı: " + name, st.line, st.text);
    if (has(REG16, name) || has(REG8, name) || has(SREG, name)) throw new AsmError("yazmaç adı etiket olamaz: " + name, st.line, st.text);
    if (has(MNEMONICS, name) || has(PREFIXES, name)) this.warn(st, "'" + name + "' komut adıyla aynı etiket (emu8086 kabul eder, MASM hata verir)");
    this.syms[name] = sym;
  };
  Assembler.prototype.doEqu = function (st) {
    var txt = st.args.trim(), name = st.name, self = this;
    try {
      var before = Object.assign({}, this.unresolved);
      var v = new Expr(this.substText(txt), function (n) { return self.lookup(n); }, this.curLoc, st.line).value();
      if (v.unknown) this.unresolved = Object.assign(before, this.unresolved);
      var sym = new Sym(name, "const", null, 0, { value: v });
      if (st.op === "=" && has(this.syms, name)) this.syms[name] = sym;
      else this.define(name, sym, st);
    } catch (e) {
      if (!(e instanceof AsmError)) throw e;
      this.textEqu[name] = txt;
      this.syms[name] = new Sym(name, "text", null, 0, { value: txt });
    }
  };
  Assembler.prototype.modrm = function (regf, o, st) {
    if (o.kind === "r8" || o.kind === "r16") return [0xC0 | (regf << 3) | (o.kind === "r8" ? REG8[o.reg] : REG16[o.reg])];
    if (o.kind !== "mem") throw new AsmError("bellek ya da yazmaç işleneni bekleniyordu: " + o.text, st.line);
    var d = o.disp & 0xFFFF;
    if (o.base == null && o.index == null) return [(regf << 3) | 6, d & 0xFF, d >> 8];
    var rm = { "BX,SI": 0, "BX,DI": 1, "BP,SI": 2, "BP,DI": 3, ",SI": 4, ",DI": 5, "BP,": 6, "BX,": 7 }[(o.base || "") + "," + (o.index || "")];
    var sd = s16(o.disp), mod;
    if (o.reloc || o.unknown || has(st.wide, "d16:" + o.text)) { mod = 2; if (!this.final) st.wide["d16:" + o.text] = 1; }
    else if (sd === 0 && rm !== 6) mod = 0;
    else if (sd >= -128 && sd <= 127) mod = 1;
    else mod = 2;
    if (mod === 0) return [(regf << 3) | rm];
    if (mod === 1) return [0x40 | (regf << 3) | rm, sd & 0xFF];
    return [0x80 | (regf << 3) | rm, d & 0xFF, d >> 8];
  };
  Assembler.prototype.segpfx = function (st, o) {
    var res = [];
    st.prefixes.forEach(function (p) { if (has(PREFIXES, p)) res.push(PREFIXES[p]); else if (/:$/.test(p)) res.push(SEGPFX[p.slice(0, 2)]); });
    if (o && o.kind === "mem" && o.seg) { var def = o.base === "BP" ? "SS" : "DS"; if (o.seg !== def) res.push(SEGPFX[o.seg]); }
    return res;
  };
  Assembler.prototype.opsize = function (st, a, b) {
    var sa = a.kind !== "imm" ? a.size : null, sb = b && b.kind !== "imm" ? b.size : null;
    if (a.kind === "sreg" || (b && b.kind === "sreg")) return 2;
    var isR = function (o) { return o.kind === "r8" || o.kind === "r16"; };
    if (sa && sb && sa !== sb) {
      if ((a.kind === "mem" && a.ptr == null && isR(b)) || (b.kind === "mem" && b.ptr == null && isR(a)))
        throw new AsmError("işlenen boyutları uyuşmuyor (" + a.text + " " + sa + " bayt, " + b.text + " " + sb + " bayt)", st.line, st.text);
      if (isR(a) && isR(b)) throw new AsmError("işlenen boyutları uyuşmuyor: " + a.text + ", " + b.text, st.line, st.text);
      var sz0 = a.ptr ? a.size : b.size;
      if (sz0 !== 1 && sz0 !== 2) throw new AsmError("geçersiz işlenen boyutu", st.line, st.text);
      return sz0;
    }
    var sz = sa || sb;
    if (sz == null) throw new AsmError("işlenen boyutu belirsiz: BYTE PTR ya da WORD PTR gerekir", st.line, st.text);
    if (sz !== 1 && sz !== 2) throw new AsmError("8086 komutu için geçersiz boyut (" + sz + " bayt)", st.line, st.text);
    return sz;
  };
  Assembler.prototype.immBytes = function (v, w, st, o) {
    if (!o.unknown && !o.reloc) {
      if (w === 1 && !(v >= -128 && v <= 255)) throw new AsmError("anında değer bayta sığmıyor: " + o.text, st.line, st.text);
      if (w === 2 && !(v >= -32768 && v <= 65535)) throw new AsmError("anında değer sözcüğe sığmıyor: " + o.text, st.line, st.text);
    }
    v &= 0xFFFF;
    return w === 1 ? [v & 0xFF] : [v & 0xFF, v >> 8];
  };
  function cat() { var r = []; for (var i = 0; i < arguments.length; i++) r = r.concat(arguments[i]); return r; }
  Assembler.prototype.rcode = function (o) {
    if (o.kind === "r8") return REG8[o.reg];
    if (o.kind === "r16") return REG16[o.reg];
    throw new AsmError("yazmaç bekleniyordu: " + o.text);
  };
  Assembler.prototype.warn = function (st, msg) {
    var w = "satır " + st.line + ": " + msg;
    if (this.final && this.warnings.indexOf(w) < 0) this.warnings.push(w);
  };
  Assembler.prototype.encode = function (st, final) {
    var mn = st.op, self = this;
    var args = st.args.trim() ? splitTop(st.args) : [];
    var ops = args.map(function (a) { return self.operand(a, st); });
    st.ops = ops;
    var n = ops.length, a, b, w, isR = function (o) { return o.kind === "r8" || o.kind === "r16"; };
    function need(k) { if (n !== k) throw new AsmError(mn + " " + k + " işlenen ister", st.line, st.text); }
    if (mn === "IN" || mn === "OUT") { /* aşağıda */ }
    if (has(SIMPLE, mn)) { need(0); return cat(this.segpfx(st, null), [SIMPLE[mn]]); }
    if (has(STRING_OPS, mn)) {
      if (n === 0) throw new AsmError(mn + " işlenen ister (ya da " + mn + "B/" + mn + "W kullanılmalı)", st.line);
      var sz = null;
      ops.forEach(function (o) { if (o.kind === "mem" && o.size) sz = o.size; });
      if (sz == null) throw new AsmError("dizgi komutunda boyut belirsiz", st.line, st.text);
      st.op = mn + (sz === 1 ? "B" : "W");
      var src = (mn === "MOVS" || mn === "CMPS" || mn === "LODS") ? ops[ops.length - 1] : null;
      if (mn === "CMPS") src = ops[0];
      var srcovr = src && src.seg && src.seg !== "DS" ? src.seg : null;
      st.ops = [];
      if (srcovr) st.prefixes = st.prefixes.concat([srcovr + ":"]);
      return cat(this.segpfx(st, null), [STRING_OPS[mn] + (sz - 1)]);
    }
    if (mn === "XLAT") {
      var xo = ops.length ? ops[0] : null;
      if (xo && xo.kind === "mem" && xo.seg && xo.seg !== "DS") st.prefixes = st.prefixes.concat([xo.seg + ":"]);
      st.op = "XLATB"; st.ops = [];
      return cat(this.segpfx(st, null), [0xD7]);
    }
    if (mn === "AAM" || mn === "AAD") {
      var base = 10;
      if (n === 1) base = ops[0].val & 0xFF;
      st.aamBase = base;
      return [mn === "AAM" ? 0xD4 : 0xD5, base];
    }
    if (has(ALU, mn)) {
      need(2); a = ops[0]; b = ops[1];
      var code = ALU[mn];
      if (a.kind === "imm") throw new AsmError("hedef anında değer olamaz", st.line, st.text);
      if (a.kind === "sreg" || b.kind === "sreg") throw new AsmError("kesim yazmacı aritmetik/mantık komutunda kullanılamaz", st.line, st.text);
      if (b.kind === "imm") {
        w = this.opsize(st, a);
        if (isR(a) && (a.reg === "AL" || a.reg === "AX")) return cat(this.segpfx(st, a), [code * 8 + 4 + (w - 1)], this.immBytes(b.val, w, st, b));
        if (w === 1) return cat(this.segpfx(st, a), [0x80], this.modrm(code, a, st), this.immBytes(b.val, 1, st, b));
        var sv = s16(b.val);
        if (!b.reloc && !b.unknown && sv >= -128 && sv <= 127 && !has(st.wide, "i16")) return cat(this.segpfx(st, a), [0x83], this.modrm(code, a, st), [sv & 0xFF]);
        if (!final && b.unknown) st.wide.i16 = 1;
        return cat(this.segpfx(st, a), [0x81], this.modrm(code, a, st), this.immBytes(b.val, 2, st, b));
      }
      if (a.kind === "mem" && b.kind === "mem") throw new AsmError("iki bellek işleneni birlikte kullanılamaz", st.line, st.text);
      w = this.opsize(st, a, b);
      if (isR(a)) return cat(this.segpfx(st, b), [code * 8 + 2 + (w - 1)], this.modrm(this.rcode(a), b, st));
      return cat(this.segpfx(st, a), [code * 8 + (w - 1)], this.modrm(this.rcode(b), a, st));
    }
    if (mn === "TEST") {
      need(2); a = ops[0]; b = ops[1];
      if (b.kind === "imm") {
        w = this.opsize(st, a);
        if (isR(a) && (a.reg === "AL" || a.reg === "AX")) return cat([0xA8 + w - 1], this.immBytes(b.val, w, st, b));
        return cat(this.segpfx(st, a), [0xF6 + w - 1], this.modrm(0, a, st), this.immBytes(b.val, w, st, b));
      }
      if (a.kind === "mem" && b.kind === "mem") throw new AsmError("iki bellek işleneni birlikte kullanılamaz", st.line, st.text);
      w = this.opsize(st, a, b);
      if (a.kind === "mem") { var tt = a; a = b; b = tt; }
      return cat(this.segpfx(st, b), [0x84 + w - 1], this.modrm(this.rcode(a), b, st));
    }
    if (has(GRP3, mn)) {
      need(1); a = ops[0];
      if (a.kind === "imm") throw new AsmError(mn + " anında değer alamaz (8086)", st.line, st.text);
      w = this.opsize(st, a);
      return cat(this.segpfx(st, a), [0xF6 + w - 1], this.modrm(GRP3[mn], a, st));
    }
    if (mn === "INC" || mn === "DEC") {
      need(1); a = ops[0];
      if (a.kind === "r16") return [(mn === "INC" ? 0x40 : 0x48) + REG16[a.reg]];
      w = this.opsize(st, a);
      return cat(this.segpfx(st, a), [0xFE + w - 1], this.modrm(mn === "INC" ? 0 : 1, a, st));
    }
    if (has(SHIFTS, mn)) {
      need(2); a = ops[0]; b = ops[1];
      w = this.opsize(st, a);
      var sc = SHIFTS[mn];
      if (b.kind === "r8" && b.reg === "CL") return cat(this.segpfx(st, a), [0xD2 + w - 1], this.modrm(sc, a, st));
      if (b.kind !== "imm") throw new AsmError("kaydırma sayısı 1 ya da CL olmalı", st.line, st.text);
      if (b.val === 1) return cat(this.segpfx(st, a), [0xD0 + w - 1], this.modrm(sc, a, st));
      this.warn(st, "kaydırma sayısı " + b.val + " anında değer: 8086'da yok (80186+ C0/C1); emu8086 kabul eder");
      return cat(this.segpfx(st, a), [0xC0 + w - 1], this.modrm(sc, a, st), [b.val & 0xFF]);
    }
    if (mn === "MOV") {
      need(2); a = ops[0]; b = ops[1];
      if (a.kind === "imm" || a.kind === "farimm") throw new AsmError("MOV hedefi anında değer olamaz", st.line, st.text);
      if (a.kind === "mem" && b.kind === "mem") throw new AsmError("MOV bellekten belleğe yapılamaz", st.line, st.text);
      if (a.kind === "sreg") {
        if (b.kind === "imm") throw new AsmError("kesim yazmacına anında değer yüklenemez (önce AX'e yüklenmeli)", st.line, st.text);
        if (b.kind === "sreg") throw new AsmError("kesim yazmacından kesim yazmacına MOV yok", st.line, st.text);
        if (a.reg === "CS") throw new AsmError("MOV CS, ... kullanılamaz", st.line, st.text);
        if (b.kind === "r8" || (b.kind === "mem" && b.size === 1 && b.ptr)) throw new AsmError("kesim yazmacı 16 bittir", st.line, st.text);
        return cat(this.segpfx(st, b), [0x8E], this.modrm(SREG[a.reg], b, st));
      }
      if (b.kind === "sreg") {
        if (a.kind === "r8") throw new AsmError("kesim yazmacı 16 bittir", st.line, st.text);
        return cat(this.segpfx(st, a), [0x8C], this.modrm(SREG[b.reg], a, st));
      }
      if (b.kind === "imm") {
        w = this.opsize(st, a);
        if (isR(a)) return cat([(w === 1 ? 0xB0 : 0xB8) + this.rcode(a)], this.immBytes(b.val, w, st, b));
        return cat(this.segpfx(st, a), [0xC6 + w - 1], this.modrm(0, a, st), this.immBytes(b.val, w, st, b));
      }
      w = this.opsize(st, a, b);
      var d;
      if (isR(a)) {
        if ((a.reg === "AL" || a.reg === "AX") && b.kind === "mem" && b.direct) { d = b.disp & 0xFFFF; return cat(this.segpfx(st, b), [0xA0 + w - 1, d & 0xFF, d >> 8]); }
        return cat(this.segpfx(st, b), [0x8A + w - 1], this.modrm(this.rcode(a), b, st));
      }
      if ((b.reg === "AL" || b.reg === "AX") && a.kind === "mem" && a.direct) { d = a.disp & 0xFFFF; return cat(this.segpfx(st, a), [0xA2 + w - 1, d & 0xFF, d >> 8]); }
      return cat(this.segpfx(st, a), [0x88 + w - 1], this.modrm(this.rcode(b), a, st));
    }
    if (mn === "XCHG") {
      need(2); a = ops[0]; b = ops[1];
      if (a.kind === "mem" && b.kind === "mem") throw new AsmError("XCHG iki bellek işleneni alamaz", st.line, st.text);
      if (a.kind === "imm" || a.kind === "sreg" || b.kind === "imm" || b.kind === "sreg") throw new AsmError("XCHG yalnız yazmaç/bellek işlenenleri alır", st.line, st.text);
      w = this.opsize(st, a, b);
      if (w === 2 && a.kind === "r16" && b.kind === "r16" && (a.reg === "AX" || b.reg === "AX")) return [0x90 + REG16[(a.reg === "AX" ? b : a).reg]];
      if (a.kind === "mem") { var t2 = a; a = b; b = t2; }
      return cat(this.segpfx(st, b), [0x86 + w - 1], this.modrm(this.rcode(a), b, st));
    }
    if (mn === "LEA" || mn === "LDS" || mn === "LES") {
      need(2); a = ops[0]; b = ops[1];
      if (a.kind !== "r16") throw new AsmError(mn + " hedefi 16 bitlik yazmaç olmalı", st.line, st.text);
      if (b.kind !== "mem") throw new AsmError(mn + " kaynağı bellek işleneni olmalı", st.line, st.text);
      if (mn === "LEA" && !this.leaMasm && b.direct && b.base == null && b.index == null && !b.seg && !st.prefixes.length)
        return cat([0xB8 + REG16[a.reg]], this.immBytes(b.disp, 2, st, b));
      return cat(this.segpfx(st, b), [{ LEA: 0x8D, LDS: 0xC5, LES: 0xC4 }[mn]], this.modrm(REG16[a.reg], b, st));
    }
    if (mn === "PUSH") {
      need(1); a = ops[0];
      if (a.kind === "r16") return [0x50 + REG16[a.reg]];
      if (a.kind === "sreg") return [0x06 + 8 * SREG[a.reg]];
      if (a.kind === "mem") {
        if (a.size !== 2 && a.size != null) throw new AsmError("PUSH yalnız 16 bit işlenen alır", st.line, st.text);
        a.size = 2;
        return cat(this.segpfx(st, a), [0xFF], this.modrm(6, a, st));
      }
      if (a.kind === "imm") {
        this.warn(st, "PUSH anında değer 8086'da yok (80186+); emu8086 kabul eder");
        var pv = s16(a.val);
        if (pv >= -128 && pv <= 127 && !a.reloc && !has(st.wide, "i16")) return [0x6A, pv & 0xFF];
        return cat([0x68], this.immBytes(a.val, 2, st, a));
      }
      throw new AsmError("PUSH 8 bitlik yazmaç alamaz", st.line, st.text);
    }
    if (mn === "POP") {
      need(1); a = ops[0];
      if (a.kind === "r16") return [0x58 + REG16[a.reg]];
      if (a.kind === "sreg") { if (a.reg === "CS") throw new AsmError("POP CS kullanılamaz", st.line, st.text); return [0x07 + 8 * SREG[a.reg]]; }
      if (a.kind === "mem") {
        if (a.size !== 2 && a.size != null) throw new AsmError("POP yalnız 16 bit işlenen alır", st.line, st.text);
        a.size = 2;
        return cat(this.segpfx(st, a), [0x8F], this.modrm(0, a, st));
      }
      throw new AsmError("POP işleneni geçersiz", st.line, st.text);
    }
    if (mn === "IN" || mn === "OUT") {
      need(2);
      var acc = mn === "IN" ? ops[0] : ops[1], port = mn === "IN" ? ops[1] : ops[0];
      if (!isR(acc) || (acc.reg !== "AL" && acc.reg !== "AX")) throw new AsmError(mn + " yalnız AL ya da AX ile çalışır", st.line, st.text);
      w = acc.size;
      if (port.kind === "r16" && port.reg === "DX") return [(mn === "IN" ? 0xEC : 0xEE) + w - 1];
      if (port.kind === "imm") {
        if (!port.unknown && !(port.val >= 0 && port.val <= 255)) throw new AsmError("255'ten büyük port numarası DX ile verilmeli", st.line, st.text);
        return [(mn === "IN" ? 0xE4 : 0xE6) + w - 1, port.val & 0xFF];
      }
      throw new AsmError("port işleneni sabit (0-255) ya da DX olmalı", st.line, st.text);
    }
    if (mn === "INT") { need(1); var iv = ops[0].val & 0xFF; return iv === 3 ? [0xCC] : [0xCD, iv]; }
    if (mn === "RET" || mn === "RETN" || mn === "RETF") {
      var rf = mn === "RETF" || (mn === "RET" && !!st.procFar);
      st.far = rf;
      if (ops.length) return cat([rf ? 0xCA : 0xC2], this.immBytes(ops[0].val, 2, st, ops[0]));
      return [rf ? 0xCB : 0xC3];
    }
    if (has(JCC, mn) || has(LOOPS, mn) || mn === "JMP" || mn === "CALL") { need(1); return this.encodeBranch(st, mn, ops[0], final); }
    throw new AsmError("desteklenmeyen komut: " + mn, st.line, st.text);
  };
  Assembler.prototype.encodeBranch = function (st, mn, o, final) {
    var here = st.addr, rel;
    if ((o.kind === "r16" || o.kind === "mem") && (mn === "JMP" || mn === "CALL")) {
      st.indirect = true;
      var far = o.ptr === "DWORD" || o.ptr === "FAR" || (o.kind === "mem" && o.size === 4);
      st.far = far;
      if (o.kind === "mem" && !far) o.size = 2;
      var regf = mn === "JMP" ? (far ? 5 : 4) : (far ? 3 : 2);
      return cat(this.segpfx(st, o), [0xFF], this.modrm(regf, o, st));
    }
    st.indirect = false;
    if (o.kind === "farimm") {
      if (mn !== "JMP" && mn !== "CALL") throw new AsmError("koşullu atlama uzak olamaz", st.line, st.text);
      st.far = true; st.target = o.val; st.targetSeg = o.segv;
      return [mn === "JMP" ? 0xEA : 0x9A, o.val & 0xFF, o.val >> 8, o.segv & 0xFF, o.segv >> 8];
    }
    if (o.kind !== "imm") throw new AsmError("atlama hedefi geçersiz: " + o.text, st.line, st.text);
    var tgt = o.val & 0xFFFF, lab = o.label;
    st.target = tgt;
    var fr = o.ptr === "FAR" || (lab != null && lab.far && mn === "CALL" && o.ptr !== "NEAR");
    if (lab && lab.far && mn === "JMP" && o.ptr !== "NEAR") fr = true;
    if (lab && this.final && lab.seg !== st.seg && lab.seg != null && o.ptr !== "NEAR") fr = (mn === "JMP" || mn === "CALL") ? true : fr;
    if (fr) {
      if (mn !== "JMP" && mn !== "CALL") throw new AsmError("koşullu atlama uzak olamaz", st.line, st.text);
      st.far = true;
      var segv = o.segv || 0;
      st.targetSeg = segv;
      return [mn === "JMP" ? 0xEA : 0x9A, tgt & 0xFF, tgt >> 8, segv & 0xFF, segv >> 8];
    }
    st.far = false;
    if (mn === "CALL") { rel = (tgt - (here + 3)) & 0xFFFF; return [0xE8, rel & 0xFF, rel >> 8]; }
    if (has(LOOPS, mn)) {
      rel = tgt - (here + 2);
      if (!o.unknown && !(rel >= -128 && rel <= 127) && final) throw new AsmError(mn + " hedefi çok uzak (" + rel + " bayt; en çok -128..127)", st.line, st.text);
      return [LOOPS[mn], rel & 0xFF];
    }
    if (mn === "JMP") {
      if (o.ptr === "NEAR") st.long = true;
      if (!st.long) {
        rel = tgt - (here + 2);
        if (o.unknown || (rel >= -128 && rel <= 127)) return [0xEB, rel & 0xFF];
        if (o.short && final) throw new AsmError("JMP SHORT hedefi çok uzak", st.line, st.text);
        if (!o.short) { st.long = true; this._grew = true; }
      }
      rel = (tgt - (here + 3)) & 0xFFFF;
      return [0xE9, rel & 0xFF, rel >> 8];
    }
    var cc = JCC[mn];
    if (!st.long) {
      rel = tgt - (here + 2);
      if (o.unknown || (rel >= -128 && rel <= 127)) return [0x70 + cc, rel & 0xFF];
      st.long = true; this._grew = true;
    }
    rel = (tgt - (here + 5)) & 0xFFFF;
    if (final) this.warn(st, mn + " hedefi -128..127 dışında: emu8086 gibi ters koşul + JMP (5 bayt) üretildi");
    return [0x70 + (cc ^ 1), 3, 0xE9, rel & 0xFF, rel >> 8];
  };
  Assembler.prototype.build = function () {
    var self = this, prog = { stmts: this.stmts, syms: this.syms, segs: this.segs, com: this.com, warnings: this.warnings, code: {}, image: [],
      lines: (this.lines || []).map(function (l, i) { return { eid: i, no: l.no, text: l.text, macro: l.macro, anchor: l.anchor }; }) };
    if (this.implicitOrg && !this.hasOrg && this.com) prog.warnings.unshift("ORG 100h yok: .COM varsayıldı, kod 0100h'den başlatıldı");
    this.stmts.forEach(function (st) {
      if (st.seg == null || !st.bytes.length) return;
      var para = self.segs[st.seg].para, phys = ((para << 4) + st.addr) & 0xFFFFF;
      prog.image.push([phys, st.bytes]);
      st.cs = para;
      if (st.kind === "instr") prog.code[phys] = st;
    });
    if (this.com) prog.entry = [PSP_SEG, 0x100];
    else {
      var ent = null;
      if (this.entry && has(this.syms, this.entry)) { var s = this.syms[this.entry]; ent = [this.segs[s.seg].para, s.off]; }
      else {
        var cs = this.segs._TEXT || null;
        if (!cs) this.segOrder.some(function (nm) { var g = self.segs[nm]; if (g.kind === "code" && !g.stack) { cs = g; return true; } return false; });
        if (!cs) throw new AsmError("kod kesimi bulunamadı");
        var first = null;
        this.stmts.forEach(function (st) { if (st.seg === cs.name && st.kind === "instr" && (first == null || st.addr < first)) first = st.addr; });
        ent = [cs.para, first || 0];
      }
      prog.entry = ent;
      var stk = null;
      this.segOrder.some(function (nm) { if (self.segs[nm].stack) { stk = self.segs[nm]; return true; } return false; });
      prog.stack = stk ? [stk.para, stk.size & 0xFFFF] : [this.stackPara, (this.stackSize || 0x400) & 0xFFFF];
    }
    /* görüntüleme için: bağıl konum → etiket adı */
    prog.labelAt = {};
    prog.rawName = this.rawName;
    for (var k in this.syms) { var y = this.syms[k]; if (y.kind === "label" && !has(prog.labelAt, y.off)) prog.labelAt[y.off] = this.rawName[k] || k; }
    return prog;
  };
  function assemble(source, opts) { return new Assembler(source, opts).assemble(); }

  /* ================= makine ================= */
  function Machine(prog, opts) {
    opts = opts || {};
    this.prog = prog;
    this.mem = new Uint8Array(0x100000);
    this.r = [0, 0, 0, 0, 0, 0, 0, 0];
    this.s = [0, 0, 0, 0];
    this.f = { CF: 0, PF: 0, AF: 0, ZF: 0, SF: 0, TF: 0, IF: 1, DF: 0, OF: 0 };
    this.undef = {};
    this.out = ""; this.stepOut = ""; this.memlog = null;
    this.portLast = {}; this.cursor = [0, 0]; this.halted = null; this.steps = 0; this.cur = null;
    this.repStep = !!opts.repStep;
    this.input = String(opts.input || "").replace(/\r\n/g, "\r").replace(/\n/g, "\r").split("");
    this.keysRead = 0; this.polls = 0; this.pollDelay = opts.pollDelay || 0; this.pollEmpty = false;
    this.ports = {};
    var pk, po = opts.ports || {};
    for (pk in po) this.ports[/^\d+$/.test(pk) ? +pk : parseNumber(pk)] = Array.isArray(po[pk]) ? po[pk].slice() : po[pk];
    this.portWrites = []; this.printer = ""; this.pixels = {}; this.svc = null;
    this.videoMode = 3;   /* INT 10h/00h: 03h metin (B800h), 13h 320×200×256 grafik (A000h) */
    this.us = 0;          /* sanal zaman: program başından beri geçen mikrosaniye (INT 15h/86h ve laboratuvarın Oynat kipi ilerletir) */
    this.clock = opts.clock || [12, 0, 0, 0];
    this.date = opts.date || [2026, 1, 1, 4];
    var i;
    for (i = 0; i < 256; i++) { this.w16(i * 4, BIOS_OFF + i); this.w16(i * 4 + 2, BIOS_SEG); }
    this.w16(0x44A, 80); this.mem[0x484] = 24; this.mem[0x449] = 3;
    this.syncTicks();
    for (i = 0; i < 2000; i++) { this.mem[(VIDEO_SEG << 4) + 2 * i] = 0x20; this.mem[(VIDEO_SEG << 4) + 2 * i + 1] = 0x07; }
    var psp = PSP_SEG << 4;
    this.mem[psp] = 0xCD; this.mem[psp + 1] = 0x20;
    var pst = new Stmt(0, "INT 20h  (PSP:0000)");
    pst.op = "INT"; pst.ops = [new Op("imm", { val: 0x20, text: "20h" })]; pst.size = 2; pst.cs = PSP_SEG; pst.addr = 0; pst.bytes = [0xCD, 0x20];
    pst.show = "INT 20h"; pst.psp = true;
    this.pspStmt = pst;
    var self = this;
    prog.image.forEach(function (im) { for (var j = 0; j < im[1].length; j++) self.mem[(im[0] + j) & 0xFFFFF] = im[1][j]; });
    this.s[1] = prog.entry[0]; this.ip = prog.entry[1];
    if (prog.com) {
      this.s[3] = this.s[0] = this.s[2] = PSP_SEG;
      this.r[4] = 0xFFFE;
      this.w16((PSP_SEG << 4) + 0xFFFE, 0);
    } else {
      this.s[3] = this.s[0] = PSP_SEG;
      this.s[2] = prog.stack[0]; this.r[4] = prog.stack[1];
    }
    var init = opts.init || {};
    if (opts.cxSize && prog.com && !has(init, "CX")) {
      var tot = 0;
      prog.image.forEach(function (im) { tot += im[1].length; });
      this.r[1] = tot & 0xFFFF;
    }
    for (var key in init) {
      var ku = key.toUpperCase();
      if (has(REG16, ku) || has(REG8, ku) || has(SREG, ku) || ku === "IP") this.set(ku, init[key]);
      else if (has(FLAGBITS, ku)) this.f[ku] = init[key] ? 1 : 0;
      else if (ku === "FLAGS") this.setFlagsWord(init[key]);
      else if (ku === "MEM") {
        var mm = init[key];
        for (var ak in mm) {
          var addr, size = 1, val = mm[ak];
          var sk = /^(ES|CS|SS|DS)\s*:\s*([0-9A-F]+)H?$/i.exec(ak);
          if (/^\d+$/.test(ak)) addr = parseInt(ak, 10);
          else if (sk) addr = this.phys(this.s[SREG[sk[1].toUpperCase()]], parseInt(sk[2], 16));
          else {
            var parts = ak.split("+"), sym = prog.syms[parts[0].trim().toUpperCase()];
            if (!sym || (sym.kind !== "var" && sym.kind !== "label")) throw new EmuError("init mem: tanımsız değişken " + parts[0]);
            addr = (prog.segs[sym.seg].para << 4) + sym.off;
            if (parts[1]) { var of = parts[1].trim(); addr += /h$/i.test(of) ? parseInt(of.slice(0, -1), 16) : parseInt(of, 10); }
            size = sym.size || 1;
          }
          if (typeof val === "string") val = val.split("").map(function (c) { return c.charCodeAt(0) & 0xFF; });
          if (Array.isArray(val)) val = val.map(function (x) { return typeof x === "string" ? parseNumber(x) : x; });
          if (Array.isArray(val)) for (var q = 0; q < val.length; q++) this.mem[(addr + q) & 0xFFFFF] = val[q] & 0xFF;
          else if (size === 2) this.w16(addr, val);
          else this.mem[addr & 0xFFFFF] = val & 0xFF;
        }
      } else throw new EmuError("init anahtarı tanınmadı: " + key);
    }
    this.initSp = this.r[4];
  }
  var MP = Machine.prototype;
  /* ---- sanal zaman: saat + us; 0040:006C tık sayacı (IRQ 0'ın işi) zaman her değiştiğinde güncellenir ---- */
  MP.nowCs = function () {
    var c = this.clock;
    return ((c[0] * 3600 + c[1] * 60 + c[2]) * 100 + c[3] + Math.floor(this.us / 10000)) % 8640000;
  };
  MP.nowHmsc = function () {
    if (!this.us) return this.clock.slice();
    var t = this.nowCs();
    return [Math.floor(t / 360000), Math.floor(t / 6000) % 60, Math.floor(t / 100) % 60, t % 100];
  };
  MP.ticks = function () {
    var c = this.clock;
    /* günde 1800B0h tık: gece yarısında sayaç sıfırlanır */
    return Math.min(Math.floor((((c[0] * 3600 + c[1] * 60 + c[2]) + c[3] / 100 + this.us / 1000000) % 86400) * 18.2065), 0x1800AF);
  };
  MP.syncTicks = function () {
    var t = this.ticks();
    this.w16(0x46C, t & 0xFFFF); this.w16(0x46E, t >>> 16);
  };
  MP.advance = function (us) { this.us += us; this.syncTicks(); };
  MP.w16 = function (a, v) { this.mem[a & 0xFFFFF] = v & 0xFF; this.mem[(a + 1) & 0xFFFFF] = (v >> 8) & 0xFF; };
  MP.byte = function (a) { return this.mem[a & 0xFFFFF]; };
  MP.word = function (a) { return this.mem[a & 0xFFFFF] | (this.mem[(a + 1) & 0xFFFFF] << 8); };
  MP.phys = function (seg, off) { return ((seg << 4) + (off & 0xFFFF)) & 0xFFFFF; };
  MP.rd8 = function (seg, off) { return this.mem[this.phys(seg, off)]; };
  MP.rd16 = function (seg, off) { return this.mem[this.phys(seg, off)] | (this.mem[this.phys(seg, off + 1)] << 8); };
  MP.wr8 = function (seg, off, v) {
    var a = this.phys(seg, off), old = this.mem[a];
    v &= 0xFF;
    this.mem[a] = v;
    if (this.memlog) this.memlog.push([a, seg, off & 0xFFFF, old, v]);
  };
  MP.wr16 = function (seg, off, v) { this.wr8(seg, off, v); this.wr8(seg, (off + 1) & 0xFFFF, v >> 8); };
  MP.get = function (name) {
    if (has(REG16, name)) return this.r[REG16[name]];
    if (has(REG8, name)) { var c = REG8[name]; return c < 4 ? (this.r[c] & 0xFF) : (this.r[c - 4] >> 8); }
    if (has(SREG, name)) return this.s[SREG[name]];
    if (name === "IP") return this.ip;
    if (name === "FLAGS") return this.flagsWord();
    if (has(FLAGBITS, name)) return this.f[name];
    throw new EmuError("bilinmeyen ad " + name);
  };
  MP.set = function (name, v) {
    if (has(REG16, name)) this.r[REG16[name]] = v & 0xFFFF;
    else if (has(REG8, name)) {
      var c = REG8[name];
      v &= 0xFF;
      if (c < 4) this.r[c] = (this.r[c] & 0xFF00) | v; else this.r[c - 4] = (this.r[c - 4] & 0x00FF) | (v << 8);
    } else if (has(SREG, name)) this.s[SREG[name]] = v & 0xFFFF;
    else if (name === "IP") this.ip = v & 0xFFFF;
    else throw new EmuError("bilinmeyen ad " + name);
  };
  MP.flagsWord = function () { var w = 0xF002; for (var k in FLAGBITS) if (this.f[k]) w |= 1 << FLAGBITS[k]; return w; };
  MP.setFlagsWord = function (w) { for (var k in FLAGBITS) this.f[k] = (w >> FLAGBITS[k]) & 1; };
  MP.push = function (v) { var sp = (this.r[4] - 2) & 0xFFFF; this.r[4] = sp; this.wr16(this.s[2], sp, v); };
  MP.pop = function () { var sp = this.r[4], v = this.rd16(this.s[2], sp); this.r[4] = (sp + 2) & 0xFFFF; return v; };
  MP.ea = function (o) {
    var off = o.disp;
    if (o.base) off += this.r[REG16[o.base]];
    if (o.index) off += this.r[REG16[o.index]];
    off &= 0xFFFF;
    var seg = o.seg ? this.s[SREG[o.seg]] : o.base === "BP" ? this.s[2] : this.s[3];
    return [seg, off];
  };
  MP.rd = function (o, w) {
    var k = o.kind;
    if (k === "r8" || k === "r16" || k === "sreg") return this.get(o.reg);
    if (k === "imm") return o.val & (w === 1 ? 0xFF : 0xFFFF);
    if (k === "mem") { var e = this.ea(o); return w === 1 ? this.rd8(e[0], e[1]) : this.rd16(e[0], e[1]); }
    throw new EmuError("okunamayan işlenen " + o.text);
  };
  MP.wr = function (o, w, v) {
    var k = o.kind;
    if (k === "r8" || k === "r16" || k === "sreg") this.set(o.reg, v);
    else if (k === "mem") { var e = this.ea(o); if (w === 1) this.wr8(e[0], e[1], v); else this.wr16(e[0], e[1], v); }
    else throw new EmuError("yazılamayan işlenen " + o.text);
  };
  function osize(st) {
    var i;
    for (i = 0; i < st.ops.length; i++) { if (st.ops[i].kind === "r8") return 1; if (st.ops[i].kind === "r16" || st.ops[i].kind === "sreg") return 2; }
    for (i = 0; i < st.ops.length; i++) if (st.ops[i].kind === "mem" && st.ops[i].size) return st.ops[i].size;
    return 2;
  }
  MP.szp = function (r, w) {
    r &= w === 1 ? 0xFF : 0xFFFF;
    this.f.ZF = r === 0 ? 1 : 0;
    this.f.SF = r & (w === 1 ? 0x80 : 0x8000) ? 1 : 0;
    this.f.PF = parity(r);
    delete this.undef.ZF; delete this.undef.SF; delete this.undef.PF;
  };
  MP.defined = function () { for (var i = 0; i < arguments.length; i++) delete this.undef[arguments[i]]; };
  MP.undefined = function () { for (var i = 0; i < arguments.length; i++) this.undef[arguments[i]] = 1; };
  MP.add = function (a, b, c, w) {
    var m = w === 1 ? 0xFF : 0xFFFF, sb = w === 1 ? 0x80 : 0x8000, r = a + b + c;
    this.f.CF = r > m ? 1 : 0;
    r &= m;
    this.f.AF = (a ^ b ^ r) & 0x10 ? 1 : 0;
    this.f.OF = (a ^ r) & (b ^ r) & sb ? 1 : 0;
    this.szp(r, w); this.defined("CF", "AF", "OF");
    return r;
  };
  MP.sub = function (a, b, c, w) {
    var m = w === 1 ? 0xFF : 0xFFFF, sb = w === 1 ? 0x80 : 0x8000, r = a - b - c;
    this.f.CF = r < 0 ? 1 : 0;
    r &= m;
    this.f.AF = (a ^ b ^ r) & 0x10 ? 1 : 0;
    this.f.OF = (a ^ b) & (a ^ r) & sb ? 1 : 0;
    this.szp(r, w); this.defined("CF", "AF", "OF");
    return r;
  };
  MP.logic = function (r, w) {
    this.f.CF = this.f.OF = 0;
    this.szp(r, w); this.defined("CF", "OF"); this.undefined("AF"); this.f.AF = 0;
    return r & (w === 1 ? 0xFF : 0xFFFF);
  };
  MP.cond = function (cc) {
    var f = this.f, base = cc >> 1, r;
    if (base === 0) r = f.OF; else if (base === 1) r = f.CF; else if (base === 2) r = f.ZF;
    else if (base === 3) r = f.CF || f.ZF; else if (base === 4) r = f.SF; else if (base === 5) r = f.PF;
    else if (base === 6) r = f.SF !== f.OF; else r = f.ZF || (f.SF !== f.OF);
    r = !!r;
    return cc & 1 ? !r : r;
  };
  var INTOPS = { INT: 1, _BIOS: 1, ".EXIT": 1, INTO: 1 };
  MP.interrupt = function (n, retIp) {
    this.irq = { n: n, flags: this.flagsWord(), cs: this.s[1], ip: retIp };
    this.push(this.flagsWord()); this.push(this.s[1]); this.push(retIp);
    this.f.IF = 0; this.f.TF = 0;
    this.s[1] = this.rd16(0, n * 4 + 2); this.ip = this.rd16(0, n * 4);
  };
  MP.doInt = function (n, retIp) {
    var off = this.rd16(0, n * 4), seg = this.rd16(0, n * 4 + 2);
    if (seg === BIOS_SEG && off === BIOS_OFF + n) { this.ip = retIp; this.builtin(n); }
    else this.interrupt(n, retIp);
  };
  MP.divideError = function () {
    var off = this.rd16(0, 0), seg = this.rd16(0, 2);
    if (seg === BIOS_SEG && off === BIOS_OFF) throw new EmuError("bölme hatası (INT 0): bölen 0 ya da bölüm hedefe sığmıyor");
    this.interrupt(0, this.ipNext);
    this.jumped = true;
  };
  MP.emit = function (ch, attr) { this.out += ch; this.stepOut += ch; this.tty(ch, attr); };
  MP.tty = function (ch, attr) {
    var c = ch.charCodeAt(0) & 0xFF, row = this.cursor[0], col = this.cursor[1];
    if (c === 13) col = 0;
    else if (c === 10) row++;
    else if (c === 8) col = Math.max(0, col - 1);
    else if (c !== 7) {
      var a = (VIDEO_SEG << 4) + 2 * (row * 80 + col);
      this.mem[a] = c;
      if (attr != null) this.mem[a + 1] = attr & 0xFF;
      col++;
      if (col >= 80) { col = 0; row++; }
    }
    if (row >= 25) {
      var base = VIDEO_SEG << 4;
      this.mem.copyWithin(base, base + 160, base + 25 * 160);
      for (var i = 0; i < 80; i++) { this.mem[base + 24 * 160 + 2 * i] = 0x20; this.mem[base + 24 * 160 + 2 * i + 1] = 0x07; }
      row = 24;
    }
    this.cursor = [row, col];
  };
  MP.clearWindow = function (r1, c1, r2, c2, attr) {
    for (var r = r1; r <= Math.min(r2, 24); r++) for (var c = c1; c <= Math.min(c2, 79); c++) {
      var a = (VIDEO_SEG << 4) + 2 * (r * 80 + c);
      this.mem[a] = 0x20; this.mem[a + 1] = attr;
    }
  };
  /* tarama kodları (emu8086.py SCAN tablosu) */
  var SCAN = {};
  "1234567890-=".split("").forEach(function (c, i) { SCAN[c] = 2 + i; });
  [["qwertyuiop", 0x10], ["asdfghjkl", 0x1E], ["zxcvbnm", 0x2C]].forEach(function (rw) {
    rw[0].split("").forEach(function (c, i) { SCAN[c] = rw[1] + i; SCAN[c.toUpperCase()] = rw[1] + i; });
  });
  SCAN["\r"] = 0x1C; SCAN[" "] = 0x39; SCAN["\x1b"] = 0x01; SCAN["\b"] = 0x0E; SCAN["\t"] = 0x0F;
  function bcd(v) { return (Math.floor(v / 10) << 4) | (v % 10); }
  /* tuş durumu sorgusu (INT 16h/01h, INT 21h/0Bh, 06h): pollDelay kadar sorgu "tuş yok" döner */
  MP.keyReady = function () {
    if (this.polls < this.pollDelay) { this.polls++; return false; }
    var r = this.input.length > 0;
    if (!r) this.pollEmpty = true;
    return r;
  };
  MP.key = function (what) {
    if (!this.input.length) throw new InputWait(what);
    this.keysRead++;
    return this.input.shift();
  };
  MP.builtin = function (n) {
    var ah = this.get("AH"), al = this.get("AL"), seg, off, i, ch, c;
    if (n === 0x20) { this.halted = "INT 20h"; return; }
    if (n === 0x21) {
      if (ah === 0x00) this.halted = "INT 21h/00h";
      else if (ah === 0x4C) this.halted = "INT 21h/4Ch (çıkış kodu " + al + ")";
      else if (ah === 0x01) { ch = this.key("INT 21h, AH = 01h"); this.set("AL", ch.charCodeAt(0)); this.emit(ch); }
      else if (ah === 0x07 || ah === 0x08) this.set("AL", this.key("INT 21h, AH = " + hx(ah, 1)).charCodeAt(0));
      else if (ah === 0x02) { var dl = this.get("DL"); this.emit(String.fromCharCode(dl)); this.set("AL", dl); }
      else if (ah === 0x06) {
        var d6 = this.get("DL");
        if (d6 === 0xFF) {
          if (this.keyReady()) { this.keysRead++; this.set("AL", this.input.shift().charCodeAt(0)); this.f.ZF = 0; }
          else { this.set("AL", 0); this.f.ZF = 1; }
        } else { this.emit(String.fromCharCode(d6)); this.set("AL", d6); }
      } else if (ah === 0x09) {
        seg = this.s[3]; off = this.get("DX");
        var cnt = 0;
        for (;;) {
          c = this.rd8(seg, off);
          if (c === 0x24) break;
          this.emit(String.fromCharCode(c));
          off = (off + 1) & 0xFFFF;
          if (++cnt > 65535) throw new EmuError("INT 21h/09h: '$' sonlandırıcı bulunamadı");
        }
        this.set("AL", 0x24);
      } else if (ah === 0x0A) {
        seg = this.s[3]; off = this.get("DX");
        /* satır Enter ile bitmeden hiçbir şey yapılmaz (adım yan etkisiz geri alınabilsin) */
        if (this.input.indexOf("\r") < 0) throw new InputWait("INT 21h, AH = 0Ah");
        var mx = this.rd8(seg, off), buf = [];
        for (;;) {
          ch = this.key("INT 21h, AH = 0Ah");
          if (ch === "\r") break;
          if (ch === "\b") { if (buf.length) { buf.pop(); this.emit("\b"); } continue; }
          if (buf.length < mx - 1) { buf.push(ch); this.emit(ch); }
        }
        for (i = 0; i < buf.length; i++) this.wr8(seg, off + 2 + i, buf[i].charCodeAt(0));
        this.wr8(seg, off + 2 + buf.length, 13);
        this.wr8(seg, off + 1, buf.length);
        this.emit("\r");
        this.svc = { buf: buf.join(""), mx: mx, at: off };
      } else if (ah === 0x0B) this.set("AL", this.keyReady() ? 0xFF : 0);
      else if (ah === 0x05) this.printer += String.fromCharCode(this.get("DL"));
      else if (ah === 0x0C) {
        this.input = [];
        if ([1, 6, 7, 8, 0x0A].indexOf(al) >= 0) { this.set("AH", al); this.builtin(0x21); this.set("AH", 0x0C); }
      } else if (ah === 0x2C) { var hm = this.nowHmsc(); this.set("CH", hm[0]); this.set("CL", hm[1]); this.set("DH", hm[2]); this.set("DL", hm[3]); }
      else if (ah === 0x2A) { this.set("CX", this.date[0]); this.set("DH", this.date[1]); this.set("DL", this.date[2]); this.set("AL", this.date[3]); }
      else if (ah === 0x25) { this.wr16(0, al * 4, this.get("DX")); this.wr16(0, al * 4 + 2, this.s[3]); }
      else if (ah === 0x35) { this.set("BX", this.rd16(0, al * 4)); this.set("ES", this.rd16(0, al * 4 + 2)); }
      else if (ah === 0x30) this.set("AX", 0x0005);
      else if (ah === 0x19) this.set("AL", 2);
      else if (ah === 0x40) {
        if (this.get("BX") !== 1 && this.get("BX") !== 2) throw new EmuError("INT 21h/40h: yalnız ekran (BX=1/2) destekli");
        seg = this.s[3]; off = this.get("DX");
        for (i = 0; i < this.get("CX"); i++) this.emit(String.fromCharCode(this.rd8(seg, off + i)));
        this.set("AX", this.get("CX")); this.f.CF = 0;
      } else throw new EmuError("desteklenmeyen DOS servisi: INT 21h, AH=" + hx(ah, 1));
      return;
    }
    if (n === 0x10) {
      if (ah === 0x0E) this.emit(String.fromCharCode(al));
      else if (ah === 0x02) this.cursor = [this.get("DH"), this.get("DL")];
      else if (ah === 0x03) { this.set("DH", this.cursor[0]); this.set("DL", this.cursor[1]); this.set("CX", 0x0607); }
      else if (ah === 0x00) {
        var mode = al & 0x7F;
        this.videoMode = mode; this.mem[0x449] = mode;
        this.w16(0x44A, [0, 1, 4, 5, 0x0D, 0x13].indexOf(mode) >= 0 ? 40 : 80);
        /* 320×200, 256 renk: A000:0000–F9FFh; AL bit 7 = 1 ise bellek silinmez */
        if (mode === 0x13) { if (!(al & 0x80)) this.mem.fill(0, 0xA0000, 0xA0000 + 64000); }
        else this.clearWindow(0, 0, 24, 79, 0x07);
        this.cursor = [0, 0];
      }
      else if (ah === 0x06 || ah === 0x07) {
        if (al === 0) this.clearWindow(this.get("CH"), this.get("CL"), this.get("DH"), this.get("DL"), this.get("BH"));
        else this.scroll(ah === 0x06, al, this.get("CH"), this.get("CL"), this.get("DH"), this.get("DL"), this.get("BH"));
      } else if (ah === 0x09 || ah === 0x0A) {
        var row = this.cursor[0], col = this.cursor[1], k = this.get("CX");
        for (i = 0; i < k; i++) {
          var p = row * 80 + col + i;
          if (p >= 2000) break;
          var va = (VIDEO_SEG << 4) + 2 * p;
          this.mem[va] = al;
          if (ah === 0x09) this.mem[va + 1] = this.get("BL");
        }
        var rep = "";
        for (i = 0; i < k; i++) rep += String.fromCharCode(al);
        this.stepOut += rep; this.out += rep;
      } else if (ah === 0x13) {
        seg = this.s[0]; off = this.get("BP");
        var cnt2 = this.get("CX"), save = this.cursor.slice(), attrIn = al & 2;
        this.cursor = [this.get("DH"), this.get("DL")];
        for (i = 0; i < cnt2; i++) {
          var cc, at;
          if (attrIn) { cc = this.rd8(seg, off + 2 * i); at = this.rd8(seg, off + 2 * i + 1); }
          else { cc = this.rd8(seg, off + i); at = this.get("BL"); }
          this.emit(String.fromCharCode(cc), at);
        }
        if (!(al & 1)) this.cursor = save;
      } else if (ah === 0x01 || ah === 0x05 || ah === 0x10 || ah === 0x0B) { /* etkisiz */ }
      else if (ah === 0x0C) {
        var px = this.get("CX"), py = this.get("DX");
        if (this.videoMode === 0x13) { if (px < 320 && py < 200) this.wr8(0xA000, py * 320 + px, al); }
        else this.pixels[px + "," + py] = al;
      } else if (ah === 0x0D) {
        var qx = this.get("CX"), qy = this.get("DX");
        if (this.videoMode === 0x13) this.set("AL", qx < 320 && qy < 200 ? this.rd8(0xA000, qy * 320 + qx) : 0);
        else this.set("AL", this.pixels[qx + "," + qy] || 0);
      }
      else if (ah === 0x08) {
        var a8 = (VIDEO_SEG << 4) + 2 * (this.cursor[0] * 80 + this.cursor[1]);
        this.set("AL", this.mem[a8]); this.set("AH", this.mem[a8 + 1]);
      } else if (ah === 0x0F) { this.set("AL", this.videoMode); this.set("AH", this.mem[0x44A]); this.set("BH", 0); }
      else throw new EmuError("desteklenmeyen BIOS servisi: INT 10h, AH=" + hx(ah, 1));
      return;
    }
    if (n === 0x16) {
      if (ah === 0x00 || ah === 0x10) {
        ch = this.key("INT 16h, AH = " + hx(ah, 1));
        this.set("AL", ch.charCodeAt(0) & 0xFF); this.set("AH", SCAN[ch] || 0);
      } else if (ah === 0x01 || ah === 0x11) {
        if (this.keyReady()) { ch = this.input[0]; this.set("AL", ch.charCodeAt(0) & 0xFF); this.set("AH", SCAN[ch] || 0); this.f.ZF = 0; }
        else this.f.ZF = 1;
      } else if (ah === 0x02) this.set("AL", 0);
      else throw new EmuError("desteklenmeyen BIOS servisi: INT 16h, AH=" + hx(ah, 1));
      return;
    }
    if (n === 0x1A) {
      var ck = this.clock, dt = this.date;
      if (ah === 0x00) {
        var tk = this.ticks();
        this.set("CX", tk >>> 16); this.set("DX", tk & 0xFFFF); this.set("AL", 0);
      } else if (ah === 0x02) { ck = this.nowHmsc(); this.set("CH", bcd(ck[0])); this.set("CL", bcd(ck[1])); this.set("DH", bcd(ck[2])); this.f.CF = 0; }
      else if (ah === 0x04) {
        this.set("CH", bcd(Math.floor(dt[0] / 100))); this.set("CL", bcd(dt[0] % 100));
        this.set("DH", bcd(dt[1])); this.set("DL", bcd(dt[2])); this.f.CF = 0;
      } else throw new EmuError("desteklenmeyen BIOS servisi: INT 1Ah, AH=" + hx(ah, 1));
      return;
    }
    if (n === 0x15 && ah === 0x86) {
      /* CX:DX mikrosaniye bekle: sanal saat ilerler; laboratuvar Oynat kipinde bu süreyi gerçek zamanda da bekler */
      var wus = this.get("CX") * 65536 + this.get("DX");
      this.advance(wus); this.f.CF = 0; this.svc = { wait: wus };
      return;
    }
    if (n === 0x03) { this.halted = "INT 3 (kesme noktası)"; return; }
    throw new EmuError("desteklenmeyen kesme: INT " + hx(n, 1) + " (AH=" + hx(ah, 1) + "); vektör tablosunda bu kesme için bir yordam yok");
  };
  MP.scroll = function (up, n, r1, c1, r2, c2, attr) {
    var rows = [], base = VIDEO_SEG << 4, r, c, i, k;
    for (r = r1; r <= r2; r++) rows.push(r);
    for (k = 0; k < n; k++) {
      var seq = up ? rows : rows.slice().reverse();
      for (i = 0; i < seq.length - 1; i++) for (c = c1; c <= c2; c++) {
        var dst = base + 2 * (seq[i] * 80 + c), src = base + 2 * (seq[i + 1] * 80 + c);
        this.mem[dst] = this.mem[src]; this.mem[dst + 1] = this.mem[src + 1];
      }
      for (c = c1; c <= c2; c++) { var a = base + 2 * (seq[seq.length - 1] * 80 + c); this.mem[a] = 0x20; this.mem[a + 1] = attr; }
    }
  };
  MP.portIn = function (port, w) {
    var src = has(this.ports, port) ? this.ports[port] : null, v;
    if (src == null) v = has(this.portLast, port) ? this.portLast[port] : 0;
    else if (typeof src === "function") v = src(port, this);
    else if (Array.isArray(src)) v = src.length > 1 ? src.shift() : src[0];
    else v = src;
    if (w === 2) {
      if (src == null && has(this.portLast, port + 1)) v = (v & 0xFF) | (this.portLast[port + 1] << 8);
      return v & 0xFFFF;
    }
    return v & 0xFF;
  };
  MP.portOut = function (port, v, w) {
    this.portLast[port] = v & 0xFF;
    if (w === 2) this.portLast[port + 1] = (v >> 8) & 0xFF;
    this.portWrites.push([this.steps, port, v & (w === 2 ? 0xFFFF : 0xFF), w]);
  };
  MP.fetch = function () {
    var cs = this.s[1], phys = this.phys(cs, this.ip), st = this.prog.code[phys];
    if (st == null) {
      if (cs === PSP_SEG && this.ip === 0) return this.pspStmt;
      if (cs === BIOS_SEG && this.ip >= BIOS_OFF && this.ip < BIOS_OFF + 256) {
        var nb = this.ip - BIOS_OFF;
        st = new Stmt(0, "BIOS INT " + hx(nb, 1) + " hizmeti + IRET");
        st.op = "_BIOS"; st.ops = [new Op("imm", { val: nb })]; st.size = 0; st.cs = BIOS_SEG; st.addr = this.ip;
        return st;
      }
      var end = 0;
      this.prog.image.forEach(function (im) { end = Math.max(end, im[0] + im[1].length); });
      if (phys >= end && this.mem[phys] === 0) { this.halted = "kod sonu (RET/HLT/INT 20h yok; program parçası bitti)"; return null; }
      throw new EmuError("CS:IP = " + hx(cs).slice(0, 4) + ":" + hx(this.ip).slice(0, 4) + " bir komutun başını göstermiyor (veri ya da kodun ortası)");
    }
    return st;
  };
  MP.step = function () {
    var st = this.fetch();
    if (st == null) return null;
    this.cur = st;
    this.ipNext = (this.ip + st.size) & 0xFFFF;
    this.jumped = false;
    var op = st.op, h = EXEC[op];
    if (!h) {
      if (has(ALU, op)) h = execAlu;
      else if (has(JCC, op)) h = execJcc;
      else if (has(SHIFTS, op)) h = execShift;
      else throw new EmuError("yürütülemeyen komut: " + op);
    }
    h.call(this, st);
    if (!this.jumped) this.ip = this.ipNext;
    return st;
  };
  function execAlu(st) {
    var a = st.ops[0], b = st.ops[1], w = osize(st), x = this.rd(a, w), y = this.rd(b, w), r, mn = st.op;
    if (b.kind === "imm" && w === 2) y &= 0xFFFF;
    if (mn === "ADD") r = this.add(x, y, 0, w);
    else if (mn === "ADC") r = this.add(x, y, this.f.CF, w);
    else if (mn === "SUB" || mn === "CMP") r = this.sub(x, y, 0, w);
    else if (mn === "SBB") r = this.sub(x, y, this.f.CF, w);
    else if (mn === "AND") r = this.logic(x & y, w);
    else if (mn === "OR") r = this.logic(x | y, w);
    else r = this.logic(x ^ y, w);
    if (mn !== "CMP") this.wr(a, w, r);
    this.info = { r: r };
  }
  function execJcc(st) { if (this.cond(JCC[st.op])) { this.ip = st.target; this.jumped = true; } }
  function execShift(st) {
    var mn = st.op, a = st.ops[0], b = st.ops[1], w = osize(st), bits = 8 * w, m = w === 1 ? 0xFF : 0xFFFF, msb = 1 << (bits - 1);
    var cnt = b.kind === "r8" ? this.get("CL") : (b.val & 0xFF);
    this.info = { cnt: cnt };
    if (cnt === 0) return;
    var x = this.rd(a, w), f = this.f, r = x, i, c;
    if (mn === "SHL" || mn === "SAL") {
      for (i = 0; i < cnt; i++) { f.CF = r & msb ? 1 : 0; r = (r << 1) & m; }
      f.OF = (r & msb ? 1 : 0) ^ f.CF; this.szp(r, w); this.undefined("AF");
    } else if (mn === "SHR") {
      for (i = 0; i < cnt; i++) { f.CF = r & 1; r >>= 1; }
      f.OF = x & msb ? 1 : 0; this.szp(r, w); this.undefined("AF");
    } else if (mn === "SAR") {
      for (i = 0; i < cnt; i++) { f.CF = r & 1; r = (r >> 1) | (r & msb); }
      f.OF = 0; this.szp(r, w); this.undefined("AF");
    } else if (mn === "ROL") {
      for (i = 0; i < cnt; i++) { c = r & msb ? 1 : 0; r = ((r << 1) & m) | c; f.CF = c; }
      f.OF = (r & msb ? 1 : 0) ^ f.CF;
    } else if (mn === "ROR") {
      for (i = 0; i < cnt; i++) { c = r & 1; r = (r >> 1) | (c ? msb : 0); f.CF = c; }
      f.OF = (r & msb ? 1 : 0) ^ (r & (msb >> 1) ? 1 : 0);
    } else if (mn === "RCL") {
      for (i = 0; i < cnt; i++) { c = r & msb ? 1 : 0; r = ((r << 1) & m) | f.CF; f.CF = c; }
      f.OF = (r & msb ? 1 : 0) ^ f.CF;
    } else if (mn === "RCR") {
      for (i = 0; i < cnt; i++) { f.OF = (r & msb ? 1 : 0) ^ f.CF; c = r & 1; r = (r >> 1) | (f.CF ? msb : 0); f.CF = c; }
    }
    this.defined("CF");
    if (cnt === 1) this.defined("OF"); else this.undefined("OF");
    this.wr(a, w, r);
  }
  function loopx(kind) {
    return function (st) {
      var cx = (this.get("CX") - 1) & 0xFFFF;
      this.set("CX", cx);
      var t = cx !== 0;
      if (kind === "E") t = t && this.f.ZF === 1;
      else if (kind === "NE") t = t && this.f.ZF === 0;
      if (t) { this.ip = st.target; this.jumped = true; }
    };
  }
  function strop(st) {
    var mn = st.op, w = /B$/.test(mn) ? 1 : 2, base = mn.slice(0, -1), rep = null, srcseg = this.s[3], self = this;
    st.prefixes.forEach(function (p) {
      if (p === "REP" || p === "REPE" || p === "REPZ") rep = "E";
      else if (p === "REPNE" || p === "REPNZ") rep = "NE";
      else if (/:$/.test(p)) srcseg = self.s[SREG[p.slice(0, 2)]];
    });
    var d = this.f.DF ? -w : w;
    function once() {
      var si = self.get("SI"), di = self.get("DI"), es = self.s[0], v, x;
      if (base === "MOVS") {
        v = w === 1 ? self.rd8(srcseg, si) : self.rd16(srcseg, si);
        if (w === 1) self.wr8(es, di, v); else self.wr16(es, di, v);
        self.set("SI", si + d); self.set("DI", di + d);
      } else if (base === "CMPS") {
        v = w === 1 ? self.rd8(srcseg, si) : self.rd16(srcseg, si);
        x = w === 1 ? self.rd8(es, di) : self.rd16(es, di);
        self.sub(v, x, 0, w);
        self.set("SI", si + d); self.set("DI", di + d);
      } else if (base === "SCAS") {
        x = w === 1 ? self.rd8(es, di) : self.rd16(es, di);
        self.sub(w === 1 ? self.get("AL") : self.get("AX"), x, 0, w);
        self.set("DI", di + d);
      } else if (base === "LODS") {
        v = w === 1 ? self.rd8(srcseg, si) : self.rd16(srcseg, si);
        self.set(w === 1 ? "AL" : "AX", v);
        self.set("SI", si + d);
      } else if (base === "STOS") {
        if (w === 1) self.wr8(es, di, self.get("AL")); else self.wr16(es, di, self.get("AX"));
        self.set("DI", di + d);
      }
    }
    this.info = { rep: rep, n: 0, srcseg: srcseg };
    if (rep == null) { once(); this.info.n = 1; return; }
    var cmp = base === "CMPS" || base === "SCAS", n = 0;
    while (this.get("CX") !== 0) {
      once();
      this.set("CX", this.get("CX") - 1);
      n++;
      if (cmp && rep === "E" && this.f.ZF === 0) break;
      if (cmp && rep === "NE" && this.f.ZF === 1) break;
      if (this.repStep) {
        /* emu8086.py rep_step=True: her tur ayrı adım; sürecekse IP aynı komutta kalır */
        if (this.get("CX") !== 0 && !(cmp && ((rep === "E") !== !!this.f.ZF))) { this.jumped = true; this.info.again = true; }
        break;
      }
      if (n > 0x10000) break;
    }
    this.info.n = n;
  }
  var EXEC = {
    MOV: function (st) { var w = osize(st); this.wr(st.ops[0], w, this.rd(st.ops[1], w)); },
    XCHG: function (st) { var a = st.ops[0], b = st.ops[1], w = osize(st), x = this.rd(a, w), y = this.rd(b, w); this.wr(a, w, y); this.wr(b, w, x); },
    LEA: function (st) { this.set(st.ops[0].reg, this.ea(st.ops[1])[1]); },
    LDS: function (st, sreg) { var e = this.ea(st.ops[1]); this.set(st.ops[0].reg, this.rd16(e[0], e[1])); this.set(sreg || "DS", this.rd16(e[0], e[1] + 2)); },
    LES: function (st) { EXEC.LDS.call(this, st, "ES"); },
    PUSH: function (st) { var o = st.ops[0], v = this.rd(o, 2); if (o.kind === "r16" && o.reg === "SP") v = (this.r[4] - 2) & 0xFFFF; this.push(v); },
    POP: function (st) { var v = this.pop(); this.wr(st.ops[0], 2, v); },
    PUSHF: function () { this.push(this.flagsWord()); },
    POPF: function () { this.setFlagsWord(this.pop()); this.undef = {}; },
    LAHF: function () { this.set("AH", this.flagsWord() & 0xFF); },
    SAHF: function () { var ah = this.get("AH"), self = this; ["SF", "ZF", "AF", "PF", "CF"].forEach(function (k) { self.f[k] = (ah >> FLAGBITS[k]) & 1; delete self.undef[k]; }); },
    INC: function (st, d) {
      var o = st.ops[0], w = osize(st), cf = this.f.CF, x = this.rd(o, w);
      var r = d === -1 ? this.sub(x, 1, 0, w) : this.add(x, 1, 0, w);
      this.f.CF = cf; this.wr(o, w, r);
    },
    DEC: function (st) { EXEC.INC.call(this, st, -1); },
    NEG: function (st) { var o = st.ops[0], w = osize(st), x = this.rd(o, w), r = this.sub(0, x, 0, w); this.f.CF = x !== 0 ? 1 : 0; this.wr(o, w, r); },
    NOT: function (st) { var o = st.ops[0], w = osize(st); this.wr(o, w, ~this.rd(o, w)); },
    TEST: function (st) { var w = osize(st); this.info = { r: this.logic(this.rd(st.ops[0], w) & this.rd(st.ops[1], w), w) }; },
    MUL: function (st) {
      var w = osize(st), x = this.rd(st.ops[0], w), r, hi;
      if (w === 1) { r = this.get("AL") * x; this.set("AX", r); hi = r >> 8; }
      else { r = this.get("AX") * x; this.set("AX", r & 0xFFFF); this.set("DX", Math.floor(r / 0x10000)); hi = Math.floor(r / 0x10000); }
      this.f.CF = this.f.OF = hi ? 1 : 0;
      this.defined("CF", "OF"); this.undefined("SF", "ZF", "AF", "PF");
    },
    IMUL: function (st) {
      var w = osize(st), x = this.rd(st.ops[0], w), r, ext;
      if (w === 1) { r = s8(this.get("AL")) * s8(x); this.set("AX", r & 0xFFFF); ext = r !== s8(r); }
      else {
        r = s16(this.get("AX")) * s16(x);
        var r32 = r >>> 0;
        this.set("AX", r32 & 0xFFFF); this.set("DX", r32 >>> 16); ext = r !== s16(r);
      }
      this.f.CF = this.f.OF = ext ? 1 : 0;
      this.defined("CF", "OF"); this.undefined("SF", "ZF", "AF", "PF");
    },
    DIV: function (st) {
      var w = osize(st), x = this.rd(st.ops[0], w), n;
      if (w === 1) {
        n = this.get("AX");
        if (x === 0 || Math.floor(n / x) > 0xFF) return this.divideError();
        this.set("AL", Math.floor(n / x)); this.set("AH", n % x);
      } else {
        n = this.get("DX") * 0x10000 + this.get("AX");
        if (x === 0 || Math.floor(n / x) > 0xFFFF) return this.divideError();
        this.set("AX", Math.floor(n / x)); this.set("DX", n % x);
      }
      this.undefined("CF", "OF", "SF", "ZF", "AF", "PF");
    },
    IDIV: function (st) {
      var w = osize(st), d, n, lim;
      if (w === 1) { d = s8(this.rd(st.ops[0], 1)); n = s16(this.get("AX")); lim = 127; }
      else { d = s16(this.rd(st.ops[0], 2)); n = (this.get("DX") << 16) | this.get("AX"); lim = 32767; }
      if (d === 0) return this.divideError();
      var q = Math.floor(Math.abs(n) / Math.abs(d));
      if ((n < 0) !== (d < 0)) q = -q;
      var rmd = n - q * d;
      if (q > lim || q < -lim) return this.divideError();
      if (w === 1) { this.set("AL", q); this.set("AH", rmd); } else { this.set("AX", q); this.set("DX", rmd); }
      this.undefined("CF", "OF", "SF", "ZF", "AF", "PF");
    },
    CBW: function () { this.set("AH", this.get("AL") & 0x80 ? 0xFF : 0); },
    CWD: function () { this.set("DX", this.get("AX") & 0x8000 ? 0xFFFF : 0); },
    CLC: function () { this.f.CF = 0; this.defined("CF"); },
    STC: function () { this.f.CF = 1; this.defined("CF"); },
    CMC: function () { this.f.CF ^= 1; },
    CLD: function () { this.f.DF = 0; },
    STD: function () { this.f.DF = 1; },
    CLI: function () { this.f.IF = 0; },
    STI: function () { this.f.IF = 1; },
    NOP: function () {}, WAIT: function () {},
    HLT: function () { this.halted = "HLT"; },
    DAA: function () {
      var al = this.get("AL"), cf = this.f.CF, old = al;
      if ((al & 0x0F) > 9 || this.f.AF) { al += 6; this.f.CF = (cf || al > 0xFF) ? 1 : 0; this.f.AF = 1; } else this.f.AF = 0;
      if (old > 0x99 || cf) { al += 0x60; this.f.CF = 1; } else this.f.CF = 0;
      this.set("AL", al); this.szp(al, 1); this.defined("CF", "AF"); this.undefined("OF");
    },
    DAS: function () {
      var al = this.get("AL"), cf = this.f.CF, old = al;
      if ((al & 0x0F) > 9 || this.f.AF) { al -= 6; this.f.CF = (cf || al < 0) ? 1 : 0; this.f.AF = 1; } else this.f.AF = 0;
      if (old > 0x99 || cf) { al -= 0x60; this.f.CF = 1; } else this.f.CF = 0;
      this.set("AL", al & 0xFF); this.szp(al, 1); this.defined("CF", "AF"); this.undefined("OF");
    },
    AAA: function (st, sign) {
      sign = sign || 1;
      var al = this.get("AL");
      if ((al & 0x0F) > 9 || this.f.AF) { this.set("AL", (al + 6 * sign) & 0xFF); this.set("AH", (this.get("AH") + sign) & 0xFF); this.f.AF = this.f.CF = 1; }
      else this.f.AF = this.f.CF = 0;
      this.set("AL", this.get("AL") & 0x0F);
      this.defined("CF", "AF"); this.undefined("OF", "SF", "ZF", "PF");
    },
    AAS: function (st) { EXEC.AAA.call(this, st, -1); },
    AAM: function (st) {
      var base = st.aamBase == null ? 10 : st.aamBase;
      if (base === 0) return this.divideError();
      var al = this.get("AL");
      this.set("AH", Math.floor(al / base)); this.set("AL", al % base);
      this.szp(this.get("AL"), 1); this.undefined("OF", "AF", "CF");
    },
    AAD: function (st) {
      var base = st.aamBase == null ? 10 : st.aamBase, al = (this.get("AH") * base + this.get("AL")) & 0xFF;
      this.set("AL", al); this.set("AH", 0); this.szp(al, 1); this.undefined("OF", "AF", "CF");
    },
    XLATB: function (st) {
      var seg = this.s[3], self = this;
      st.prefixes.forEach(function (p) { if (/:$/.test(p)) seg = self.s[SREG[p.slice(0, 2)]]; });
      this.set("AL", this.rd8(seg, (this.get("BX") + this.get("AL")) & 0xFFFF));
    },
    IN: function (st) {
      var acc = st.ops[0], port = st.ops[1], p = port.kind === "r16" ? this.get("DX") : (port.val & 0xFF);
      var v = this.portIn(p, acc.size);
      this.wr(acc, acc.size, v);
      this.info = { port: p, v: v };
    },
    OUT: function (st) {
      var port = st.ops[0], acc = st.ops[1], p = port.kind === "r16" ? this.get("DX") : (port.val & 0xFF);
      this.portOut(p, this.get(acc.reg), acc.size);
      this.info = { port: p, v: this.get(acc.reg) & (acc.size === 2 ? 0xFFFF : 0xFF), w: acc.size };
    },
    INT: function (st) { this.doInt(st.ops[0].val & 0xFF, this.ipNext); this.jumped = true; },
    INTO: function () { if (this.f.OF) { this.doInt(4, this.ipNext); this.jumped = true; } },
    _BIOS: function (st) {
      this.builtin(st.ops[0].val);
      this.ip = this.pop(); this.s[1] = this.pop(); this.setFlagsWord(this.pop()); this.jumped = true;
    },
    IRET: function () { this.ip = this.pop(); this.s[1] = this.pop(); this.setFlagsWord(this.pop()); this.undef = {}; this.jumped = true; },
    JMP: function (st) {
      var o = st.ops[0];
      if (st.indirect) {
        if (st.far) { var e = this.ea(o); this.ip = this.rd16(e[0], e[1]); this.s[1] = this.rd16(e[0], e[1] + 2); }
        else this.ip = this.rd(o, 2);
      } else { this.ip = st.target; if (st.far) this.s[1] = st.targetSeg; }
      this.jumped = true;
    },
    CALL: function (st) {
      var o = st.ops[0], nip, ncs = null;
      if (st.indirect) {
        if (st.far) { var e = this.ea(o); nip = this.rd16(e[0], e[1]); ncs = this.rd16(e[0], e[1] + 2); }
        else nip = this.rd(o, 2);
      } else { nip = st.target; ncs = st.far ? st.targetSeg : null; }
      if (ncs != null) { this.push(this.s[1]); this.push(this.ipNext); this.s[1] = ncs; }
      else this.push(this.ipNext);
      this.ip = nip; this.jumped = true;
    },
    RET: function (st) {
      this.ip = this.pop();
      if (st.far) this.s[1] = this.pop();
      if (st.ops.length) this.r[4] = (this.r[4] + st.ops[0].val) & 0xFFFF;
      this.jumped = true;
    },
    LOOP: loopx(""), LOOPE: loopx("E"), LOOPZ: loopx("E"), LOOPNE: loopx("NE"), LOOPNZ: loopx("NE"),
    JCXZ: function (st) { if (this.get("CX") === 0) { this.ip = st.target; this.jumped = true; } },
    ".EXIT": function () { this.set("AH", 0x4C); this.builtin(0x21); }
  };
  EXEC.RETN = EXEC.RET; EXEC.RETF = EXEC.RET;
  ["MOVSB", "MOVSW", "CMPSB", "CMPSW", "STOSB", "STOSW", "LODSB", "LODSW", "SCASB", "SCASW"].forEach(function (k) { EXEC[k] = strop; });

  /* ---- durum görüntüsü ---- */
  MP.regs = function () { var o = {}, self = this; SHOW_REGS.forEach(function (k) { o[k] = self.get(k); }); return o; };
  MP.flags = function () { var o = {}, self = this; FLAGORDER.forEach(function (k) { o[k] = self.f[k]; }); return o; };

  /* Tek adım: durum kaydı (önce/sonra) ve Türkçe açıklama döndürür. Hata EmuError olarak fırlatılır. */
  MP.stepRecord = function () {
    var st0 = this.fetch();
    if (st0 == null) return null;
    var before = { regs: this.regs(), flags: this.flags(), undef: Object.assign({}, this.undef), cs: this.s[1], ip: this.ip };
    var self = this, w = osize(st0), pre = st0.ops.map(function (o) {
      var r = { kind: o.kind };
      try {
        if (o.kind === "mem") { r.ea = self.ea(o); r.v = self.rd(o, o.size || w); }
        else if (o.kind !== "farimm") r.v = self.rd(o, w);
      } catch (e) { /* okunamayan işlenen: açıklamada kullanılmaz */ }
      return r;
    });
    var saved = { r: this.r.slice(), s: this.s.slice(), f: Object.assign({}, this.f), ip: this.ip, undef: Object.assign({}, this.undef),
      input: this.input.slice(), keysRead: this.keysRead, out: this.out, cursor: this.cursor.slice(), halted: this.halted };
    var vb = VIDEO_SEG << 4, vbefore = INTOPS[st0.op] ? this.mem.slice(vb, vb + 4000) : null;
    this.memlog = []; this.stepOut = ""; this.info = null; this.svc = null; this.irq = null; this.pollEmpty = false;
    var st;
    try { st = this.step(); }
    catch (e) {
      if (e instanceof InputWait) {
        /* adım hiç yürütülmemiş sayılır: yazmaçlar, bellek, ekran ve kuyruk eski hâline döner */
        for (var k = this.memlog.length - 1; k >= 0; k--) this.mem[this.memlog[k][0]] = this.memlog[k][3];
        if (vbefore) this.mem.set(vbefore, vb);
        this.r = saved.r; this.s = saved.s; this.f = saved.f; this.ip = saved.ip; this.undef = saved.undef;
        this.input = saved.input; this.keysRead = saved.keysRead; this.out = saved.out; this.cursor = saved.cursor; this.halted = saved.halted;
        this.memlog = null; this.stepOut = "";
      }
      throw e;
    }
    this.steps++;
    var video = [];
    if (vbefore) for (var q = 0; q < 4000; q += 2) if (this.mem[vb + q] !== vbefore[q] || this.mem[vb + q + 1] !== vbefore[q + 1]) video.push(q >> 1);
    var rec = { st: st, before: before, pre: pre, w: w, info: this.info, mem: this.memlog, out: this.stepOut,
      regs: this.regs(), flags: this.flags(), undef: Object.assign({}, this.undef), halted: this.halted,
      svc: this.svc, irq: this.irq, keys: saved.input.slice(0, this.keysRead - saved.keysRead).join(""), pollEmpty: this.pollEmpty,
      video: video, cursorBefore: saved.cursor };
    this.memlog = null;
    rec.text = describe(this, rec);
    return rec;
  };

  /* ================= Türkçe açıklama ================= */
  var COND = { 0: "OF = 1", 1: "OF = 0", 2: "CF = 1", 3: "CF = 0", 4: "ZF = 1", 5: "ZF = 0", 6: "CF = 1 ya da ZF = 1",
    7: "CF = 0 ve ZF = 0", 8: "SF = 1", 9: "SF = 0", 10: "PF = 1", 11: "PF = 0", 12: "SF ≠ OF", 13: "SF = OF",
    14: "ZF = 1 ya da SF ≠ OF", 15: "ZF = 0 ve SF = OF" };
  var COND_FLAGS = { 0: ["OF"], 1: ["CF"], 2: ["ZF"], 3: ["CF", "ZF"], 4: ["SF"], 5: ["PF"], 6: ["SF", "OF"], 7: ["ZF", "SF", "OF"] };
  function opName(o) { return o.kind === "r8" || o.kind === "r16" || o.kind === "sreg" ? o.reg : o.text; }
  function segName(o) { return o.seg || (o.base === "BP" ? "SS" : "DS"); }
  function chText(c) {
    if (c === 13) return "satır başı (0Dh)";
    if (c === 10) return "yeni satır (0Ah)";
    if (c === 8) return "geri silme (08h)";
    if (c >= 32 && c < 127) return "'" + String.fromCharCode(c) + "' karakteri";
    return hx(c, 1) + " kodlu karakter";
  }
  function birim(w) { return w === 1 ? "bayt" : "sözcük"; }
  function targetText(m, off) {
    var lab = m.prog.labelAt && m.prog.labelAt[off];
    return (lab ? lab + " (" + hx(off) + ")" : hx(off)) + " adresine";
  }
  /* bayrak gerekçeleri: kind = add | sub | logic | inc */
  function flagNote(rec, kind) {
    var f = rec.flags, p = [], zero = [];
    if (kind === "add" || kind === "sub") {
      if (f.CF) p.push(kind === "sub" ? "ödünç alındığı için CF = 1" : "elde oluştuğu için CF = 1"); else zero.push("CF");
    }
    if (kind !== "logic") { if (f.OF) p.push("işaretli taşma olduğu için OF = 1"); else zero.push("OF"); }
    if (f.ZF) p.push("sonuç sıfır olduğu için ZF = 1"); else zero.push("ZF");
    if (f.SF) p.push("sonuç negatif görüldüğü için SF = 1"); else zero.push("SF");
    var t = p.join(", ");
    if (!p.length) t = zero.join(" = ") + " = 0";
    else if (zero.length && kind !== "add" && kind !== "sub") t += "; " + zero.join(" = ") + " = 0";
    if (kind === "logic") return "mantık komutu olduğu için CF = OF = 0; " + t;
    if (kind === "inc") return t + "; CF değişmez";
    return t;
  }
  /* ---- kesme ve hizmet açıklamaları ---- */
  var DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  function so(seg, off) { return hx(seg).slice(0, 4) + ":" + hx(off); }
  function irqText(m, rec, isDiv) {
    var q = rec.irq, R = rec.regs;
    return (isDiv ? "" : "vektör tablosunda INT " + hx(q.n, 1) + " girişi (0000:" + hx(q.n * 4) + ") CS:IP = " + so(R.CS, R.IP).replace(/h$/, "") + "h gösterir; ") +
      "FLAGS (" + hx(q.flags) + "), CS (" + hx(q.cs) + ") ve " + (isDiv ? "bölme komutundan sonraki komutun adresi" : "dönüş adresi") + " (IP = " + hx(q.ip) + ") yığına itilir (SP = " + hx(R.SP) + "), IF = TF = 0 olur ve " +
      (isDiv ? "vektör tablosundaki 0000:0000h girişinden kesme hizmet yordamına (" + so(R.CS, R.IP) + ") gidilir." : "kesme hizmet yordamına gidilir.");
  }
  function attrText(v) { return hx(v, 1); }
  function keyText(c) {
    if (c === 13) return "Enter tuşu (0Dh)";
    if (c === 8) return "geri silme tuşu (08h)";
    if (c === 27) return "Esc tuşu (1Bh)";
    return chText(c);
  }
  function serviceText(m, rec, nn) {
    var B = rec.before.regs, R = rec.regs, ah = B.AX >> 8, al = B.AX & 0xFF, fl = rec.flags, i;
    var rAL = R.AX & 0xFF, rAH = R.AX >> 8;
    function dh(v) { return v >> 8; }
    function lo(v) { return v & 0xFF; }
    if (nn === 0x20) return "program sonlanır ve DOS'a dönülür.";
    if (nn === 3) return "kesme noktası: program durur.";
    if (nn === 0x21) {
      var dos = "DOS hizmeti AH = " + hx(ah, 1) + ": ";
      if (ah === 0x02) return dos + "DL'deki " + chText(lo(B.DX)) + " ekrana yazılır.";
      if (ah === 0x09) return dos + "DS:" + hx(B.DX) + " adresinden başlayan dizgi '$' işaretine kadar ekrana yazılır.";
      if (ah === 0x4C) return dos + "program sonlanır, çıkış kodu AL = " + hx(al, 1) + ".";
      if (ah === 0x00) return dos + "program sonlanır.";
      if (ah === 0x01) return dos + "klavyeden " + keyText(rAL) + " okunur, ekrana yansıtılır ve AL'ye yazılır (AL = " + hx(rAL, 1) + ").";
      if (ah === 0x07 || ah === 0x08) return dos + "klavyeden " + keyText(rAL) + " okunur; ekrana yansıtılmaz, AL = " + hx(rAL, 1) + ".";
      if (ah === 0x06) {
        if (lo(B.DX) !== 0xFF) return dos + "DL'deki " + chText(lo(B.DX)) + " ekrana yazılır.";
        return dos + "DL = FFh olduğu için klavyeye bakılır: " + (fl.ZF ? "tuş yok, AL = 00h ve ZF = 1." : "tuş var, " + keyText(rAL) + " alınır (AL = " + hx(rAL, 1) + ", ZF = 0).");
      }
      if (ah === 0x0A) {
        var sv = rec.svc || { buf: "", mx: 0, at: B.DX };
        return dos + "Enter'a kadar yazılan " + sv.buf.length + " karakter" + (sv.buf ? " ('" + sv.buf + "')" : "") + " DS:" + hx(sv.at) + " tamponuna okunur: ilk bayt en çok " + sv.mx +
          " (Enter dahil), DS:" + hx((sv.at + 1) & 0xFFFF) + " = " + hx(sv.buf.length, 1) + " okunan karakter sayısı, metin DS:" + hx((sv.at + 2) & 0xFFFF) + " adresinden başlar ve sonuna 0Dh yazılır.";
      }
      if (ah === 0x0B) return dos + "tuş durumu sorulur: " + (rAL ? "bekleyen tuş var, AL = FFh." : "bekleyen tuş yok, AL = 00h.");
      if (ah === 0x0C) return dos + "klavye tamponu boşaltılır, ardından AL'deki hizmet (" + hx(al, 1) + ") yürütülür.";
      if (ah === 0x05) return dos + "DL'deki " + chText(lo(B.DX)) + " yazıcıya gönderilir.";
      if (ah === 0x2A) return dos + "sistem tarihi alınır: CX = " + R.CX + " (" + hx(R.CX) + "), DH = " + dh(R.DX) + " (ay), DL = " + lo(R.DX) + " (gün), AL = " + rAL +
        " (haftanın günü: " + (DAYS[rAL] || "?") + "). Laboratuvarda tarih sabittir.";
      if (ah === 0x2C) return dos + "sistem saati alınır: CH = " + dh(R.CX) + " (saat), CL = " + lo(R.CX) + " (dakika), DH = " + dh(R.DX) + " (saniye), DL = " + lo(R.DX) + " (salise)." + clockNote(m);
      if (ah === 0x25) return dos + "INT " + hx(al, 1) + " vektörü DS:DX = " + so(B.DS, B.DX) + " yapılır (vektör tablosunda 0000:" + hx(al * 4) + ").";
      if (ah === 0x35) return dos + "INT " + hx(al, 1) + " vektörü okunur: ES:BX = " + so(R.ES, R.BX) + ".";
      if (ah === 0x30) return dos + "DOS sürümü AL = " + rAL + ", AH = " + rAH + " olarak alınır.";
      if (ah === 0x19) return dos + "geçerli sürücü AL = " + rAL + " (C:) olarak alınır.";
      if (ah === 0x40) return dos + "DS:" + hx(B.DX) + " adresindeki " + B.CX + " bayt ekrana yazılır; AX = yazılan bayt sayısı.";
      return dos + "yürütülür.";
    }
    if (nn === 0x10) {
      var bio = "BIOS video hizmeti AH = " + hx(ah, 1) + ": ";
      var cur = rec.cursorBefore || [0, 0];
      if (ah === 0x0E) return "BIOS hizmeti AH = 0Eh: AL'deki " + chText(al) + " ekrana yazılır" + (al === 13 || al === 10 || al === 8 ? " (imleç hareket eder)" : ", imleç bir ilerler") + ".";
      if (ah === 0x00) {
        if ((al & 0x7F) === 0x13) return bio + "video modu AL = " + hx(al, 1) + " seçilir: 320×200 piksel, 256 renk; görüntü belleği A000:0000h–F9FFh, her piksel bir bayt (bağıl konum = y · 320 + x)" +
          (al & 0x80 ? "; AL'nin 7. biti 1 olduğu için görüntü belleği silinmez." : "; görüntü belleği sıfırlanır (bütün pikseller 0 = siyah).");
        if ((al & 0x7F) === 3) return bio + "video modu AL = " + hx(al, 1) + " (80×25 metin, B800h) seçilir; ekran silinir, imleç (0, 0) konumuna gelir.";
        return bio + "video modu AL = " + hx(al, 1) + " seçilir; laboratuvar bu modu 80×25 metin ekranı olarak gösterir: ekran silinir, imleç (0, 0) konumuna gelir.";
      }
      if (ah === 0x01) return bio + "imleç biçimi değiştirilir (CH = " + hx(dh(B.CX), 1) + ", CL = " + hx(lo(B.CX), 1) + (dh(B.CX) & 0x20 ? "; bit 5 = 1 olduğu için imleç gizlenir" : "") + ").";
      if (ah === 0x02) return bio + "imleç DH = " + dh(B.DX) + ". satır, DL = " + lo(B.DX) + ". sütuna taşınır.";
      if (ah === 0x03) return bio + "imleç konumu okunur: DH = " + dh(R.DX) + " (satır), DL = " + lo(R.DX) + " (sütun); CX = " + hx(R.CX) + " imleç biçimidir.";
      if (ah === 0x06 || ah === 0x07) {
        var win = "(" + dh(B.CX) + ", " + lo(B.CX) + ") ile (" + dh(B.DX) + ", " + lo(B.DX) + ") arasındaki pencere";
        if (al === 0) return bio + win + " BH = " + attrText(dh(B.BX)) + " özniteliğiyle silinir.";
        return bio + win + " " + al + " satır " + (ah === 0x06 ? "yukarı" : "aşağı") + " kaydırılır; boşalan satırlar BH = " + attrText(dh(B.BX)) + " özniteliğiyle doldurulur.";
      }
      if (ah === 0x08) return bio + "imleçteki karakter ve öznitelik okunur: AL = " + hx(rAL, 1) + ", AH = " + hx(rAH, 1) + ".";
      if (ah === 0x09 || ah === 0x0A) return bio + "AL'deki " + chText(al) + " imleç konumuna (" + cur[0] + ", " + cur[1] + ") " + (ah === 0x09 ? "BL = " + attrText(lo(B.BX)) + " özniteliğiyle " : "") +
        "CX = " + B.CX + " kez yazılır; imleç ilerlemez.";
      var g13 = m.videoMode === 0x13, inside = B.CX < 320 && B.DX < 200, pof = B.DX * 320 + B.CX;
      if (ah === 0x0C) {
        if (!g13) return bio + "(" + B.CX + ", " + B.DX + ") pikseline AL = " + hx(al, 1) + " rengi yazılır; metin modunda olunduğu için ekranda görünmez.";
        if (!inside) return bio + "(" + B.CX + ", " + B.DX + ") 320×200 ekranın dışında kaldığı için hiçbir piksel değişmez.";
        return bio + "(" + B.CX + ", " + B.DX + ") pikseline AL = " + hx(al, 1) + " (" + colorName(al) + ") rengi yazılır: A000:" + hx(pof) + " = " + B.DX + " · 320 + " + B.CX + ".";
      }
      if (ah === 0x0D) {
        if (g13 && inside) return bio + "(" + B.CX + ", " + B.DX + ") pikselinin rengi A000:" + hx(pof) + " baytından okunur: AL = " + hx(rAL, 1) + " (" + colorName(rAL) + ").";
        return bio + "(" + B.CX + ", " + B.DX + ") pikselinin rengi okunur: AL = " + hx(rAL, 1) + ".";
      }
      if (ah === 0x0F) return bio + "video modu okunur: AL = " + hx(rAL, 1) + (rAL === 0x13 ? " (320×200, 256 renk)" : rAL === 3 ? " (80×25 metin)" : "") + ", AH = " + rAH + " sütun, BH = 0 (sayfa).";
      if (ah === 0x13) return bio + "ES:BP = " + so(B.ES, B.BP) + " adresindeki " + B.CX + " karakterlik dizgi (" + dh(B.DX) + ", " + lo(B.DX) + ") konumuna " +
        (al & 2 ? "kendi karakter/öznitelik çiftleriyle" : "BL = " + attrText(lo(B.BX)) + " özniteliğiyle") + " yazılır; AL = " + hx(al, 1) +
        (al & 1 ? " olduğu için imleç dizginin sonuna ilerler." : " olduğu için imleç yerinde kalır.");
      return bio + "yürütülür (ekranda görünür bir değişiklik yok).";
    }
    if (nn === 0x16) {
      var kb = "BIOS klavye hizmeti AH = " + hx(ah, 1) + ": ";
      if (ah === 0x00 || ah === 0x10) return kb + "tampondan " + keyText(rAL) + " alınır: AL = " + hx(rAL, 1) + " (ASCII kodu), AH = " + hx(rAH, 1) + " (tarama kodu); tuş ekrana yazılmaz.";
      if (ah === 0x01 || ah === 0x11) return kb + (fl.ZF ? "bekleyen tuş yok, ZF = 1." : "bekleyen tuş var (ZF = 0): " + keyText(rAL) + ", AL = " + hx(rAL, 1) + ", AH = " + hx(rAH, 1) + "; tuş tamponda kalır.");
      if (ah === 0x02) return kb + "kaydırma tuşlarının durumu alınır: AL = 00h.";
    }
    if (nn === 0x1A) {
      var rt = "BIOS saat hizmeti AH = " + hx(ah, 1) + ": ";
      if (ah === 0x00) return rt + "gece yarısından beri geçen saat tıkı sayısı (saniyede yaklaşık 18,2) alınır: CX:DX = " + hx(R.CX).slice(0, 4) + " " + hx(R.DX) + " = " +
        trNum(R.CX * 65536 + R.DX) + " tık." + clockNote(m);
      if (ah === 0x02) return rt + "gerçek zamanlı saat paketli BCD olarak alınır: CH = " + hx(dh(R.CX), 1) + " (saat), CL = " + hx(lo(R.CX), 1) + " (dakika), DH = " + hx(dh(R.DX), 1) + " (saniye); CF = 0." + clockNote(m);
      if (ah === 0x04) return rt + "tarih paketli BCD olarak alınır: CX = " + hx(R.CX) + " (yıl), DH = " + hx(dh(R.DX), 1) + " (ay), DL = " + hx(lo(R.DX), 1) + " (gün); CF = 0.";
    }
    if (nn === 0x15 && ah === 0x86) return "BIOS bekleme hizmeti: CX:DX = " + hx(B.CX).slice(0, 4) + " " + hx(B.DX) + " = " + trNum(B.CX * 65536 + B.DX) +
      " mikrosaniye (" + secText(B.CX * 65536 + B.DX) + ") beklenir; saat ve tık sayacı bu kadar ilerler, CF = 0.";
    return "INT " + hx(nn, 1) + " hizmeti yürütülür.";
  }
  /* 256 renkli VGA paletinin ilk 16 rengi metin renkleriyle aynıdır; 16–31 gri tonlar */
  var VGA16 = ["siyah", "mavi", "yeşil", "camgöbeği", "kırmızı", "eflatun", "kahverengi", "açık gri",
    "koyu gri", "açık mavi", "açık yeşil", "açık camgöbeği", "açık kırmızı", "açık eflatun", "sarı", "beyaz"];
  function colorName(c) { return c < 16 ? VGA16[c] : c < 32 ? "gri ton " + (c - 16) : c >= 248 ? "siyah" : "palet rengi " + c; }
  /* Türkçe sayı yazımı: binlik ayırıcı boşluk, ondalık virgül (5 000 000; 0,5) */
  function trNum(x, frac) {
    var k = Math.pow(10, frac || 0), p = String(Math.round(x * k) / k).split(".");
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return p.join(",");
  }
  function secText(us) {
    var s = us / 1000000;
    if (us < 1000) return us + " µs";
    if (us < 1000000) return trNum(us / 1000, 1) + " ms";
    return trNum(s, 3) + " s";
  }
  function clockNote(m) {
    return m.us ? " Program başından beri " + secText(m.us) + " geçti." : "";
  }
  function describe(m, rec) {
    var st = rec.st, mn = st.op, ops = st.ops, pre = rec.pre, w = rec.w, R = rec.regs, B = rec.before.regs;
    var head = st.psp ? "INT 20h (PSP:0000h)" : (st.show || st.text).replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ");
    if (st.macro && st.macro !== "emu8086.inc") head = st.macro + " açılımı · " + head;
    var s = head + ": ", a = ops[0], b = ops[1], an = a ? opName(a) : "", bn = b ? opName(b) : "";
    function post(o, wid) {
      if (o.kind === "r8" || o.kind === "r16" || o.kind === "sreg") return R[o.reg] != null ? R[o.reg] : m.get(o.reg);
      if (o.kind === "mem") { var e = pre[ops.indexOf(o)].ea; return (wid || w) === 1 ? m.rd8(e[0], e[1]) : m.rd16(e[0], e[1]); }
      return o.val;
    }
    function where(i) { return segName(ops[i]) + ":" + hx(pre[i].ea[1]) + " adresi"; }
    function src(i, wid) {
      var o = ops[i], v = hx(pre[i].v, wid || w);
      if (o.kind === "imm") return v;
      if (o.kind === "mem") return where(i) + "ndeki " + birim(wid || w) + " (" + v + ")";
      return o.reg + " değeri (" + v + ")";
    }
    var fl = rec.flags, bf = rec.before.flags, x, y, r, t;
    if (rec.st.op === "_BIOS") return "Varsayılan kesme vektörü: BIOS hizmeti yapılır ve IRET ile dönülür.";
    if (mn === "MOV") {
      if (a.kind === "mem") return s + src(1) + " " + where(0) + "ne yazılır; bayraklar değişmez.";
      if (b.kind === "imm") return s + an + " yazmacına " + hx(pre[1].v, w) + " yüklenir; bayraklar değişmez.";
      return s + src(1) + " " + an + " yazmacına kopyalanır; bayraklar değişmez.";
    }
    if (mn === "XCHG") return s + an + " ile " + bn + " değerleri yer değiştirir: şimdi " + an + " = " + hx(post(a), w) + ", " + bn + " = " + hx(post(b), w) + ".";
    if (mn === "LEA") {
      if (b.direct) return s + b.text + " değişkeninin bağıl konumu (" + hx(R[a.reg]) + ") " + an + " yazmacına yüklenir; belleğe erişilmez.";
      return s + b.text + " ifadesinin etkin adresi (" + hx(R[a.reg]) + ") " + an + " yazmacına yüklenir; belleğe erişilmez.";
    }
    if (mn === "LDS" || mn === "LES") return s + where(1) + "ndeki uzak işaretçi okunur: " + an + " = " + hx(R[a.reg]) + ", " + (mn === "LDS" ? "DS" : "ES") + " = " + hx(R[mn === "LDS" ? "DS" : "ES"]) + ".";
    if (has(ALU, mn)) {
      x = pre[0].v; y = pre[1].v; r = rec.info ? rec.info.r : post(a);
      var carry = (mn === "ADC" || mn === "SBB") ? " " + (mn === "ADC" ? "+" : "−") + " CF(" + bf.CF + ")" : "";
      if (mn === "CMP") return s + an + " − " + (b.kind === "imm" ? hx(y, w) : bn) + " = " + hx(x, w) + " − " + hx(y, w) + " = " + hx(r, w) + " hesaplanır, sonuç saklanmaz; " + flagNote(rec, "sub") + ".";
      if (mn === "ADD" || mn === "ADC") return s + an + " = " + hx(x, w) + " + " + hx(y, w) + carry + " = " + hx(r, w) + "; " + flagNote(rec, "add") + ".";
      if (mn === "SUB" || mn === "SBB") return s + an + " = " + hx(x, w) + " − " + hx(y, w) + carry + " = " + hx(r, w) + "; " + flagNote(rec, "sub") + ".";
      if (mn === "XOR" && a.kind !== "mem" && b.kind === a.kind && a.reg === b.reg) return s + "bir değer kendisiyle XOR'lanınca 0 olur, " + an + " = " + hx(0, w) + "; " + flagNote(rec, "logic") + ".";
      return s + an + " = " + hx(x, w) + " " + mn + " " + hx(y, w) + " = " + hx(r, w) + "; " + flagNote(rec, "logic") + ".";
    }
    if (mn === "TEST") return s + hx(pre[0].v, w) + " AND " + hx(pre[1].v, w) + " = " + hx(rec.info.r, w) + " hesaplanır, sonuç saklanmaz; " + flagNote(rec, "logic") + ".";
    if (mn === "INC" || mn === "DEC") return s + an + " = " + hx(pre[0].v, w) + (mn === "INC" ? " + 1 = " : " − 1 = ") + hx(post(a), w) + "; " + flagNote(rec, "inc") + ".";
    if (mn === "NEG") return s + an + " = 0 − " + hx(pre[0].v, w) + " = " + hx(post(a), w) + " (ikiye tümleyen); " + (fl.CF ? "işlenen sıfır olmadığı için CF = 1" : "işlenen sıfır olduğu için CF = 0") + (fl.OF ? ", işaretli taşma olduğu için OF = 1" : "") + ".";
    if (mn === "NOT") return s + an + " değerinin bütün bitleri ters çevrilir: " + hx(pre[0].v, w) + " → " + hx(post(a), w) + "; bayraklar değişmez.";
    if (mn === "MUL" || mn === "IMUL") {
      var sg = mn === "IMUL" ? "işaretli " : "";
      if (w === 1) return s + "AX = AL × " + an + " = " + hx(B.AX & 0xFF, 1) + " × " + hx(pre[0].v, 1) + " = " + hx(R.AX) + " (" + sg + "çarpım); " +
        (fl.CF ? "sonuç AL'ye sığmadığı için CF = OF = 1." : "sonuç AL'ye sığdığı için CF = OF = 0.");
      return s + "DX:AX = AX × " + an + " = " + hx(B.AX) + " × " + hx(pre[0].v) + " = " + hx(R.DX).slice(0, 4) + " " + hx(R.AX) + " (" + sg + "çarpım); " +
        (fl.CF ? "sonuç AX'e sığmadığı için CF = OF = 1." : "sonuç AX'e sığdığı için CF = OF = 0.");
    }
    if (mn === "DIV" || mn === "IDIV") {
      if (rec.irq) return s + (pre[0].v === 0 ? "bölen 0 olduğu için" : (w === 1 ? "bölüm AL'ye" : "bölüm AX'e") + " sığmadığı için") + " bölme hatası oluşur (INT 0): " + irqText(m, rec, true);
      if (w === 1) return s + "AX (" + hx(B.AX) + ") ÷ " + an + " (" + hx(pre[0].v, 1) + ") → bölüm AL = " + hx(R.AX & 0xFF, 1) + ", kalan AH = " + hx(R.AX >> 8, 1) + "; bayraklar tanımsız kalır.";
      return s + "DX:AX (" + hx(B.DX).slice(0, 4) + " " + hx(B.AX) + ") ÷ " + an + " (" + hx(pre[0].v) + ") → bölüm AX = " + hx(R.AX) + ", kalan DX = " + hx(R.DX) + "; bayraklar tanımsız kalır.";
    }
    if (has(SHIFTS, mn)) {
      var cnt = rec.info ? rec.info.cnt : 0, nb = b.kind === "r8" ? "CL kadar (" + cnt + ")" : String(cnt);
      if (cnt === 0) return s + "sayı 0 olduğu için hiçbir şey değişmez.";
      var verb = { SHL: "sola kaydırılır", SAL: "sola kaydırılır", SHR: "sağa kaydırılır, soldan 0 girer", SAR: "sağa kaydırılır, işaret biti korunur",
        ROL: "sola döndürülür", ROR: "sağa döndürülür", RCL: "CF üzerinden sola döndürülür", RCR: "CF üzerinden sağa döndürülür" }[mn];
      return s + an + " (" + hx(pre[0].v, w) + ") " + nb + " bit " + verb + ": " + hx(post(a), w) + "; son çıkan bit CF = " + fl.CF + ".";
    }
    if (has(JCC, mn)) {
      var cc = JCC[mn], jumped = R.IP === st.target && R.IP !== ((rec.before.ip + st.size) & 0xFFFF);
      var now = (COND_FLAGS[cc >> 1] || []).map(function (k) { return k + " = " + bf[k]; }).join(", ");
      return s + "şu an " + now + " olduğundan koşul (" + COND[cc] + ") " + (jumped ? "sağlanır; " + targetText(m, st.target) + " atlanır." :
        "sağlanmaz; atlanmaz, sıradaki komuta geçilir.");
    }
    if (mn === "JMP") return s + "koşulsuz olarak " + targetText(m, R.IP) + " atlanır.";
    if (mn === "LOOP" || mn === "LOOPE" || mn === "LOOPZ" || mn === "LOOPNE" || mn === "LOOPNZ") {
      var back = R.IP === st.target && st.target !== ((rec.before.ip + st.size) & 0xFFFF);
      var extra = mn === "LOOP" ? "" : " ve ZF = " + bf.ZF;
      return s + "CX bir azaltılır (CX = " + hx(R.CX) + "). " + (back ? "CX sıfır olmadığı" + (extra ? extra + " olduğu" : "") + " için " + targetText(m, st.target) + " dönülür." :
        (R.CX === 0 ? "CX sıfır olduğu için döngüden çıkılır." : "ZF = " + bf.ZF + " olduğu için döngüden çıkılır."));
    }
    if (mn === "JCXZ") return s + (B.CX === 0 ? "CX = 0 olduğu için " + targetText(m, st.target) + " atlanır." : "CX sıfır olmadığı için atlanmaz.");
    if (mn === "CALL") return s + "dönüş adresi " + hx((rec.before.ip + st.size) & 0xFFFF) + " yığına itilir (SP = " + hx(R.SP) + ") ve " + targetText(m, R.IP) + " gidilir.";
    var depth = (m.initSp - B.SP) & 0xFFFF;   /* yığındaki bayt sayısı; 8000h üstü: SP başlangıcın üstünde (alt taşma) */
    if (mn === "RET" || mn === "RETN" || mn === "RETF") {
      if (R.IP === 0 && R.CS === PSP_SEG && m.prog.com) return s + "yığından 0000h alınır; IP = 0000h olur ve PSP'deki INT 20h komutuna gidilir.";
      if (st.far) return s + "yığından önce IP = " + hx(R.IP) + ", sonra CS = " + hx(R.CS) + " alınır (SP = " + hx(R.SP) + ")" + (ops.length ? ", ayrıca SP " + ops[0].val + " bayt artırılır" : "") + "; uzak dönüş yapılır.";
      return s + "yığından dönüş adresi " + hx(R.IP) + " alınır (SP = " + hx(R.SP) + ")" + (ops.length ? ", ayrıca SP " + ops[0].val + " bayt artırılır" : "") + " ve oraya dönülür." +
        (depth >= 0x8000 ? " SP yığın alanının dışındaydı: okunan sözcük bir dönüş adresi değildir (alt taşma)." : "");
    }
    if (mn === "PUSH") return s + "SP 2 azaltılır (" + hx(R.SP) + ") ve " + (a.kind === "imm" ? hx(pre[0].v) + " değeri" : a.kind === "mem" ? where(0) + "ndeki sözcük (" + hx(pre[0].v) + ")" : an + " değeri (" + hx(pre[0].v) + ")") + " SS:" + hx(R.SP) + " adresine yazılır.";
    if (mn === "POP") return s + "SS:" + hx(B.SP) + " adresindeki sözcük (" + hx(m.rd16(rec.regs.SS, B.SP)) + ") " + (a.kind === "mem" ? where(0) + "ne" : an + " yazmacına") + " alınır ve SP 2 artırılır (" + hx(R.SP) + ")." +
      (depth === 0 && m.prog.com ? " Yığında programın ittiği değer kalmamıştı: DOS'un dönüş adresi (0000h) alındı ve SP sarmaladı (alt taşma)." :
        depth >= 0x8000 ? " SP yığın alanının dışındaydı: okunan sözcük yığına itilmiş bir değer değildir (alt taşma)." : "");
    if (mn === "PUSHF") return s + "FLAGS sözcüğü (" + hx(m.rd16(R.SS, R.SP)) + ") yığına itilir; SP = " + hx(R.SP) + ".";
    if (mn === "POPF") return s + "yığındaki sözcük (" + hx(m.rd16(R.SS, B.SP)) + ") FLAGS yazmacına alınır; bütün bayraklar geri gelir, SP = " + hx(R.SP) + ".";
    if (mn === "LAHF") return s + "SF, ZF, AF, PF ve CF bayraklarını içeren FLAGS alt baytı AH yazmacına kopyalanır: AH = " + hx(R.AX >> 8, 1) + ".";
    if (mn === "SAHF") return s + "AH (" + hx(B.AX >> 8, 1) + ") FLAGS alt baytına yazılır; SF, ZF, AF, PF ve CF bu değerden gelir.";
    if (mn === "CLC") return s + "CF = 0 yapılır.";
    if (mn === "STC") return s + "CF = 1 yapılır.";
    if (mn === "CMC") return s + "CF tersine çevrilir: CF = " + fl.CF + ".";
    if (mn === "CLD") return s + "DF = 0 yapılır; dizgi komutları SI ile DI değerlerini artırır.";
    if (mn === "STD") return s + "DF = 1 yapılır; dizgi komutları SI ile DI değerlerini azaltır.";
    if (mn === "CLI") return s + "IF = 0 yapılır; donanım kesmeleri kabul edilmez.";
    if (mn === "STI") return s + "IF = 1 yapılır; donanım kesmeleri kabul edilir.";
    if (mn === "CBW") return s + "AL (" + hx(B.AX & 0xFF, 1) + ") işaretiyle AX değerine genişletilir: AX = " + hx(R.AX) + ".";
    if (mn === "CWD") return s + "AX (" + hx(B.AX) + ") işaretiyle DX:AX değerine genişletilir: DX = " + hx(R.DX) + ".";
    if (mn === "NOP") return s + "hiçbir şey yapılmaz; yalnız IP ilerler.";
    if (mn === "HLT") return s + "işlemci durur.";
    if (mn === "XLATB") return s + "DS:[BX + AL] = DS:" + hx((B.BX + (B.AX & 0xFF)) & 0xFFFF) + " adresindeki bayt AL yazmacına alınır: AL = " + hx(R.AX & 0xFF, 1) + ".";
    if (has(EXEC, mn) && EXEC[mn] === strop) {
      var base = mn.slice(0, -1), wd = /B$/.test(mn) ? 1 : 2, inf = rec.info || { n: 1 }, adim = (bf.DF ? "azalır" : "artar");
      var u = birim(wd), dd = wd + " " + adim;
      if (inf.rep && m.repStep) {
        if (!inf.n) return s + "CX = 0 olduğu için komut hiç yürütülmez.";
        var moved = wd === 1 ? m.rd8(R.ES, B.DI) : m.rd16(R.ES, B.DI);
        var one = { MOVS: "DS:" + hx(B.SI) + " adresindeki " + u + " (" + hx(moved, wd) + ") ES:" + hx(B.DI) + " adresine kopyalanır",
          STOS: (wd === 1 ? "AL" : "AX") + " değeri ES:" + hx(B.DI) + " adresine yazılır",
          LODS: "DS:" + hx(B.SI) + " adresindeki " + u + " " + (wd === 1 ? "AL" : "AX") + " yazmacına okunur",
          CMPS: "DS:" + hx(B.SI) + " ile ES:" + hx(B.DI) + " adreslerindeki " + u + " değerleri karşılaştırılır (ZF = " + fl.ZF + ")",
          SCAS: (wd === 1 ? "AL" : "AX") + " ile ES:" + hx(B.DI) + " adresindeki " + u + " karşılaştırılır (ZF = " + fl.ZF + ")" }[base];
        var fin;
        if (inf.again) fin = "koşul sürdüğü için aynı komut bir tur daha yürütülecek";
        else if (R.CX === 0 && !((base === "CMPS" || base === "SCAS") && ((inf.rep === "E") !== !!fl.ZF))) fin = "CX sıfırlandığı için yineleme biter";
        else fin = inf.rep === "E" ? "farklı " + u + " bulunduğu (ZF = 0) için yineleme biter" : "aranan " + u + " bulunduğu (ZF = 1) için yineleme biter";
        return s + "bir tur: " + one + "; CX bir azalır (CX = " + hx(R.CX) + "); " + fin + ".";
      }
      if (inf.rep) {
        var n = inf.n, stop = "";
        if (base === "CMPS" || base === "SCAS") stop = R.CX === 0 && !((inf.rep === "E") !== !!fl.ZF) ? "CX sıfırlandığı için durulur" :
          (inf.rep === "E" ? "farklı bir " + u + " bulunduğu (ZF = 0) için durulur" : "aranan " + u + " bulunduğu (ZF = 1) için durulur");
        else stop = "CX sıfırlanınca durulur";
        var what = { MOVS: n + " " + u + " DS:" + hx(B.SI) + " adresinden ES:" + hx(B.DI) + " adresine kopyalanır",
          STOS: n + " " + u + " ES:" + hx(B.DI) + " adresinden başlayarak " + (wd === 1 ? "AL" : "AX") + " değeriyle (" + hx(wd === 1 ? B.AX & 0xFF : B.AX, wd) + ") doldurulur",
          LODS: n + " " + u + " art arda " + (wd === 1 ? "AL" : "AX") + " yazmacına okunur",
          CMPS: n + " " + u + " çifti karşılaştırılır", SCAS: n + " " + u + " " + (wd === 1 ? "AL" : "AX") + " ile karşılaştırılır" }[base];
        var regsNow = "CX = " + hx(R.CX) + (base === "SCAS" || base === "STOS" ? "" : ", SI = " + hx(R.SI)) + (base === "LODS" ? "" : ", DI = " + hx(R.DI));
        return s + what + "; " + stop + ". Şimdi " + regsNow + ".";
      }
      if (base === "MOVS") return s + "DS:" + hx(B.SI) + " adresindeki " + u + " ES:" + hx(B.DI) + " adresine kopyalanır; SI ile DI " + dd + ".";
      if (base === "STOS") return s + (wd === 1 ? "AL" : "AX") + " değeri ES:" + hx(B.DI) + " adresine yazılır; DI " + dd + ".";
      if (base === "LODS") return s + "DS:" + hx(B.SI) + " adresindeki " + u + " " + (wd === 1 ? "AL" : "AX") + " yazmacına okunur (" + hx(wd === 1 ? R.AX & 0xFF : R.AX, wd) + "); SI " + dd + ".";
      if (base === "CMPS") return s + "DS:" + hx(B.SI) + " ile ES:" + hx(B.DI) + " adreslerindeki " + u + " değerleri karşılaştırılır (çıkarılır); " + (fl.ZF ? "eşit oldukları için ZF = 1" : "farklı oldukları için ZF = 0") + "; SI ile DI " + dd + ".";
      if (base === "SCAS") return s + (wd === 1 ? "AL" : "AX") + " ile ES:" + hx(B.DI) + " adresindeki " + u + " karşılaştırılır; " + (fl.ZF ? "eşit oldukları için ZF = 1" : "farklı oldukları için ZF = 0") + "; DI " + dd + ".";
    }
    if (mn === "INT" || mn === "INTO" || mn === ".EXIT") {
      var nn = mn === ".EXIT" ? 0x21 : mn === "INTO" ? 4 : a.val & 0xFF;
      if (mn === "INTO" && !bf.OF) return s + "OF = 0 olduğu için kesme oluşmaz.";
      if (rec.irq) return s + irqText(m, rec);
      return s + serviceText(m, rec, nn);
    }
    if (mn === "AAM") return s + "AL (" + hx(B.AX & 0xFF, 1) + ") " + (st.aamBase == null ? 10 : st.aamBase) + " sayısına bölünür: AH = bölüm (" + hx(R.AX >> 8, 1) + "), AL = kalan (" + hx(R.AX & 0xFF, 1) + "); sonuç paketsiz BCD basamaklarıdır.";
    if (mn === "AAD") return s + "AL = AH × " + (st.aamBase == null ? 10 : st.aamBase) + " + AL = " + hx(B.AX >> 8, 1) + " × " + (st.aamBase == null ? 10 : st.aamBase) + " + " + hx(B.AX & 0xFF, 1) + " = " + hx(R.AX & 0xFF, 1) + ", AH = 00h; paketsiz BCD sayı ikiliye çevrilir.";
    if (mn === "DAA" || mn === "DAS") return s + "AL paketli BCD biçimine düzeltilir: " + hx(B.AX & 0xFF, 1) + " → " + hx(R.AX & 0xFF, 1) + "; " +
      (fl.AF ? "düşük nibble'a " + (mn === "DAA" ? "6 eklendi" : "6 çıkarıldı") + " (AF = 1)" : "düşük nibble geçerli (AF = 0)") + ", " + (fl.CF ? "yüksek nibble da düzeltildi (CF = 1)." : "yüksek nibble geçerli (CF = 0).");
    if (mn === "AAA" || mn === "AAS") return s + (fl.AF ? "AL'nin düşük nibble'ı 9'dan büyük ya da AF = 1 olduğu için düzeltme yapılır: AL = " + hx(R.AX & 0xFF, 1) + ", AH = " + hx(R.AX >> 8, 1) + ", CF = AF = 1." :
      "düzeltme gerekmez: AL'nin yüksek nibble'ı temizlenir (AL = " + hx(R.AX & 0xFF, 1) + "), CF = AF = 0.");
    if (mn === "IRET") return s + "yığından IP = " + hx(R.IP) + ", CS = " + hx(R.CS) + " ve FLAGS = " + hx(m.rd16(R.SS, (B.SP + 4) & 0xFFFF)) +
      " geri alınır (SP = " + hx(R.SP) + "); kesilen programa dönülür" + (fl.IF !== bf.IF ? " ve IF yeniden " + fl.IF + " olur" : "") + ".";
    if (mn === "OUT") {
      var pw = rec.info ? rec.info.port : (a.kind === "r16" ? B.DX : a.val & 0xFF);
      return s + b.reg + " değeri (" + hx(rec.info ? rec.info.v : m.get(b.reg), b.size) + ") " + hx(pw, pw > 255 ? 2 : 1) + " portuna yazılır" +
        (b.size === 2 ? " (sözcük: düşük bayt " + hx(pw, pw > 255 ? 2 : 1) + ", yüksek bayt bir sonraki porta)" : "") + ".";
    }
    if (mn === "IN") {
      var pr = rec.info ? rec.info.port : (b.kind === "r16" ? B.DX : b.val & 0xFF);
      return s + hx(pr, pr > 255 ? 2 : 1) + " portundan okunan " + birim(a.size) + " (" + hx(rec.info ? rec.info.v : R[an], a.size) + ") " + an + " yazmacına alınır.";
    }
    /* genel: değişen yazmaçlar */
    var ch = [];
    ["AX", "BX", "CX", "DX", "SI", "DI", "BP", "SP"].forEach(function (k) { if (R[k] !== B[k]) ch.push(k + " = " + hx(R[k])); });
    FLAGORDER.forEach(function (k) { if (fl[k] !== bf[k]) ch.push(k + " = " + fl[k]); });
    return s + (ch.length ? "değişenler: " + ch.join(", ") + "." : "yazmaçlar değişmez.");
  }

  /* ================= emu8086 sanal aygıt modelleri (laboratuvar çizimleri için) ================= */
  /* Step motor (port 7): bit 0–2 üç elektromıknatıs; yarım adım 11,25°, tam adım 22,5° (32 yarım adım = bir tur).
     emu8086 belgesi hangi mıknatıs geçişinin hangi yöne kaç adım olduğunu söylemez. Model, emu8086 örneğinin dört
     tablosundaki (datcw, datccw, datcw_fs, datccw_fs) ardışık bayt çiftlerinden çıkarılmıştır: 16 geçiş, çakışma yok.
     Tablolarda olmayan bir geçişte ve ilk baytta mil yerinde kalır. */
  var STEP_TABLES = [[[6, 4, 3, 2], 1, "saat yönünde yarım adım"], [[3, 1, 6, 2], -1, "saat yönünün tersine yarım adım"],
    [[1, 3, 6, 0], 2, "saat yönünde tam adım"], [[4, 6, 3, 0], -2, "saat yönünün tersine tam adım"]];
  var STEP_MOVE = {};
  STEP_TABLES.forEach(function (t) { for (var i = 0; i < 4; i++) STEP_MOVE[t[0][i] + ">" + t[0][(i + 1) % 4]] = [t[1], t[2]]; });
  function stepperNext(st, v) {
    var mag = v & 7, r = { mag: mag, half: st.half, writes: st.writes + 1, kind: null, delta: 0 };
    if (st.mag == null) r.kind = "ilk";
    else if (st.mag === mag) r.kind = "aynı";
    else {
      var mv = STEP_MOVE[st.mag + ">" + mag];
      if (mv) { r.delta = mv[0]; r.half += mv[0]; r.kind = mv[1]; } else r.kind = "tablo dışı";
    }
    return r;
  }
  /* port yazımları [adım, port, değer, genişlik] → port 7'nin son durumu; yarım adım sayısı half (CW +), açı = half · 11,25° */
  function stepper(writes) {
    var st = { mag: null, half: 0, writes: 0, kind: null, delta: 0 };
    (writes || []).forEach(function (w) {
      if (w[1] === 7) st = stepperNext(st, w[2] & 0xFF);
      else if (w[1] === 6 && w[3] === 2) st = stepperNext(st, (w[2] >> 8) & 0xFF);
    });
    return st;
  }
  /* Yazıcı (INT 21h/05h): CR satır başı, LF alt satır, HT sonraki 8'in katı sütun, FF sayfayı çıkarır (boş sayfa çıkmaz;
     son çıkan sayfa last'ta tutulur);
     aynı yere ikinci kez basılan karakter öncekinin yerini alır (emu8086 kâğıdı üstteki karakteri gösterir). */
  function printerPaper(text) {
    var pages = 0, lines = [[]], row = 0, col = 0, i, c, last = null;
    function strip(ls) { return ls.map(function (l) { var t = ""; for (var k = 0; k < l.length; k++) t += l[k] || " "; return t.replace(/\s+$/, ""); }); }
    function empty() { return lines.every(function (l) { return !l.some(function (x) { return x && x !== " "; }); }); }
    for (i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c === 12) { if (!empty()) { pages++; last = strip(lines); } lines = [[]]; row = 0; col = 0; }
      else if (c === 13) col = 0;
      else if (c === 10) { row++; while (lines.length <= row) lines.push([]); }
      else if (c === 9) col = (Math.floor(col / 8) + 1) * 8;
      else if (c >= 32) { lines[row][col] = text.charAt(i); col++; }
    }
    return { ejected: pages, lines: strip(lines), row: row, col: col, last: last };
  }

  /* ================= toplu çalıştırma (testler için, emu8086.py run() ile aynı biçim) ================= */
  function run(source, opts) {
    opts = opts || {};
    var res = { steps: [], output: "", stop: null, error: null, warnings: [], final: null };
    var prog;
    try { prog = assemble(source, opts); }
    catch (e) { if (e instanceof AsmError) { res.stop = "error"; res.error = "Assembly hatası: " + e.message; return res; } throw e; }
    res.warnings = prog.warnings.slice();
    var m = new Machine(prog, opts), maxSteps = opts.maxSteps || 10000, n = 0;
    res.machine = m; res.program = prog;
    for (;;) {
      if (m.halted) { res.stop = m.halted; break; }
      if (n >= maxSteps) { res.stop = "max_steps"; break; }
      var rec;
      try {
        rec = m.stepRecord();
        if (rec == null) continue;
      } catch (e) {
        if (e instanceof EmuError) { res.stop = "error"; res.error = "Çalışma hatası: " + e.message; break; }
        if (e instanceof InputWait) { res.stop = "input_wait"; res.error = "girdi bekleniyor (" + e.what + ")"; break; }
        throw e;
      }
      n++;
      res.steps.push({ step: n, line: rec.st.line, regs: rec.regs, flags: rec.flags, undef: Object.keys(rec.undef).sort(),
        mem: rec.mem, out: rec.out, text: rec.text, macro: rec.st.macro });
    }
    res.output = m.out;
    res.ports = m.portWrites; res.printer = m.printer; res.us = m.us; res.videoMode = m.videoMode;
    res.final = { regs: m.regs(), flags: m.flags(), undef: Object.keys(m.undef).sort() };
    return res;
  }

  var API = { parseNumber: parseNumber, assemble: assemble, Machine: Machine, run: run, AsmError: AsmError, EmuError: EmuError, InputWait: InputWait, hx: hx,
    FLAGORDER: FLAGORDER, PSP_SEG: PSP_SEG, stepper: stepper, stepperNext: stepperNext, printerPaper: printerPaper, colorName: colorName, secText: secText, trNum: trNum };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  else root.Mini8086 = API;
})(this);
