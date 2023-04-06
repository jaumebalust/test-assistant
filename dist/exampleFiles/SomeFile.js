"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldGreet = void 0;
function shouldGreet(name) {
    if (!name)
        throw new Error("No name provided");
    if (typeof name !== "string")
        throw new Error("Name must be a string");
    return "Hello " + name + "!";
}
exports.shouldGreet = shouldGreet;
