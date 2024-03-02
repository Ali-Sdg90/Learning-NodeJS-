const { createReadStream } = require("fs");

const stream = createReadStream("./bigFile.txt", { highWaterMark: 9093 });

stream.on("data", (data) => {
    console.log(data);
});

stream.on("error", (err) => {
    console.log(err);
});
