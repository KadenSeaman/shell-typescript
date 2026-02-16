import { accessSync, constants } from 'node:fs';
import path from 'node:path';

export const findPathCommand = (commandName: string): string | undefined => {
    const directories = (process.env?.PATH ?? '').split(path.delimiter);
    for (const directory of directories) {
        const fullPath = path.join(directory, commandName);
        try {
            accessSync(fullPath, constants.X_OK);
            return fullPath;
        } catch {
            continue;
        }
    }
};
