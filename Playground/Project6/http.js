const http = require("http");

const fs = require("fs").promises;

http.createServer(async (req, res) => {
    const url = req.url;
    if (url === "/") {
        res.write(await fs.readFile("./home-page.html", "utf8"));
        res.end();
    } else if (url === "/about") {
        res.write(await fs.readFile("./about-page.html", "utf8"));
        res.end();
    } else if (url === "/style.css") {
        res.write(await fs.readFile("./style.css", "utf8"));
        res.end();
    } else if (url === "/script.js") {
        res.write(await fs.readFile("./script.js", "utf8"));
        res.end();
    } else if (url === "/img.png") {
        res.write(await fs.readFile("./img.png"));
        res.end();
    } else {
        res.write("Page Not Found");
        res.end();
    }
}).listen(9093);
