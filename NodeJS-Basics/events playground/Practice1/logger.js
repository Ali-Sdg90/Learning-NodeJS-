const EventEmitter = require("events");

class Logger extends EventEmitter {
    log = (value) => {
        console.log(value);

        this.emit("logValue", value);
    };
}

module.exports = Logger;
