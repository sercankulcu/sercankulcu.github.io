mem = {};
settings = [];
reg = [];
regCount = 1;
op = {};
op.chars = new Array();
op.elements = [];
op.regs = [0, 0];
ints = "0123456789";
ops = "+-*/=:";
charSet = alph + ints + ops;
tempObjAttr = {
    "fill": "red",
    "font-size": 20,
    "font-weight": "bold",
    "stroke": "black",
    "stroke-width": "1px",
    "stroke-linecap": "square",
    "stroke-linejoin": "bevel"
};

paper = Raphael(100, 0, 700, 700);
fixUI();

ram = paper.image("assets/fin.png", 50, 70, 600, 600); // ORIGINAL SOURCE: http://4vector.com/free-vector/ram-computer-memory-clip-art-116383
ramText = paper.text(350, 110, "Main \n Memory \n (RAM)");

for (var i = 0; i < 16; i++) { //Place text for memory boxes
    mem[alph[i]] = {};
    mem[alph[i]].val = paper.text(162 + (Math.floor(i / 3.99) % 2) * 125 + 312 * Math.floor(i / 7.99), 90 + (20 * (i % 4)), '0').attr({ fill: 'white' });
    mem[alph[i]].text = paper.text(125 + (Math.floor(i / 3.99) % 2) * 125 + 315 * Math.floor(i / 7.99), 90 + (20 * (i % 4)), alph[i] + ' :').attr({ fill: 'black' });
    var tempFunc = "$('#memInputDir').html('" + alph[i] + "');$('#memInput').val(mem['" + alph[i] + "'].val.attrs.text);$('#memInput').css('color','black');";
    $('#tr' + i % 4).append('<th onclick="' + tempFunc + '"><a>' + alph[i] + '</a></th>');
}

startText = paper.text(220, 360, "PC").attr({ 'fill': 'white', "font-weight": "bold" });
startVal = paper.text(275, 360, "a (0x00)").attr({ fill: 'white' });
paper.rect(235, 353, 80, 15).attr({ stroke: 'white' });

paper.text(220, 380, 'IR').attr({ fill: 'white' });
paper.rect(235, 373, 80, 15).attr({ stroke: 'white' });
reg[0] = paper.text(275, 380, '-').attr({ fill: 'white' });

paper.text(220, 400, 'AX').attr({ fill: 'white' });
paper.rect(235, 393, 80, 15).attr({ stroke: 'white' });
reg[1] = paper.text(275, 400, '-').attr({ fill: 'white' });

paper.text(220, 420, 'BX').attr({ fill: 'white' });
paper.rect(235, 413, 80, 15).attr({ stroke: 'white' });
reg[2] = paper.text(275, 420, '-').attr({ fill: 'white' });

paper.text(220, 440, 'CX').attr({ fill: 'white' });
paper.rect(235, 433, 80, 15).attr({ stroke: 'white' });
reg[3] = paper.text(275, 440, '-').attr({ fill: 'white' });

paper.text(220, 460, 'DX').attr({ fill: 'white' });
paper.rect(235, 453, 80, 15).attr({ stroke: 'white' });
reg[4] = paper.text(275, 460, '-').attr({ fill: 'white' });

paper.text(220, 480, 'SP').attr({ fill: 'white' });
paper.rect(235, 473, 80, 15).attr({ stroke: 'white' });
reg[5] = paper.text(275, 480, '-').attr({ fill: 'white' });

paper.text(220, 500, 'BP').attr({ fill: 'white' });
paper.rect(235, 493, 80, 15).attr({ stroke: 'white' });
reg[6] = paper.text(275, 500, '-').attr({ fill: 'white' });

paper.text(220, 520, 'XX').attr({ fill: 'white' });
paper.rect(235, 513, 80, 15).attr({ stroke: 'white' });
reg[7] = paper.text(275, 520, '-').attr({ fill: 'white' });

paper.text(220, 540, 'AC').attr({ fill: 'white' });
paper.rect(235, 533, 80, 15).attr({ stroke: 'white' });
reg[8] = paper.text(275, 540, '-').attr({ fill: 'white' });

aluOP = paper.text(423, 427, '+').attr({ fill: 'white', "font-weight": "bold", 'font-size': 25 });
aluInput = [];
aluInput[0] = paper.text(386.5, 381, '-').attr({ fill: 'white', 'font-size': 20 });
aluInput[1] = paper.text(456.5, 381, '-').attr({ fill: 'white', 'font-size': 20 });
aluOutput = paper.text(423, 468, '-').attr({ fill: 'white', 'font-size': 20 });

loadStart();


function setPC(index) {
}

