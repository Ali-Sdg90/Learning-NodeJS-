const express = require("express");
const path = require("path");
const app = express();

// http://localhost:9093/

app.listen(9093, () => {
    console.log("App is listening to port 9093");
});

app.use(express.static("./public"));
