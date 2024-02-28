const { createReadStream } = require("fs");

const stream = createReadStream("./config.json", "utf8");

const readConfig = async () => {
    return new Promise((resolve, rejects) => {
        let data = "";

        stream.on("data", (chunk) => {
            data += chunk;
        });

        stream.on("end", () => {
            resolve(JSON.parse(data));
        });

        stream.on("error", (err) => {
            rejects(err);
        });
    });
};

const createRow = async () => {
    const configData = await readConfig();

    const rowLength = configData.charsInRow;

    // console.log(rowLength);

    const dots = Math.floor(Math.random() * rowLength);
    const rightWhiteSpace = Math.floor(Math.random() * (rowLength - dots));

    let row = "";

    for (let i = 0; i < rightWhiteSpace; i++) {
        row += "-";
    }
    for (let i = 0; i < dots; i++) {
        row += "=";
    }
    for (let i = 0; i < rowLength - rightWhiteSpace - dots; i++) {
        row += "-";
    }

    console.log(row);
    return row;
};

// console.log(createRow());

module.exports = createRow;
