import glob, {globSync} from 'glob';

export async function getCompletions(line: string): Promise<string[]> {
    return new Promise( (resolve, reject) => {

        if (line === '') {
            resolve([]);
        }
        const lastSpaceIndex = line.lastIndexOf(' ');
        const directoryPath = lastSpaceIndex === -1 ? '.' : line.slice(0, lastSpaceIndex);

// all js files, but don't look in node_modules
        const jsfiles = globSync(`${directoryPath}/**/*`, {ignore: 'node_modules/**'})

        //get last part of the path
        const lastParts = jsfiles.map((file) => file.split('/').pop());

        //filter out all files that don't match the last part of the path
        const filtered = lastParts.filter((file) => {
            if (file && file.indexOf(line) === 0) {
                return true;
            } else {
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
}
