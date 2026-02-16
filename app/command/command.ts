import type { Interface } from 'readline';
import { EchoCommand } from './echocommand';
import { ExitCommand } from './exitcommand';
import { TypeCommand } from './typecommand';
import { CommandRegistry } from './commandregistry';

export const getCommandNameFromString = (
    input: string,
): CommandName | undefined => {
    const commandName = input.split(' ')[0];
    if (isCommandName(commandName)) {
        return commandName;
    }
    return undefined;
};

export enum CommandName {
    Exit = 'exit',
    Echo = 'echo',
    Type = 'type',
}

export const isCommandName = (input: string): input is CommandName => {
    return Object.values(CommandName).includes(input as CommandName);
};

export enum CommandType {
    BuiltIn = 'builtin',
}

export abstract class Command {
    abstract readonly name: CommandName;
    abstract readonly type: CommandType;

    abstract execute(input: string, readline: Interface): void;
}

CommandRegistry.register(CommandName.Echo, new EchoCommand());
CommandRegistry.register(CommandName.Exit, new ExitCommand());
CommandRegistry.register(CommandName.Type, new TypeCommand());
