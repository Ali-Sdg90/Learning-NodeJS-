const EventEmitter = require("events");

class Calc extends EventEmitter {
    calculate = (value) => {
        this.emit("hi", { id: Math.floor(Math.random() * 10), value: value });
    };
}

module.exports = Calc;
