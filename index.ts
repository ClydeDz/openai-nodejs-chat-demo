import { AzureOpenAI } from "openai";
import * as readline from "readline";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Hello world");

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
  const apiKey = process.env.AZURE_OPENAI_API_KEY!;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;

  console.log(endpoint);

  const openaiClient = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  const messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [
    {
      role: "system",
      content:
        "You are a helpful assistant that only responds in one-line poetry.",
    },
  ];

  const readlineClient = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> You: ",
  });

  readlineClient.prompt();

  readlineClient.on("line", async (userMessage) => {
    messages.push({ role: "user", content: userMessage });

    const openaiResponse = await openaiClient.chat.completions.create({
      model: deployment,
      messages: messages,
      max_completion_tokens: 1000,
    });

    const botResponse =
      openaiResponse.choices[0]?.message?.content || "No response";

    messages.push({ role: "assistant", content: botResponse });

    console.log("Bot:", botResponse);

    readlineClient.prompt();
  });

  readlineClient.on("close", () => {
    console.log("Bye");
    process.exit(0);
  });
}

main();
