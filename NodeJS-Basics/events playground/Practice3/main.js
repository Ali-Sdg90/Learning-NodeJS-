const Calc = require("./calc");

const calc = new Calc();

calc.on("calcValue", (arg) => {
    // console.log(arg);
    
    const output1 = arg.operationString + "=" + arg.result;
    const output2 = output1.split("");
    const output3 = output2.map((el) => " " + el);
    const output4 = output3.join("");

    console.log(output4);
});

calc.calc(3, "+", 5);
