import { assertNever, isDef } from '../validator/core';

enum ParsingState {
    Standard,
    InsideSingleQuotes,
    InsideDoubleQuotes,
}
const isSingleQuote = (token: string) => {
    return token === "'";
};
const isDoubleQuote = (token: string) => {
    return token === '"';
};
const isWhitespace = (token: string) => {
    return token === ' ' || token === '\t' || token === '\n';
};
const isBackslash = (token: string) => {
    return token === '\\';
};

export class ShellParser {
    private args: string[] = [];

    private input: string = '';
    private state: ParsingState = ParsingState.Standard;
    private buffer = '';
    private pos = 0;
    private tokenStarted = false;

    private setupState(input: string) {
        this.args = [];
        this.state = ParsingState.Standard;
        this.buffer = '';
        this.pos = 0;
        this.input = input;
    }

    private get currentToken() {
        const token = this.input[this.pos];
        if (!isDef(token)) {
            throw new Error('Should never have an undefined token');
        }
        return token;
    }

    private nextToken() {
        this.pos++;
    }
    private peekNextToken() {
        return this.input[this.pos + 1];
    }

    private commitBuffer() {
        if (this.tokenStarted) {
            this.args.push(this.buffer);
            this.buffer = '';
            this.tokenStarted = false;
        }
    }

    private addToBuffer(token: string) {
        this.tokenStarted = true;
        this.buffer += token;
    }

    /**
     * @param input raw user input
     * @returns an ordered array of args
     */
    public parseInput(input: string): string[] {
        this.setupState(input);

        while (this.pos < input.length) {
            const token = this.currentToken;

            switch (this.state) {
                case ParsingState.Standard: {
                    if (isWhitespace(token)) {
                        this.commitBuffer();
                        this.nextToken();
                        continue;
                    }
                    if (isSingleQuote(token)) {
                        this.state = ParsingState.InsideSingleQuotes;
                        this.tokenStarted = true;
                        this.nextToken();
                        continue;
                    }
                    if (isDoubleQuote(token)) {
                        this.state = ParsingState.InsideDoubleQuotes;
                        this.tokenStarted = true;
                        this.nextToken();
                        continue;
                    }
                    if (isBackslash(token)) {
                        this.nextToken();
                        this.addToBuffer(this.currentToken);
                        this.nextToken();
                        continue;
                    }
                    this.addToBuffer(token);
                    break;
                }
                case ParsingState.InsideSingleQuotes: {
                    if (isSingleQuote(token)) {
                        this.state = ParsingState.Standard;
                        this.nextToken();
                        continue;
                    }
                    this.addToBuffer(token);
                    break;
                }
                case ParsingState.InsideDoubleQuotes: {
                    if (isBackslash(token)) {
                        // Unhandled: $, `, newline
                        const nextToken = this.peekNextToken();
                        const nextTokenCanBeEscaped =
                            isDef(nextToken) &&
                            (isDoubleQuote(nextToken) ||
                                isBackslash(nextToken));
                        if (nextTokenCanBeEscaped) {
                            this.nextToken();
                            this.addToBuffer(nextToken);
                            this.nextToken();
                            continue;
                        }
                    }
                    if (isDoubleQuote(token)) {
                        this.state = ParsingState.Standard;
                        this.nextToken();
                        continue;
                    }
                    this.addToBuffer(token);
                    break;
                }
                default: {
                    assertNever(this.state);
                }
            }

            this.nextToken();
        }
        if (this.state === ParsingState.InsideSingleQuotes) {
            throw new Error("unexpected EOF while looking for matching '");
        }
        this.commitBuffer();

        return this.args;
    }
}
