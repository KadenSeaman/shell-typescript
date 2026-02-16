import { accessSync, constants } from 'node:fs';
import path from 'node:path';

/**
 * @param input full command name and args as string
 * @returns if a command was found and the callback was executed
 */
export const findPathCommand = (input: string): string | undefined => {
    const directories = (process.env?.PATH ?? '').split(path.delimiter);
    for (const directory of directories) {
        const fullPath = path.join(directory, input);
        try {
            accessSync(fullPath, constants.X_OK);
            return fullPath;
        } catch {
            continue;
        }
    }
};
