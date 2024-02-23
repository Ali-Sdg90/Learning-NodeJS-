const Logger = require("./logger");

const logger = new Logger();

logger.on("logValue", (arg) => {
    console.log("YES IT LOGGED " + arg);
});

logger.log("hiii");
