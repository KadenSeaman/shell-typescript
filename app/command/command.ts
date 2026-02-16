import type { Interface } from 'readline';
import { isDef } from '../validator/core';

export const getCommandNameFromString = (input: string): string | undefined => {
    return input.split(' ')[0];
};

export enum CommandName {
    Exit = 'exit',
    Echo = 'echo',
    Type = 'type',
    Pwd = 'pwd',
    Cd = 'cd',
}

export const isCommandName = (
    input: string | undefined,
): input is CommandName => {
    if (!isDef(input)) {
        return false;
    }
    return Object.values(CommandName).includes(input as CommandName);
};

export abstract class Command {
    abstract readonly name: CommandName;

    abstract execute(input: string, readline: Interface): void;
}
