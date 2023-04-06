import { expect, it, describe } from 'vitest';
import { getTestingFramework, getTestingFrameworkFunctions } from '../Generator/PromptFactory';

describe('getTestingFramework tests', () => {
  it('should return phpunit when language is php', () => {
    const framework = getTestingFramework('php');
    expect(framework).toEqual('phpunit');
  });

  it('should return vitest when language is ts', () => {
    const framework = getTestingFramework('ts');
    expect(framework).toEqual('vitest');
  });

  it('should return vitest when language is js', () => {
    const framework = getTestingFramework('js');
    expect(framework).toEqual('vitest');
  });

  it('should return pytest when language is py', () => {
    const framework = getTestingFramework('py');
    expect(framework).toEqual('pytest');
  });

  it('should return undefined when language is not recognized', () => {
    const framework = getTestingFramework('invalid');
    expect(framework).toEqual(undefined);
  });
});

describe('getTestingFrameworkFunctions tests', () => {
  it('should return expect, it, describe when language is ts', () => {
    const frameworkFunctions = getTestingFrameworkFunctions('ts');
    expect(frameworkFunctions).toEqual('expect, it, describe');
  });

  it('should return expect, it, describe when language is js', () => {
    const frameworkFunctions = getTestingFrameworkFunctions('js');
    expect(frameworkFunctions).toEqual('expect, it, describe');
  });

  it('should return assert when language is php', () => {
    const frameworkFunctions = getTestingFrameworkFunctions('php');
    expect(frameworkFunctions).toEqual('assert');
  });

  it('should return assert when language is py', () => {
    const frameworkFunctions = getTestingFrameworkFunctions('py');
    expect(frameworkFunctions).toEqual('assert');
  });

  it('should return undefined when language is not recognized', () => {
    const frameworkFunctions = getTestingFrameworkFunctions('invalid');
    expect(frameworkFunctions).toEqual(undefined);
  });
});