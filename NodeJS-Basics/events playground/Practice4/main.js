const CALC = require("./calc");

const calc = new CALC();

calc.on("hi", (arg) => {
    console.log(`${arg.id}-${arg.value}`);
});

calc.calculate("Aloha");
