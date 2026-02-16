import type { Interface } from 'node:readline';
import { Command, CommandName, isCommandName } from './command';
import { isDef } from '../validator/core';
import { CommandRegistry } from './commandregistry';
import { findPathCommand } from '../util';

export class TypeCommand extends Command {
    public name = CommandName.Type;

    public execute(args: string[], _: Interface): void {
        const commandName = args[0];
        const fullPath = args.join(' ');
        if (isCommandName(commandName)) {
            const command = CommandRegistry.get(commandName);
            if (isDef(command)) {
                console.log(`${commandName} is a shell builtin`);
                return;
            }
        }
        const pathCommand = findPathCommand(fullPath);
        if (isDef(pathCommand)) {
            console.log(`${fullPath} is ${pathCommand}`);
            return;
        }

        console.log(`${fullPath}: not found`);
    }
}
