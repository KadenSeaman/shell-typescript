import { createInterface } from 'readline';
import { getCommandNameFromString } from './command/command';
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
    const commandParameters = splitInput.slice(1).join(' ');

    if (isDef(commandName)) {
        const command = CommandRegistry.get(commandName);
        if (isDef(command)) {
            command.execute(commandParameters, readline);
            return;
        }
    }

    const fullPath = findPathCommand(input);
    if (isDef(fullPath)) {
        console.log('ffff');
        // fork(fullPath, )
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
