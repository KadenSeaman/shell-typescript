import type { Interface } from 'node:readline';
import { Command, CommandName } from './command';

export class PwdCommand extends Command {
    public name = CommandName.Pwd;

    public execute(_input: string, _readline: Interface): void {
        console.log(process.cwd());
    }
}
