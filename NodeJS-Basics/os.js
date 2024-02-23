const os = require("os");

// console.clear();
console.log("arch >>", os.arch());
console.log("cpus >>", os.cpus());
console.log("endianness >>", os.endianness());
console.log("freemem >>", os.freemem());
console.log("homedir >>", os.homedir());
console.log("hostname >>", os.hostname());
console.log("loadavg >>", os.loadavg());
console.log("networkInterfaces >>", os.networkInterfaces());
console.log("platform >>", os.platform());
console.log("release >>", os.release());
console.log("tmpdir >>", os.tmpdir());
console.log("totalmem >>", os.totalmem());
console.log("type >>", os.type());
console.log("uptime >>", os.uptime());
console.log("userInfo >>", os.userInfo());
// console.log("constants >>", os.constants);

console.log("-----Methods-----");
console.log("arch() >>", os.arch());
console.log("cpus() >>", os.cpus());
console.log("endianness() >>", os.endianness());
console.log("freemem() >>", os.freemem());
// Note: getPriority() and setPriority() are methods but require additional parameters
console.log("hostname() >>", os.hostname());
console.log("loadavg() >>", os.loadavg());
console.log("networkInterfaces() >>", os.networkInterfaces());
console.log("platform() >>", os.platform());
console.log("release() >>", os.release());
// Note: setPriority() is a method but requires additional parameters
console.log("tmpdir() >>", os.tmpdir());
console.log("totalmem() >>", os.totalmem());
console.log("type() >>", os.type());
console.log("uptime() >>", os.uptime());
// Note: userInfo() is a method but requires additional parameters
// console.log("constants() >>", os.constants());
