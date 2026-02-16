import type { Interface } from 'node:readline';
import {
    Command,
    CommandName,
    CommandType,
    getCommandNameFromString,
} from './command';
import { isDef } from '../validator/core';
import { CommandRegistry } from './commandregistry';
import { findPathCommand } from '../util';

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
        const fullPath = findPathCommand(input);
        if (isDef(fullPath)) {
            console.log(`${input} is ${fullPath}`);
            return;
        }

        console.log(`${input}: not found`);
    }
}
