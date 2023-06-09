
const {Configuration, OpenAIApi} = require("openai");
import * as dotenv from "dotenv";
import * as readline from 'readline';
import {generateTestsForFile} from "./Generator/GenerateTestsForFile";
import {findFile} from "./Generator/FindFile";
import {getCompletions} from "./Generator/Autocomplete/Autocomplete";

dotenv.config({path: __dirname + '/../.env'});

//check that the api key is set
if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    process.exit(1);
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export function initTestAssistant(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        completer: async (line: string) => {
            const completions = await getCompletions(line);
            return [completions, line];
        }
    });


    rl.question('Enter a file name: ', async (inputString: string) => {
        console.log(`You entered: ${inputString}`);

        //get current directory
        const directoryPath = process.cwd();
        //find file in whole directory
        const fileFound = await findFile(directoryPath, inputString);

        console.log(`File found: ${fileFound}`);
        if (fileFound === null) {
            console.log("Sorry, file not found");
            rl.close();
            return;
        }

        // Call the generateTestsForFile function with the specified file path
        generateTestsForFile(fileFound);
        rl.close();
    });
}



