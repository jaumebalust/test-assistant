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
const Autocomplete_1 = require("./Autocomplete");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('getCompletions', () => {
    (0, vitest_1.it)('should return an empty array when passed an empty string', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, Autocomplete_1.getCompletions)('');
        (0, vitest_1.expect)(result).toEqual([]);
    }));
    (0, vitest_1.it)('should return an array of matching js files in the current directory', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, Autocomplete_1.getCompletions)('Autocomplete');
        (0, vitest_1.expect)(result).toContain('Autocomplete.ts');
    }));
    (0, vitest_1.it)('should not return js files in node_modules directory', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, Autocomplete_1.getCompletions)('node_modules/example');
        (0, vitest_1.expect)(result).not.toContain('example.js');
    }));
});
