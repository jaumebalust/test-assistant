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
exports.initTestAssistant = exports.openai = void 0;
const { Configuration, OpenAIApi } = require("openai");
const dotenv = __importStar(require("dotenv"));
const readline = __importStar(require("readline"));
const GenerateTestsForFile_1 = require("./Generator/GenerateTestsForFile");
const FindFile_1 = require("./Generator/FindFile");
const Autocomplete_1 = require("./Generator/Autocomplete/Autocomplete");
dotenv.config({ path: __dirname + '/../.env' });
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
exports.openai = new OpenAIApi(configuration);
function initTestAssistant() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: (line) => __awaiter(this, void 0, void 0, function* () {
            const completions = yield (0, Autocomplete_1.getCompletions)(line);
            return [completions, line];
        })
    });
    rl.question('Enter a file name: ', (inputString) => __awaiter(this, void 0, void 0, function* () {
        console.log(`You entered: ${inputString}`);
        //get current directory
        const directoryPath = __dirname;
        //find file in whole directory
        const fileFound = yield (0, FindFile_1.findFile)(directoryPath, inputString);
        console.log(`File found: ${fileFound}`);
        if (fileFound === null) {
            console.log("Sorry, file not found");
            return;
        }
        // Call the generateTestsForFile function with the specified file path
        (0, GenerateTestsForFile_1.generateTestsForFile)(fileFound);
        rl.close();
    }));
}
exports.initTestAssistant = initTestAssistant;
