const { writeFile, readFile } = require("fs").promises;

(async () => {
    const text1 = await readFile("./files/File1.txt", "utf8");
    const text2 = await readFile("./files/File2.txt", "utf8");

    await writeFile("./files/File1&2.txt", `${text1}\n${text2}\n`, {
        flag: "a",
    });
})();
