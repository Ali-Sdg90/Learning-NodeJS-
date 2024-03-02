const http = require("http");

const { createReadStream } = require("fs");

http.createServer((req, res) => {
    if (req.url === "/") {
        try {
            const stream = createReadStream("./bigFile.txt", {
                highWaterMark: 8,
                encoding: "utf8",
            });

            stream
                .on("data", (data) => {
                    res.write(data);
                    res.write("\n-------------------\n\n");
                })
                .then(() => {
                    res.end();
                });
        } catch (err) {
            console.log("ERROR >>", err);
        }
    }
}).listen(9093, () => {
    console.log("Server listen to Port 9093");
});
