import type { Interface } from 'node:readline';
import {
    Command,
    CommandName,
    CommandType,
    getCommandNameFromString,
    isCommandName,
} from './command';
import { isDef } from '../validator/core';
import { CommandRegistry } from './commandregistry';
import { findPathCommand } from '../util';

export class TypeCommand extends Command {
    public name = CommandName.Type;

    public execute(input: string, _: Interface): void {
        const commandName = getCommandNameFromString(input);
        if (isCommandName(commandName)) {
            const command = CommandRegistry.get(commandName);
            if (isDef(command)) {
                console.log(`${commandName} is a shell builtin`);
                return;
            }
        }
        const fullPath = findPathCommand(input);
        if (isDef(fullPath)) {
            console.log(`${input} is ${fullPath}`);
            return;
        }

        console.log(`${input}: not found`);
    }
}
