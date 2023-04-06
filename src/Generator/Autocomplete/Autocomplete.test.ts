import { getCompletions } from './Autocomplete';
import {describe,it,expect} from 'vitest';
describe('getCompletions', () => {
  it('should return an empty array when passed an empty string', async () => {
    const result = await getCompletions('');
    expect(result).toEqual([]);
  });

  it('should return an array of matching js files in the current directory', async () => {
    const result = await getCompletions('Autocomplete');
    expect(result).toContain('Autocomplete.ts');
  });

  it('should not return js files in node_modules directory', async () => {
    const result = await getCompletions('node_modules/example');
    expect(result).not.toContain('example.js');
  });

});
