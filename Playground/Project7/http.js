const express = require("express");
const path = require("path");

const { readFile } = require("fs").promises;

const app = express();

const readJSONFile = async () => {
    try {
        const jsonFile = await readFile("./data.json", { encoding: "utf8" });
        console.log(jsonFile);
        return jsonFile;
    } catch (err) {
        throw err;
    }
};

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"), (err) => {
        err && console.log("ERROR >>", err);
    });
});

app.get("/about/:aboutID", (req, res) => {
    console.log(req.params.aboutID);

    res.sendFile(path.join(__dirname, "about.html"), (err) => {
        err && console.log("ERROR >>", err);
    });
});

app.get("/jsonData", async (req, res) => {
    try {
        res.json(await readJSONFile());
    } catch (err) {
        console.log("ERROR >>", err);
        res.status(404).send("FILE NOT FOUND!");
    }
});

app.listen(9093, () => {
    console.log("APP IS LISTEN TO PORT 9093");
});

app.all("*", (req, res) => {
    res.send("<h1>Page Not Found!</h1>");
});
