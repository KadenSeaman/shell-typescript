import type { Interface } from 'node:readline';
import {
    Command,
    CommandName,
    CommandType,
    getCommandNameFromString,
} from './command';
import { isDef } from '../validator/core';
import { CommandRegistry } from './commandregistry';
import path from 'node:path';
import { env } from 'node:process';
import { accessSync } from 'node:fs';

export class TypeCommand extends Command {
    public name = CommandName.Type;
    public type = CommandType.BuiltIn;

    public execute(input: string, readline: Interface): void {
        const commandName = getCommandNameFromString(input);
        if (isDef(commandName)) {
            const command = CommandRegistry.get(commandName);
            if (isDef(command)) {
                console.log(`${commandName} is a shell ${command.type}`);
                return;
            }
        }
        const directories = (process.env?.PATH ?? '').split(path.delimiter);
        for (const directory of directories) {
            const fullPath = `${directory}/${commandName}`;
            try {
                accessSync(fullPath);
                console.log(`${commandName} is ${fullPath}`);
            } catch {
                continue;
            }
        }
        console.log(directories);

        console.log(`${input}: not found`);
    }
}
