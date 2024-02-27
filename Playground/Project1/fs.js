const fs = require("fs");

let text1 = "";
let text2 = "";

const readFiles = (address) => {
    return new Promise((resolve, reject) => {
        fs.readFile(address, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const readAllFiles = async () => {
    text1 = await readFiles("./texts/text1.txt");
    text2 = await readFiles("./texts/text2.txt");

    console.log("text1", text1);
    console.log("text2", text2);

    fs.writeFile("./texts/result.txt", `${text1}\n${text2}`, "utf8", (err) => {
        if (err) {
            console.log("ERROR >>", err);
        } else {
            console.log("YES!");
        }
    });
};

fs.unlink("./texts/result.txt", (err) => {
    if (err) {
        console.log("ERROR >>", err);
    } else {
        console.log("DELETED!");
    }

    setTimeout(() => {
        readAllFiles();
    }, 1000);
});

// readAllFiles();
