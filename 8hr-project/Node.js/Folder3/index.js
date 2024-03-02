const { writeFile, readFile } = require("fs");

const readFiles = (path) => {
    return new Promise((resolve, rejects) => {
        readFile(path, "utf8", (err, data) => {
            if (err) {
                rejects(err);
            } else if (data) {
                resolve(data);
            }
        });
    });
};

(async () => {
    file1 = await readFiles("./files/File1.txt");
    file2 = await readFiles("./files/File2.txt");

    writeFile("./files/File1&2.txt", `${file1}\n${file2}\n`, "utf8", (err) => {
        if (err) {
            console.log("ERROR >>", err);
        }
    });
})();
