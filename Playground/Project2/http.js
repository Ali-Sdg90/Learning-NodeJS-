const http = require("http");
const calcFunc = require("./fs.js");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        calcFunc()
            .then((result) => {
                res.write(
                    `<pre style="font-size: 70px; text-align: center;">${result}</pre>`
                );
                console.log(result);
                res.end();
            })
            .catch((err) => console.log("ERROR >>", err));
    }
});

server.listen(9093);

// http://localhost:9093/
