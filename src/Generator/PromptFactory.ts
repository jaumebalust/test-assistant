export function getTestingFramework(language:string){
    if (language === "php") {
        return "phpunit";
    } else if (language === "ts" || language === "js") {
        return "vitest";
    } else if (language === "py") {
        return "pytest";
    }
}

export function getTestingFrameworkFunctions(language:string){
    if (language === "ts" || language === "js") {
        return "expect, it, describe";
    } else if (language === "php") {
        return "assert";
    } else if (language === "py") {
        return "assert";
    }
}
