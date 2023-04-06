"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestingFrameworkFunctions = exports.getTestingFramework = void 0;
function getTestingFramework(language) {
    if (language === "php") {
        return "phpunit";
    }
    else if (language === "ts" || language === "js") {
        return "vitest";
    }
    else if (language === "py") {
        return "pytest";
    }
}
exports.getTestingFramework = getTestingFramework;
function getTestingFrameworkFunctions(language) {
    if (language === "ts" || language === "js") {
        return "expect, it, describe";
    }
    else if (language === "php") {
        return "assert";
    }
    else if (language === "py") {
        return "assert";
    }
}
exports.getTestingFrameworkFunctions = getTestingFrameworkFunctions;
