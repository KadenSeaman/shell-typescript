import { createInterface } from 'readline';
import { isCommandName } from './command/command';
import { isDef } from './validator/core';
import { CommandRegistry } from './command/commandregistry';
import { findPathCommand } from './util';
import { execSync } from 'child_process';
import { ShellParser } from './parser/parser';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let isReadlineClosed = false;
readline.on('close', () => {
    isReadlineClosed = true;
});

const shellParser = new ShellParser();

const handleCommand = (input: string): void => {
    const args = shellParser.parseInput(input);
    console.log(args);

    const commandName = args[0];
    if (!isDef(commandName)) {
        console.log(`${input}: command not found`);
        return;
    }
    const commandArgs = args.slice(1);
    const stringArgs = commandArgs.join(' ');

    if (isCommandName(commandName)) {
        const command = CommandRegistry.get(commandName);
        if (isDef(command)) {
            command.execute(stringArgs, readline);
            return;
        }
    }

    const fullPath = findPathCommand(commandName);
    if (isDef(fullPath)) {
        execSync(`${commandName} ${commandArgs}`, { stdio: 'inherit' });
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
