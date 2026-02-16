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
import { accessSync, constants } from 'node:fs';

export class TypeCommand extends Command {
    public name = CommandName.Type;
    public type = CommandType.BuiltIn;

    public execute(input: string, _: Interface): void {
        const commandName = getCommandNameFromString(input);
        if (isDef(commandName)) {
            const command = CommandRegistry.get(commandName);
            if (isDef(command)) {
                console.log(`${commandName} is a shell ${command.type}`);
                return;
            }
        }
        const directories = (process.env?.PATH ?? '').split(path.delimiter);
        console.log(directories);
        for (const directory of directories) {
            const fullPath = path.join(directory, input);
            try {
                accessSync(fullPath, constants.X_OK);
                console.log(`${input} is ${fullPath}`);
                return;
            } catch {
                continue;
            }
        }

        console.log(`${input}: not found`);
    }
}
