"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const PromptFactory_1 = require("../Generator/PromptFactory");
(0, vitest_1.describe)('getTestingFramework tests', () => {
    (0, vitest_1.it)('should return phpunit when language is php', () => {
        const framework = (0, PromptFactory_1.getTestingFramework)('php');
        (0, vitest_1.expect)(framework).toEqual('phpunit');
    });
    (0, vitest_1.it)('should return vitest when language is ts', () => {
        const framework = (0, PromptFactory_1.getTestingFramework)('ts');
        (0, vitest_1.expect)(framework).toEqual('vitest');
    });
    (0, vitest_1.it)('should return vitest when language is js', () => {
        const framework = (0, PromptFactory_1.getTestingFramework)('js');
        (0, vitest_1.expect)(framework).toEqual('vitest');
    });
    (0, vitest_1.it)('should return pytest when language is py', () => {
        const framework = (0, PromptFactory_1.getTestingFramework)('py');
        (0, vitest_1.expect)(framework).toEqual('pytest');
    });
    (0, vitest_1.it)('should return undefined when language is not recognized', () => {
        const framework = (0, PromptFactory_1.getTestingFramework)('invalid');
        (0, vitest_1.expect)(framework).toEqual(undefined);
    });
});
(0, vitest_1.describe)('getTestingFrameworkFunctions tests', () => {
    (0, vitest_1.it)('should return expect, it, describe when language is ts', () => {
        const frameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)('ts');
        (0, vitest_1.expect)(frameworkFunctions).toEqual('expect, it, describe');
    });
    (0, vitest_1.it)('should return expect, it, describe when language is js', () => {
        const frameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)('js');
        (0, vitest_1.expect)(frameworkFunctions).toEqual('expect, it, describe');
    });
    (0, vitest_1.it)('should return assert when language is php', () => {
        const frameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)('php');
        (0, vitest_1.expect)(frameworkFunctions).toEqual('assert');
    });
    (0, vitest_1.it)('should return assert when language is py', () => {
        const frameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)('py');
        (0, vitest_1.expect)(frameworkFunctions).toEqual('assert');
    });
    (0, vitest_1.it)('should return undefined when language is not recognized', () => {
        const frameworkFunctions = (0, PromptFactory_1.getTestingFrameworkFunctions)('invalid');
        (0, vitest_1.expect)(frameworkFunctions).toEqual(undefined);
    });
});
