const http = require("http");
const triangleMaker = require("./func");

const showTriangle = (triangle) => {
    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            res.write(
                `<pre style="font-size: 70px; text-align: center;">${triangle}</pre>`
            );
            res.end();
        }
    });
    server.listen(9093);
};

(async () => {
    const triangle = await triangleMaker();

    showTriangle(triangle);
})();

// http://localhost:9093/
