const express = require("express");
const app = express();

const data = require("../data");
// const dataJSON = JSON.parse(data);

app.get("/", (req, res) => {
    res.send(
        "<a href='http://localhost:9093/api/v1/query?search=sofa&limit=2'>CLICK ME!</a>"
    );
});

app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;

    let output = data;

    if (search) {
        const searchedData = [];

        data.products.map((obj) => {
            const stringObj = JSON.stringify(obj);
            if (stringObj.includes(search)) {
                searchedData.push(obj);
            }
        });

        output = searchedData;
    }

    if (limit) {
        const limitedData = output.slice(0, limit);
        output = limitedData;
    }

    res.send(output);
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>PAGE NOT FOUND!</h1>");
});

app.listen(9093, () => {
    console.log("LOP9093");
});

// http://localhost:9093/api/v1/query?search=sofa&limit=2
