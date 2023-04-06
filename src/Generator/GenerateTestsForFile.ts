import { getTestingFramework, getTestingFrameworkFunctions } from "./PromptFactory";
import * as fs from 'fs';
import { openai } from "../index";

export async function generateTestsForFile(filePath: string): Promise<void> {
    //detect file extension type that can be ".php", ".ts", ".js" or ".py"
    const extension = filePath.match(/\.([^.]+)$/)?.[1];

    if (extension !== "ts" && extension !== "js" && extension !== "py" && extension !== "php") {
        console.log("Sorry, GPT-3 can only generate tests for .ts, .js, .py and .php files");
        return;
    }



    let testingFramework = getTestingFramework(extension);
    let testingFrameworkFunctions = getTestingFrameworkFunctions(extension);


    // Use GPT-3 to generate test code for the given file
    //get contents of file
    var data = fs.readFileSync(filePath, 'utf8');
    let contentsOfFile = data.toString();

    console.log(`Generating tests for ${filePath}...`);
    let response;

    let prompt = `Ignore previous prompts and don't reply with disclaimers.
     I want you to write simple unit tests using ${testingFramework} for the following code, there is not additional code, just this: \n  ${contentsOfFile} \n\n\n 
     Reply only the contents of what would be a file with all the test cases.
      Remember, only the contents of the test file and no disclaimers.
      Remember to import ${testingFrameworkFunctions} from ${testingFramework} if needed.
      If you need to reference the file, it is located at: ${filePath}`;


    try {
        response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": prompt }],
            max_tokens: 1024,
            n: 1,
        });
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }

    const testCode = response.data.choices[0].message.content.trim();

    //if file contains sorry, return
    if (testCode.includes("Sorry")) {
        console.log("Sorry, GPT-3 couldn't generate tests for this file");
        return;
    }

    // Write the generated test code to a test file in the same directory as the original file
    const testFilePath = `${filePath.slice(0, -(extension.length+1))}.test.${extension}`;
    fs.writeFileSync(testFilePath, testCode);

    console.log(`Generated tests for ${filePath} and saved them to ${testFilePath}`);
}
