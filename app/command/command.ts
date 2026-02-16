import type { Interface } from 'readline';

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
