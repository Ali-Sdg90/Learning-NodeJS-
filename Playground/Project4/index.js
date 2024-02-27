const { readFile, writeFile } = require("fs").promises;
const sum = require("./func");

(async () => {
    const value1 = JSON.parse(await readFile("./value1.txt", "utf8"));
    const value2 = JSON.parse(await readFile("./value2.txt", "utf8"));

    const output = [];

    for (let i = 0; i < 2; i++) {
        output[i] = sum(value1[i], value2[i]);
    }

    writeFile("./values-sum.txt", JSON.stringify(output), "utf8");
})();
