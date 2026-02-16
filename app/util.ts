import { accessSync, constants } from 'node:fs';
import path from 'node:path';
import { isDef } from './validator/core';

export const findPathCommand = (commandName: string): string | undefined => {
    const pathString = process.env?.PATH;
    if (!isDef(pathString)) {
        throw new Error('missing $PATH');
    }
    const directories = pathString.split(path.delimiter);
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
