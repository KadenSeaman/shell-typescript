import type { Interface } from 'node:readline';
import { Command, CommandName, CommandType } from './command';

export class ExitCommand extends Command {
    public name = CommandName.Exit;
    public type = CommandType.BuiltIn;

    public execute(_: string, readline: Interface): void {
        readline.close();
    }
}
