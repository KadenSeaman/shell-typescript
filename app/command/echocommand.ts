import type { Interface } from "readline";
import { Command, CommandName, CommandRegistry, CommandType } from "./command";

export class EchoCommand extends Command {
  public readonly name = CommandName.Echo;
  public readonly type = CommandType.BuiltIn;

  public execute(input: string, _: Interface): void {
    const content = input.substring(5);
    console.log(content);
  }
}

CommandRegistry.register(CommandName.Echo, new EchoCommand());
