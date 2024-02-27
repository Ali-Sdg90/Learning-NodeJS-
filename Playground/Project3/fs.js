const fs = require("fs");

const readCounter = async () => {
    return await new Promise((resolve, rejects) => {
        fs.readFile("./counter.txt", "utf8", (err, data) => {
            if (err) {
                console.log("ERROR >>", err);
                rejects(err);
            } else {
                console.log("DATA >>", data);
                resolve(data);
            }
        });
    });
};

module.exports = readCounter;
