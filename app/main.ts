import { createInterface } from 'readline';
import { getCommandNameFromString, isCommandName } from './command/command';
import { isDef } from './validator/core';
import { CommandRegistry } from './command/commandregistry';
import { findPathCommand } from './util';
import { fork } from 'child_process';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let isReadlineClosed = false;
readline.on('close', () => {
    isReadlineClosed = true;
});

const handleCommand = (input: string): void => {
    const splitInput = input.split(' ');
    const commandName = getCommandNameFromString(input);
    if (!isDef(commandName)) {
        console.log(`${input}: command not found`);
        return;
    }
    const commandArgs = splitInput.slice(1).join(' ');

    if (isCommandName(commandName)) {
        const command = CommandRegistry.get(commandName);
        if (isDef(command)) {
            command.execute(commandArgs, readline);
            return;
        }
    }

    const fullPath = findPathCommand(commandName);
    if (isDef(fullPath)) {
        fork(`${fullPath} ${commandArgs}`);
        return;
    }

    console.log(`${input}: command not found`);
};

const prompt = () => {
    if (isReadlineClosed) {
        return;
    }
    readline.question('$ ', (answer) => {
        handleCommand(answer);
        prompt();
    });
};
prompt();
