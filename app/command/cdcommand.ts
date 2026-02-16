import type { Interface } from 'node:readline';
import { Command, CommandName } from './command';
import { isDef } from '../validator/core';
import { accessSync } from 'node:fs';
import { chdir } from 'node:process';

export class CdCommand extends Command {
    public name = CommandName.Cd;

    public execute(input: string, readline: Interface): void {
        const dir = input.split(' ')[0];
        if (!isDef(dir)) {
            console.log(`cd: No file or directory provided`);
        }
        try {
            accessSync(dir);
            chdir(dir);
        } catch {
            console.log(`cd: ${dir}: No such file or directory`);
        }
    }
}
