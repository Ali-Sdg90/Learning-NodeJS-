const { readFile } = require("fs");
const http = require("http");

const readBigFile = () => {
    return new Promise((resolve, reject) => {
        readFile("./bigFile.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            if (data) {
                resolve(data);
            }
        });
    });
};

http.createServer(async (req, res) => {
    if (req.url === "/") {
        try {
            res.end(await readBigFile());
        } catch (error) {
            res.end(error);
        }
    }
}).listen(9093, () => {
    console.log("Listening to Port 9093");
});
