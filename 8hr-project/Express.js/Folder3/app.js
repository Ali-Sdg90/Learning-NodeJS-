const express = require("express");
const path = require("path");
const { products } = require("../data");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"), (err) => {
        if (err) {
            console.log("ERROR >>", err);
        }
    });
});

app.get("/aboutPage", (req, res) => {
    res.sendFile(path.join(__dirname, "/about.html"), (err) => {
        if (err) {
            console.log("ERROR >>", err);
        }
    });
});

app.get("/simpleData", (req, res) => {
    res.json([{ name: "ali" }, { name: "saba" }]);
});

app.get("/realData", (req, res) => {
    // res.json(products);
    const simplifyData = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    });

    res.json(simplifyData);
});

app.get("/realData/:productID", (req, res) => {
    // res.json()

    const selectedProduct = products.find((product) => {
        return product.id === Number(req.params.productID);
    });

    if (selectedProduct) {
        res.json(selectedProduct);
    } else {
        res.status(404).send("Product don't exist!");
    }
});

app.all("*", (req, res) => {
    res.status(404).send("<h1>PAGE NOT FOUND!</h1>");
});

app.listen(9093, () => {
    console.log("App is listening to port 9093");
});
