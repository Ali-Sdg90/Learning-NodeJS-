const readAllFiles = require("./fs.js");

const createShape = (counter) => {
    let shape = "";

    for (let i = 0; i < counter; i++) {
        for (let j = 0; j < counter - i; j++) {
            shape += " ";
        }
        for (let j = 0; j <= i; j = j + 0.5) {
            shape += "O";
        }
        for (let j = 0; j < counter - i; j++) {
            shape += " ";
        }

        shape += "\n";
    }
    return shape;
};

const triangleMaker = async () => {
    const data = await readAllFiles();
    console.log(">>", data);

    return createShape(data);
};

module.exports = triangleMaker;
