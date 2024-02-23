console.log("__filename =>", __filename);
console.log("__dirname =>", __dirname);

const logger = (message) => {
    console.log(`Hello ${message}`);
};

const myName = "Ali";

module.exports = { myName, logger };

// console.log(module);
