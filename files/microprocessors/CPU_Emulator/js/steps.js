step = [];
stepCount = 1;
insIndex = 0;
alph = "abcdefghijklmnop";

function runStep(){
    if(stepCount == 1){
        $('#stepsDiv').html('');
    }
    step[stepCount].func();
    $('[id*=step]:button').popover('hide');
    $('#stepsDiv').append('<button id="step' + stepCount + '" type="button" class="btn btn-sm btn-info" data-placement="right" container="body" data-toggle="popover" data-original-title="Step ' + stepCount + '" data-content="' + step[stepCount].exp + '">' + stepCount + '</button>');
    fixUI();
    $('#step' + stepCount).popover('show');
    stepCount++;
}

function endStep(){
    $('#startButton').prop('disabled', false);
    if(stepCount == 6){
        stepCount = 1;
        op.chars = [];
        op.elements = [];
        op.regs = [0,0];
        regCount = 1;
    }
}

function addBus(callback){//move tempObj from address BUS
    tempObj.animate({x:175,y:406}, 500, "<", function(){
        tempObj.animate({x:88,y:406}, 500, "", function() {
            tempObj.animate({x:88,y:190}, 1000, "", function() {
                tempObj.animate({x:mem[tempObj.attrs.text].text.attrs.x,y:mem[tempObj.attrs.text].text.attrs.y}, 750, "<>", function(){
                    callback.call(this);
                });
            });
        });
    });
}

function valBusA(callback){
    tempObj.animate({x:523,y:406}, 1000, "<", function(){
        tempObj.animate({x:612,y:406}, 500, "", function() {
            tempObj.animate({x:612,y:190}, 1000, "", function() {
                callback.call(this);
            });
        });
    });
}

function valBusR(callback){
    tempObj.animate({x:612,y:190}, 750, "<", function(){
        tempObj.animate({x:612,y:406}, 1000, "", function() {
            tempObj.animate({x:523,y:406}, 500, "", function() {
                callback.call(this);
            });
        });
    });
}

function appendReg(callback){
    if(regCount < 8) {
        tempObj.animate({x: reg[regCount].attrs.x, y: reg[regCount].attrs.y}, 2000, "<>", function () {
            reg[regCount].attr('text', tempObj.attrs.text);
            regCount++;
            callback.call(this);
        });
    }else{
        alertBox("<strong>Error</strong> Registry Slots Full :<br> There were no registry slots left to place values in.");
    }
}

step[1] = {
    func : function(){ // Check given starting index
        tempObj = startVal.clone().attr(tempObjAttr);
        tempObj.attr('text',tempObj.attrs.text[0]);

        startVal.attr('text', alph[insIndex+1] + " (0x0" + (insIndex+1).toString(16) + ")"); // increase PC visually but not insIndex

        var n = mem[alph[insIndex]].val.attrs.text;
        for (var i in n) { // Seperate instruction string into an array and delete
            if (n[i] != " ") {
                op.chars.push(n[i]);
            }
        }

        addBus(function(){
            endStep();
        });
    },
    exp : "The value in the Program Counter (PC) register is sent to the memory for retrieval."
};

