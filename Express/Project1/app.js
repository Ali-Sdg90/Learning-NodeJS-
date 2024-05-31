const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/about", (req, res) => {
    res.send("About Page!");
});

const port = 9093;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
