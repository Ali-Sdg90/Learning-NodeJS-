const createRow = require("./createRowFunc.js");

const { createWriteStream, createReadStream } = require("fs");

const configJSON = createReadStream("./config.json", "utf8");

const readConfig = new Promise((resolve, rejects) => {
    let data = "";

    configJSON.on("data", (chunk) => {
        data += chunk;
    });

    configJSON.on("end", () => {
        resolve(JSON.parse(data));
    });

    configJSON.on("error", (err) => {
        rejects(err);
    });
});

const stream = createWriteStream("./bigText.txt", "utf8");

(async () => {
    const readConfigObj = await readConfig;

    const rowNumber = readConfigObj.numberOfRows;

    // console.log(rowNumber);

    // Create an array of promises using Array.from()
    const rowPromises = Array.from({ length: rowNumber }, createRow);

    // console.log(rowPromises);

    // Await all the promises together
    const rows = await Promise.all(rowPromises);

    // Write each row to the stream
    rows.forEach((row) => {
        stream.write(row);
        stream.write("\n");
    });

    stream.end();
})();
