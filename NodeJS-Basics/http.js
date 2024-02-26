const http = require("http");

const fs = require("fs");

const myArray = [1, 2, 3, 4, 5, 6];

// console.log(fs);

let htmlData = "";

fs.readFile("./http.html", "utf8", (err, data) => {
    htmlData = data;
});

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write(htmlData);
        res.write("Hello from http.js component!");
        res.end();
    }
    if (req.url === "/api") {
        res.write(JSON.stringify(myArray));
        res.end();
    }
});

server.listen(9093);

console.log("Listening to port 9093");
