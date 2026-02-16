import type { Command, CommandName } from './command';

export class CommandRegistry {
    private static commands = new Map<CommandName, Command>();

    static register(name: CommandName, command: Command) {
        this.commands.set(name, command);
    }

    static get(name: CommandName): Command | undefined {
        console.log(this.commands);
        return this.commands.get(name);
    }
}
