const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end(`
            <h1>Welcome to Home Page!</h1>
            <a href="/about">Go To About Page</a>
        `);
    } else if (req.url === "/about") {
        res.end(`
            <h1>Welcome to About Page!</h1>
            <a href="/">Go To Home Page</a>
        `);
    } else {
        res.end(`
            <h1>Oops Wrong URL!</h1>
            <a href="/">Go To Home Page</a>
            <br/>
            <a href="/about">Go To About Page</a>
        `);
    }
});

server.listen(9093);

// http://localhost:9093/
