const EventEmitter = require("events");

class Calc extends EventEmitter {
    calc = (num1, operation, num2) => {
        const operationString = num1 + operation + num2;

        const result = eval(operationString);

        this.emit("calcValue", {
            result: result,
            operationString: operationString,
        });
    };
}

module.exports = Calc;
