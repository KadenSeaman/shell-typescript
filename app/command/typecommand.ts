import type { Interface } from 'node:readline';
import {
    Command,
    CommandName,
    CommandType,
    getCommandNameFromString,
} from './command';
import { isDef } from '../validator/core';

export class TypeCommand extends Command {
    public name = CommandName.Type;
    public type = CommandType.BuiltIn;

    public execute(input: string, readline: Interface): void {
        const commandName = getCommandNameFromString(input);
        if (!isDef(commandName)) {
            console.log(`${input}: not found`);
            return;
        }
        const command = CommandRegistry.get(commandName);
        if (!isDef(command)) {
            console.log(`${command} is not registered`);
            return;
        }
        console.log(`${commandName} is a shell ${command.type}`);
    }
}
