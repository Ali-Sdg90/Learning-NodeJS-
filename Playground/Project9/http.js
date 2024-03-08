const express = require("express");
const app = express();
const data = require("./data");

app.get("/", (req, res) => {
    const output = traverseObject(data);
    res.json(output);
});

function traverseObject(obj, depth = 0) {
    let output = [];
    const keys = Object.keys(obj);

    keys.forEach((key) => {
        output.push(key);
        if (typeof obj[key] === "object") {
            output.push("--------------------");
            output = output.concat(traverseObject(obj[key], depth + 1));
        }
    });

    return output;
}

app.listen(9093, () => {
    console.log("Listening on port 9093");
});
