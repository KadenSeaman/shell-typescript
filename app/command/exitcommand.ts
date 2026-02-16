import type { Interface } from 'node:readline';
import { Command, CommandName } from './command';

export class ExitCommand extends Command {
    public name = CommandName.Exit;

    public execute(_: string[], readline: Interface): void {
        readline.close();
    }
}
