import type { Interface } from 'readline';
import { Command, CommandName } from './command';

export class EchoCommand extends Command {
    public readonly name = CommandName.Echo;

    public execute(args: string[], _: Interface): void {
        console.log(args.join(' '));
    }
}
