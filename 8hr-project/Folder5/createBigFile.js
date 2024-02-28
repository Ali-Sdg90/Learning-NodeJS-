const { createWriteStream } = require("fs");

const writeStream = createWriteStream("./bigFile.txt", { flags: "a" });

for (let j = 0; j <= 1000; j++) {
    writeStream.write(`Aloha ${j}\n`, "utf8");
}

writeStream.end();