function loadStart() {
    startVal.attr("text", "a (0x00)");
    mem["a"].val.attr("text", "i=5");
    mem["b"].val.attr("text", "j=9");
    mem["c"].val.attr("text", "k=j+10");
    mem["d"].val.attr("text", "l=i*k");
    settings[0] = "i=5";
    settings[1] = "j=9";
    settings[2] = "k=j+10";
    settings[3] = "l=i*k";
}

function hasChar(a) {
    var res = 0;
    for (var i = 2; i < a.length; i++) {
        if (alph.includes(a[i])) {
            res = 1;
        }
    }
    return res
}

$('#startButton').click(function () {
    if ($('#startButton').prop('disabled') == false) {
        $('#memInput').prop('disabled', true);
        $('#startInput').prop('disabled', true);
        $('#startButton').prop('disabled', true);
        $('#startButton').html('Continue');

        runStep();
    }
});

$('#restartButton').click(function () {
    clearAll();
    stepCount = 1;
    regCount = 1;

    for (var i = 0; i < 16; i++) { // Reset memory boxes
        mem[alph[i]].val.attr('text', settings[i]);
    }

    $('#stepsDiv').html('');
    $('#memInput').prop('disabled', false);
    $('#startInput').prop('disabled', false);
    $('#startButton').prop('disabled', false);
    $('#startButton').html('Start');
});

$('#resetButton').click(function () { // op.elements clear
    clearAll();
    stepCount = 1;
    regCount = 1;

    $('#memInput').val('0');
    $('#startInput').val('a');
    $('#stepsDiv').html('');
    $('#memInput').prop('disabled', false);
    $('#startInput').prop('disabled', false);
    $('#startButton').prop('disabled', false);
    $('#startButton').html('Start');
});

function clearAll() {
    try { tempObj.remove(); } catch (err) { }
    for (var i = 0; i < 16; i++) { // Empty memory boxes
        mem[alph[i]].val.attr('text', '0');
    }
    reg.forEach(function (i) { // Empty reg boxes
        i.attr('text', '-');
    });
    aluInput[0].attr('text', '-');
    aluInput[1].attr('text', '-');
    aluOutput.attr('text', '-');
    aluOP.attr('text', '+');
    startVal.attr('text', 'a (0x00)');
    op.chars = [];
    op.elements = [];
    op.regs = [0, 0];
    insIndex = 0;
}

$('#memInput').keyup(function () {
    var n = $('#memInput').val();
    if (n == "") { // check n contents with RegExp?
        mem[$('#memInputDir').html()].val.attr('text', '0');
        settings[alph.indexOf($('#memInputDir').html())] = '0';
        $('#memInput').css('color', 'red');
    } else if (n.length < 7) {
        mem[$('#memInputDir').html()].val.attr('text', n);
        settings[alph.indexOf($('#memInputDir').html())] = n;
        $('#memInput').css('color', 'black');
    }
});

$('#startInput').keyup(function () {
    var n = $('#startInput').val();
    if (n == "" || !alph.includes(n)) {
        startVal.attr('text', 'a (0x00)');
        insIndex = 0;
        settings[16] = 'a';
        $('#startInput').css('color', 'red');
    } else if (n.length < 2) {
        startVal.attr('text', n + " (0x0" + alph.indexOf(n).toString(16) + ")");
        insIndex = alph.indexOf(n);
        settings[16] = n;
        $('#startInput').css('color', 'black');
    }
});

function alertBox(text) {
    $('#alertDiv').html("<div class='alert alert-info alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> " + text + " </div>");
}

$(document).ready(function () {
    fixUI(); // Fix position of UI elements when document is ready
    $('#memInput').val('i=7');
    $('#startInput').val('a');
    $('#memInput').prop('disabled', false);
    $('#startInput').prop('disabled', false);
    $('#startButton').prop('disabled', false);
});

$(window).resize(function () {
    fixUI(); // Fix position of UI elements when window size is changed
});

function fixUI() { //Sets position of elements in proportion to the window size
    var height = $(window).height();
    var width = $(window).width();

    //paper.setSize(width,height);
    $('svg:first').css({ left: (width > 700) ? (width / 2 - $('svg:first').width() / 2) : 0, top: (height > 700) ? (height / 2 - $('svg:first').height() / 2) : 0 });

    $('#optionsDiv').css({ left: 20, top: height - 20 });
    $('#help').css({ left: width - 70, top: height - 70 });
    $('#alertDiv').css({ left: width / 2 - $('#alertDiv').width() / 2, top: height / 2 - $('#alertDiv').height() / 2 });
    $('#buttonsDiv').css({ left: width / 2 - $('#buttonsDiv').width() / 2, top: height - 20 - $('#buttonsDiv').height() });
    $('#stepsDiv').css({ left: 20, top: height / 2 - $('#stepsDiv').height() / 2 });
}