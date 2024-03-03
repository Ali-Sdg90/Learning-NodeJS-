const express = require("express");
const path = require("path");
const app = express();

// http://localhost:9093/

app.listen(9093, () => {
    console.log("App is listening to port 9093");
});

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./html/index.html"));
});

app.all("*", (req, res) => {
    res.status(404).send("not found");
});

// app.get("/", (req, res) => {
//     console.log("Some resource has been called");
//     res.status(200).send("Home Page");
// });

// app.get("/about", (req, res) => {
//     res.status(200).send("About page");
// });

// app.get("/content", (req, res) => {
//     res.status(200).send("Content page");
// });

// app.all("*", (req, res) => {
//     res.status(404).send("<h1>Page Not Found</h1>");
// });
