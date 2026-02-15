import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum Commands {
  Exit = "exit",
  Echo = "echo",
}

const prompt = () => {
  rl.question("$ ", (answer) => {
    const command = answer.split(" ")[0];
    console.log(answer.split(" "));
    if (command === undefined) {
      console.log(answer + ": command not found");
    }

    switch (command) {
      case Commands.Exit: {
        rl.close();
        return;
      }
      case Commands.Echo: {
        const content = answer.substring(5);
        console.log(content);
        break;
      }
      default: {
        console.log(answer + ": command not found");
      }
    }
    prompt();
  });
};
prompt();
