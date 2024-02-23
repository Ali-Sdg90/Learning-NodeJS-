const Logger = require("./logger");

const logger = new Logger();

logger.on("logMessage", (arg) => {
    console.log("EVENT => ", arg);
});

logger.log("hi");

console.log("hi");

