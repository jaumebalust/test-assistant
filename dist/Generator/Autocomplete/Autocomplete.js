"use strict";
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
exports.getCompletions = void 0;
const glob_1 = require("glob");
function getCompletions(line) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (line === '') {
                resolve([]);
            }
            const lastSpaceIndex = line.lastIndexOf(' ');
            const directoryPath = lastSpaceIndex === -1 ? '.' : line.slice(0, lastSpaceIndex);
            // all js files, but don't look in node_modules
            const jsfiles = (0, glob_1.globSync)(`${directoryPath}/**/*`, { ignore: 'node_modules/**' });
            //get last part of the path
            const lastParts = jsfiles.map((file) => file.split('/').pop());
            //filter out all files that don't match the last part of the path
            const filtered = lastParts.filter((file) => {
                if (file && file.indexOf(line) === 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if (!filtered) {
                resolve([]);
            }
            if (filtered && filtered.length === 0) {
                resolve([]);
            }
            // @ts-ignore
            resolve(filtered);
        });
    });
}
exports.getCompletions = getCompletions;
