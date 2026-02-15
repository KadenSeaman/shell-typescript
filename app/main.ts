import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum Commands {
  Exit = "exit",
}

const prompt = () => {
  rl.question("$ ", (answer) => {
    if (answer === Commands.Exit) {
      rl.close();
      return;
    }
    console.log(answer + ": command not found");
    prompt();
  });
};
prompt();
