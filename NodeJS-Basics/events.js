// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// emitter.on("logEvent", () => {
//     console.log("LOG THE EVENT!");
// });

// emitter.emit("logEvent");

// ----------------

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("getData", (arg) => {
    console.log(arg.data.name, arg.data.age);
});

emitter.emit("getData", { id: 0, data: { name: "ali", age: 22 } });
