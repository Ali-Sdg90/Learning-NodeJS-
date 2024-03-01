const incomeData = require("./fs");
const http = require("http");

http.createServer(async (req, res) => {
    if (req.url === "/") {
        const showData = await incomeData();

        console.log(showData);

        showData.forEach((row) => {
            res.write(
                `<pre style="font-size: 30px; text-align: center">${row}</pre>`
            );
        });
        res.end();
    }
}).listen(9093, () => {
    console.log("LISTEN TO PORT 9093!");
});
