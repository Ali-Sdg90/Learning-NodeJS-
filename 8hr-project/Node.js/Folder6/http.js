const http = require("http");
const { createReadStream } = require("fs");

const readFiles = async (path) => {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(path, "utf8");

        let data = "";

        stream.on("data", (chunk) => {
            data += chunk;
        });

        stream.on("close", () => {
            resolve(data);
        });

        stream.on("error", (err) => {
            reject(err);
        });
    });
};

http.createServer(async (req, res) => {
    const url = req.url;

    // Home Page
    if (url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(await readFiles("./home-page.html"));
        res.end();
    } else if (url === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(await readFiles("./about-page.html"));
        res.end();
    } else if (url === "/style.css") {
        res.writeHead(200, { "content-type": "text/css" });
        res.write(await readFiles("./style.css"));
        res.end();
    } else if (url === "/script.js") {
        res.writeHead(200, { "content-type": "text/script" });
        res.write(await readFiles("./script.js"));
        res.end();
    } 
    // else if (url === "/img.png") {
    //     res.writeHead(200, { "content-type": "image/png" });
    //     res.write(await readFiles("./img.png"));
    //     res.end();
    // } 
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.write("Page Not Found");
        res.end();
    }
}).listen(9093);
