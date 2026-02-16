import type { Interface } from 'readline';
import { Command, CommandName, CommandType } from './command';

export class EchoCommand extends Command {
    public readonly name = CommandName.Echo;
    public readonly type = CommandType.BuiltIn;

    public execute(input: string, _: Interface): void {
        console.log(input);
    }
}
