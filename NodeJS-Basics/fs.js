const fs = require("fs");

// console.log(fs);

fs.readFile("./fs-test.txt", "utf8", (err, data) => {
    if (err) {
        console.log("ERROR =>", err);
    } else if (data) {
        console.log("Data =>", data);
    }
});

// various tasks can perform using the fs module in Node.js:
//
// 01. Read data from files
// 02. Write data to files
// 03. Append data to files
// 04. Delete files
// 05. Check if a file exists
// 06. Create directories
// 07. Rename files
// 08. Remove directories
// 09. Read directory contents
// 10. Get file information (metadata)
// 11. Watch for file system changes (using `fs.watch()` or `fs.watchFile()`)
// 12. Read and write streams of data to files
// 13. Change file permissions
// 14. Create symbolic links
// 15. Read and write binary data to files
// 16. Traverse file system paths
// 17. Check file accessibility and permissions
