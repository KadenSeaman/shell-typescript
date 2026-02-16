import { CommandName, type Command } from './command';
import { EchoCommand } from './echocommand';
import { ExitCommand } from './exitcommand';
import { PwdCommand } from './pwdcommand';
import { TypeCommand } from './typecommand';

export class CommandRegistry {
    private static commands = new Map<CommandName, Command>();

    static register(name: CommandName, command: Command) {
        this.commands.set(name, command);
    }

    static get(name: CommandName): Command | undefined {
        return this.commands.get(name);
    }
}

CommandRegistry.register(CommandName.Echo, new EchoCommand());
CommandRegistry.register(CommandName.Exit, new ExitCommand());
CommandRegistry.register(CommandName.Type, new TypeCommand());
CommandRegistry.register(CommandName.Pwd, new PwdCommand());
