const { writeFile } = require("fs").promises;

for (let i = 0; i < 10000; i++) {
    writeFile("./bigFile.txt", `Hello World! ${i}\n`, { encoding: "utf8", flag: "a" });
}
