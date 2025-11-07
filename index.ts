import * as readline from "readline";

function main() {
  console.log("Hello world");

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
