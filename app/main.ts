import { createInterface } from 'readline';
import { getCommandNameFromString } from './command/command';
import { isDef } from './validator/core';
import { CommandRegistry } from './command/commandregistry';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const handleCommand = (input: string): void => {
    const splitInput = input.split(' ');
    const commandName = getCommandNameFromString(input);
    const commandParameters = splitInput.slice(1).join(' ');

    if (!isDef(commandName)) {
        console.log(`${input}: command not found`);
        return;
    }
    const command = CommandRegistry.get(commandName);
    if (!isDef(command)) {
        console.log(`${commandName} is not registered`);
        return;
    }
    command.execute(commandParameters, readline);
};

const prompt = () => {
    readline.question('$ ', (answer) => {
        handleCommand(answer);
        prompt();
    });
};
prompt();
