const EventEmitter = require("events");

class Logger extends EventEmitter {
    log = (message) => {
        console.log(message);

        this.emit("logMessage", message);
    };
}

module.exports = Logger;