step[2] ={
    func : function(){ // Move value in index to IR
         tempObj.remove();
         tempObj = mem[alph[insIndex]].val.clone().attr(tempObjAttr);
         valBusR(function () {
             if(op.chars.length != 1 && op.chars[0] != 0) {
                 if (op.chars.length > 2) {
                     if (alph.includes(op.chars[0]) && op.chars[1] == "=") { // Check if instruction array starts with a memory index and the assignment operator
                         var res = 0;
                         op.chars.forEach(function (i) { // Check if every character in the instruction is found in charSet
                             if (!charSet.includes(i)) {
                                 res = 1;
                             }
                         });
                         if (res == 0) {
                             for (var i in op.chars) { // Group characters into elements
                                 if (ops.includes(op.chars[i]) || alph.includes(op.chars[i])) {
                                     op.elements.push(op.chars[i]);
                                 } else {
                                     if (!isNaN(op.elements[op.elements.length - 1])) {
                                         op.elements[op.elements.length - 1] = op.elements[op.elements.length - 1] + op.chars[i];
                                     } else {
                                         op.elements.push(op.chars[i]);
                                     }
                                 }
                             }
                             if (op.elements.length % 2 == 1) {
                                 tempObj.animate({x: reg[0].attrs.x, y: reg[0].attrs.y}, 2000, "<>", function () {
                                     reg[0].attr('text', tempObj.attrs.text);
                                     this.remove();
                                     endStep();
                                 });
                             } else {
                                 alertBox("<strong>Error</strong> Invalid Element Count :<br> Make sure the insturction string is complete. Every operation must have two values alongside it.")
                             }
                         } else {
                             alertBox("<strong>Error</strong> Invalid Character :<br> Use only integers, valid memory indexes and simple functions ( + - / * ) in the instruction.")
                         }
                     } else {
                         alertBox("<strong>Error</strong> Invalid Instruction String :<br> Use the assignment operator (=) alongside a valid memory index.")
                     }
                 } else {
                     alertBox("<strong>Error</strong> Short Instruction String :<br> Instruction must contain an assignment operator (=), a memory index on which the assignment will be made upon and a valid term to be assigned.")
                 }
             }else{
                 alertBox("<strong>Alert</strong><br> End of code segment.")
             }
         });
    },
    exp : "The value (instruction) at the corresponding address is transferred to the Instruction Register (IR)."
};

step[3] = {
    func : function(){ // Retrieve necessary variables from memory and put them in a registry
        var i = op.regs.length;
        if(i < op.elements.length){
            if(alph.includes(op.elements[i])){
                op.regs.push(regCount);
                tempObj = paper.text(reg[0].attrs.x, reg[0].attrs.y, op.elements[i]).attr(tempObjAttr);
                addBus(function(){setTimeout(function(){
                        tempObj = mem[this.attrs.text].val.clone().attr(tempObjAttr);
                        this.remove();
                        valBusR(function(){setTimeout(function(){
                            if(!isNaN(this.attrs.text)) {
                                appendReg(function(){
                                    op.elements[i] = this.attrs.text;
                                    this.remove();
                                    setTimeout(step[3].func, 1000);
                                });
                            }else{
                                alertBox("<strong>Error</strong> Invalid Variable :<br> Memory index used in operation must be an integer.")
                            }
                        }.call(this),1000)});
                }.call(this),1000)}); // SETTIMOUT DELAY DOES NOT WORK WITH .CALL()
            }else if(!isNaN(op.elements[i])){
                op.regs.push(regCount);
                tempObj = paper.text(reg[0].attrs.x, reg[0].attrs.y, op.elements[i]).attr(tempObjAttr);
                    if(!isNaN(tempObj.attrs.text)) {
                        appendReg(function () {
                            setTimeout(function () {
                                this.remove();
                                setTimeout(step[3].func, 1000);
                            }.call(this), 1000)
                        });
                    }else{
                        alertBox("<strong>Error</strong> Invalid Variable :<br> The assignment operator must be used with an integer. The specified memory index contains a non-integer value.")
                    }
            }else if(ops.includes(op.elements[i])){
                op.regs.push(0);
                setTimeout(step[3].func,500);
            }else{
                alertBox("<strong>Error</strong> Invalid Element :<br> \"" + op.elements[i] + "\" contains / is an invalid character.")
            }
        }else{
            endStep();
        }
    },
    exp : "The values of the operands are extracted and placed in available registries."
};

