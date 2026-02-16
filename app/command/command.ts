import type { Interface } from 'readline';

export const getCommandNameFromString = (input: string): string | undefined => {
    return input.split(' ')[0];
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
