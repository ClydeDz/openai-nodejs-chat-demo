import { AzureOpenAI } from "openai";
import * as readline from "readline";

function main() {
  console.log("Hello world");

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
  const apiKey = process.env.AZURE_OPENAI_API_KEY!;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;

  const openaiClient = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  const readlineClient = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> You: ",
  });

  readlineClient.prompt();

  readlineClient.on("line", async (userMessage) => {
    console.log("Received:", userMessage);
    readlineClient.prompt();
  });

  readlineClient.on("close", () => {
    console.log("Bye");
    process.exit(0);
  });
}

main();
