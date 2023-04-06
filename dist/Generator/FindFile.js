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
exports.findFile = void 0;
const fs = __importStar(require("fs"));
function findFile(directoryPath, fileName, subDirectory = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs.promises.readdir(directoryPath);
        const fileFound = files.find(file => file === fileName);
        if (fileFound && subDirectory) {
            return fileFound;
        }
        if (fileFound) {
            return `${directoryPath}/${fileFound}`;
        }
        for (const file of files) {
            const filePath = `${directoryPath}/${file}`;
            const fileStat = yield fs.promises.stat(filePath);
            if (fileStat.isDirectory()) {
                const subFileFound = yield findFile(filePath, fileName, true);
                if (subFileFound && subDirectory) {
                    return `${file}/${subFileFound}`;
                }
                if (subFileFound) {
                    return `${filePath}/${subFileFound}`;
                }
            }
        }
        return null;
    });
}
exports.findFile = findFile;