step[4] = {
    func : function(){ // Move values to ALU if there is an extra operation
        // INSERT LOOP HERE FOR SEVERAL EXTRA OPERATIONS
        var opIndex = {
            '+': op.elements.indexOf("+"),
            '-': op.elements.indexOf("-"),
            '*': op.elements.indexOf("*"),
            '/': op.elements.indexOf("/")
        };
        var operation = '';

        if(opIndex['*'] != -1 || opIndex['/'] != -1){
            if(opIndex['/'] == -1 || (opIndex['*'] < opIndex['/']) && opIndex['/'] != -1 && opIndex['*'] != -1){
                operation = '*';
            }else{
                operation = '/';
            }
        }else if(opIndex['+'] != -1 || opIndex['-'] != -1){
            if(opIndex['-'] == -1 || (opIndex['+'] < opIndex['-']) && opIndex['-'] != -1 && opIndex['+'] != -1){
                operation = '+';
            }else{
                operation = '-';
            }
        }

        if(operation != '') {
            tempObj = paper.text(reg[0].attrs.x, reg[0].attrs.y, operation).attr(tempObjAttr);
            tempObj.animate({x: aluOP.attrs.x, y: aluOP.attrs.y}, 2000, "<>", function () {
                aluOP.attr('text', tempObj.attrs.text);
                this.remove();
                setTimeout(function () {
                    tempObj = reg[op.regs[opIndex[operation] - 1]].clone().attr(tempObjAttr);
                    tempObj.animate({x: aluInput[0].attrs.x, y: aluInput[0].attrs.y}, 2000, "<>", function () {
                        aluInput[0].attr('text', tempObj.attrs.text);
                        this.remove();
                        setTimeout(function () {
                            tempObj = reg[op.regs[opIndex[operation] + 1]].clone().attr(tempObjAttr);
                            tempObj.animate({x: aluInput[1].attrs.x, y: aluInput[1].attrs.y}, 2000, "<>", function () {
                                aluInput[1].attr('text', tempObj.attrs.text);
                                this.remove();
                                setTimeout(function () {
                                    switch(operation){
                                        case '+':
                                            aluOutput.attr('text',(parseFloat(aluInput[0].attrs.text) + parseFloat(aluInput[1].attrs.text)).toString().slice(0,7));
                                            break;
                                        case '-':
                                            aluOutput.attr('text',(parseFloat(aluInput[0].attrs.text) - parseFloat(aluInput[1].attrs.text)).toString().slice(0,7));
                                            break;
                                        case '*':
                                            aluOutput.attr('text',(parseFloat(aluInput[0].attrs.text) * parseFloat(aluInput[1].attrs.text)).toString().slice(0,7));
                                            break;
                                        case '/':
                                            aluOutput.attr('text',(parseFloat(aluInput[0].attrs.text) / parseFloat(aluInput[1].attrs.text)).toString().slice(0,7));
                                            break;
                                    }
                                    setTimeout(function(){
                                        tempObj = aluOutput.clone().attr(tempObjAttr);
                                        tempObj.animate({x: reg[8].attrs.x, y: reg[8].attrs.y}, 2000, "<>", function () {
                                            setTimeout(function () {
                                                reg[8].attr('text', tempObj.attrs.text);
                                                op.elements.splice(opIndex[operation]-1,3,tempObj.attrs.text);
                                                this.remove();
                                                endStep();
                                            }.call(this), 1000)
                                        });
                                    },1000);
                                }, 500);
                            });
                        }, 1000);
                    });
                }, 1000)
            });
        }else if(op.elements.length == 3){
            tempObj = reg[regCount-1].clone().attr(tempObjAttr);
            tempObj.animate({x: reg[8].attrs.x, y: reg[8].attrs.y}, 2000, "<>", function(){
                reg[8].attr('text', tempObj.attrs.text);
                this.remove();
                endStep();
            });
        }
    },
    exp : "The operand values are sent to the Arithmetic Logic Unit for processing and the resultant value is placed in the Accumulator register. If no operation is required, the resultant value is directly sent to the Accumulator."
};

step[5] = {
    func : function(){ // Place resultant value to appropriate memory index
        tempObj = paper.text(reg[0].attrs.x, reg[0].attrs.y, op.elements[0]).attr(tempObjAttr);
        addBus(function(){
            tempObj.remove();
            tempObj = reg[8].clone().attr(tempObjAttr);
            valBusA(function() {
                tempObj.animate({x: mem[op.elements[0]].val.attrs.x, y: mem[op.elements[0]].val.attrs.y}, 1000, "<>", function () {
                    mem[op.elements[0]].val.attr('text', this.attrs.text);
                    this.remove();
                    insIndex++;
                    endStep();
                });
            });
        });
    },
    exp: "The value inside the Accumulator is sent to and written into the memory cell after the target address has been sent."
};