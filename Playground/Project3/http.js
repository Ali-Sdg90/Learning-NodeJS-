const http = require("http");
const triangleMaker = require("./func");
const fs = require("fs");

const showTriangle = (triangle) => {
    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            res.write(
                `<pre style="font-size: 50px; text-align: center;">\n${triangle}</pre>`
            );
            res.end();
        }
    });
    server.listen(9093);
};

(async () => {
    const triangle = await triangleMaker();

    showTriangle(triangle);

    fs.writeFile("./triangle.md", triangle, "utf8", (err) => {
        if (err) {
            console.log("ERROR >>", err);
        }
    });
})();

// http://localhost:9093/
