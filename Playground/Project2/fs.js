const fs = require("fs");

const readFiles = (address) => {
    return new Promise((resolve, reject) => {
        fs.readFile(address, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

let func = "";
let values = "";

const calcFunc = async () => {
    func = await readFiles("./files/func.js");
    values = await readFiles("./files/values.txt");

    values = JSON.parse(values);

    func = func.replace(/num1/g, values[0]);
    func = func.replace(/num2/g, values[1]);

    return `\n\nYES WORKS!!1!\n${values[0]} + ${values[1]} = ${eval(func)}`;
};

// calcFunc()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => console.log("ERROR >>", err));

module.exports = calcFunc;
