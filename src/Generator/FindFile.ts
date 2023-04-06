import * as fs from 'fs';
export async function findFile(directoryPath: string, fileName: string,subDirectory = false): Promise<string | null> {
    const files = await fs.promises.readdir(directoryPath);

    const fileFound = files.find(file => file === fileName);

    if (fileFound && subDirectory) {
        return fileFound;
    }
    if (fileFound) {
        return `${directoryPath}/${fileFound}`;
    }

    for (const file of files) {
        const filePath = `${directoryPath}/${file}`;
        const fileStat = await fs.promises.stat(filePath);

        if (fileStat.isDirectory()) {
            const subFileFound = await findFile(filePath, fileName,true);
            if (subFileFound && subDirectory) {
                return `${file}/${subFileFound}`;
            }
            if (subFileFound) {
                return `${filePath}/${subFileFound}`;
            }
        }
    }

    return null;
}