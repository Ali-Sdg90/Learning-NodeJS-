const { createReadStream } = require("fs");

const readConfig = async () => {
    return new Promise((resolve, rejects) => {
        const stream = createReadStream("./config.json");

        let data = "";

        stream.on("data", (chunk) => {
            data += chunk;
        });

        stream.on("end", () => {
            resolve(data);
        });

        stream.on("error", (err) => {
            rejects(err);
        });
    });
};

async function getStream() {
    const config = await readConfig();
    const configJSON = JSON.parse(config);

    const streamOptions = {
        highWaterMark: Number(configJSON.charsInRow) + 1,
        encoding: "utf8",
    };

    // console.log(config);

    return createReadStream("./bigText.txt", streamOptions);
}

const sendData = async () => {
    return new Promise(async (resolve, rejects) => {
        data = [];

        const stream = await getStream();

        stream.on("data", (chunk) => {
            data.push(chunk);
        });

        stream.on("end", () => {
            resolve(data);
        });

        stream.on("error", (err) => {
            rejects(err);
        });
    });
};

module.exports = sendData;
