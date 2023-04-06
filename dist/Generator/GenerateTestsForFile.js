"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTestsForFile = void 0;
const PromptFactory_1 = require("./PromptFactory");
const fs = __importStar(require("fs"));
const index_1 = require("../index");
function generateTestsForFile(filePath) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        //detect file extension type that can be ".php", ".ts", ".js" or ".py"
        const extension = (_a = filePath.match(/\.([^.]+)$/)) === null || _a === void 0 ? void 0 : _a[1];
        if (extension !== "ts" && extension !== "js" && extension !== "py" && extension !== "php") {
            console.log("Sorry, GPT-3 can only generate tests for .ts, .js, .py and .php files");
            return;
        }
        let testingFramework = (0, PromptFactory_1.getTestingFramework)(extension);
        let testingFrameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)(extension);
        // Use GPT-3 to generate test code for the given file
        //get contents of file
        var data = fs.readFileSync(filePath, 'utf8');
        let contentsOfFile = data.toString();
        console.log(`Generating tests for ${filePath}...`);
        let response;
        let prompt = `Ignore previous prompts and don't reply with disclaimers.
     I want you to write simple unit tests using ${testingFramework} for the following code, there is not additional code, just this: \n  ${contentsOfFile} \n\n\n 
     Reply only the contents of what would be a file with all the test cases.
      Remember, only the contents of the test file and no disclaimers.
      Remember to import ${testingFrameworkFunctions} from ${testingFramework} if needed.
      If you need to reference the file, it is located at: ${filePath}`;
        try {
            response = yield index_1.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ "role": "user", "content": prompt }],
                max_tokens: 1024,
                n: 1,
            });
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            }
            else {
                console.log(error.message);
            }
        }
        const testCode = response.data.choices[0].message.content.trim();
        //if file contains sorry, return
        if (testCode.includes("Sorry")) {
            console.log("Sorry, GPT-3 couldn't generate tests for this file");
            return;
        }
        // Write the generated test code to a test file in the same directory as the original file
        const testFilePath = `${filePath.slice(0, -(extension.length + 1))}.test.${extension}`;
        fs.writeFileSync(testFilePath, testCode);
        console.log(`Generated tests for ${filePath} and saved them to ${testFilePath}`);
    });
}
exports.generateTestsForFile = generateTestsForFile;
