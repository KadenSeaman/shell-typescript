import type { Interface } from 'node:readline';
import {
    Command,
    CommandName,
    isCommandName as isBuiltinCommandName,
} from './command';
import { isDef } from '../validator/core';
import { findPathCommand } from '../util';

export class TypeCommand extends Command {
    public name = CommandName.Type;

    public execute(args: string[], _: Interface): void {
        const commandName = args[0];
        if (!isDef(commandName)) {
            throw new Error('Expected at least one argument');
        }

        if (isBuiltinCommandName(commandName)) {
            console.log(`${commandName} is a shell builtin`);
            return;
        }

        const fullPath = args.join(' ');
        const pathCommand = findPathCommand(commandName);
        if (isDef(pathCommand)) {
            console.log(`${fullPath} is ${pathCommand}`);
            return;
        }

        console.log(`${fullPath}: not found`);
    }
}
