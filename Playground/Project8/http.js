const http = require("http");

const path = require("path");

const express = require("express");

const data = require("./data");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const selectedData = data.find((person) => person.id == +id);
    if (selectedData) {
        res.json(selectedData);
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

app.listen(9093, () => {
    console.log("Listening to port 9093");
});
