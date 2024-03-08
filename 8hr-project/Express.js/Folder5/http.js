const express = require("express");

const path = require("path");

const app = express();

app.use(express.static("./public"));

const middleware = require("./public/logger");
const logApi = require("./public/logApi");

app.get("/", middleware, (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/Page1", middleware, (req, res) => {
    res.send("Welcome to Page1");
});

app.get("/Page2", middleware, (req, res) => {
    res.send("Welcome to Page2");
});

app.get("/Page3", middleware, (req, res) => {
    res.send("Welcome to Page3");
});

app.use(middleware);
app.use("/api", logApi);

app.get("/Page4", (req, res) => {
    res.send("Welcome to Page2");
});

app.get("/Page5", (req, res) => {
    res.send("Welcome to Page3");
});

app.get("/api/number1", (req, res) => {
    res.send("Welcome to API-1");
});

app.get("/api/number2", (req, res) => {
    res.send("Welcome to API-2");
});

app.get("/api/number3", (req, res) => {
    res.send("Welcome to API-3");
});

app.listen(9093, () => {
    console.log("A is L to P 9093");
});
