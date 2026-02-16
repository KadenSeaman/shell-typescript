import { assertNever, isDef } from '../validator/core';

enum ParsingState {
    Standard,
    InsideSingleQuotes,
}
const singleQuote = "'";
const whitespace = ' ';

export class ShellParser {
    private readonly args: string[] = [];

    private input: string = '';
    private state: ParsingState = ParsingState.Standard;
    private current = '';
    private pos = 0;

    private clearState() {
        this.state = ParsingState.Standard;
        this.current = '';
        this.pos = 0;
        this.input = '';
    }

    private get currentToken() {
        return this.input[this.pos];
    }

    private nextToken() {
        this.pos++;
    }

    private endCurrent() {
        const currentValue = this.current;
        this.current = '';
        if (currentValue.length <= 0) {
            return;
        }
        if (currentValue === "''") {
            return;
        }
        const lastParsedArg = this.args.at(-1);
        // concat two single quoted args in a row
        // This has some undefined behavior like what if the arg is a single '
        if (isDef(lastParsedArg)) {
            const isSingleQuoteArg = (str: string) => {
                return str[0] === singleQuote && str.at(-1) === singleQuote;
            };
            if (
                isSingleQuoteArg(lastParsedArg) &&
                isSingleQuoteArg(currentValue)
            ) {
                //concat them together
                const concatedArg = lastParsedArg
                    .substring(0, lastParsedArg.length - 1)
                    .concat(currentValue.substring(1));
                this.args[this.args.length - 1] = concatedArg;
                return;
            }
        }

        this.args.push(currentValue);
        this.current = '';
    }

    /**
     * @param input raw user input
     * @returns an ordered array of args
     */
    public parseInput(input: string): string[] {
        this.input = input;

        while (this.pos < input.length) {
            const char = this.currentToken;

            switch (this.state) {
                case ParsingState.Standard: {
                    if (char === whitespace) {
                        this.endCurrent();
                    }
                    this.current += char;
                    if (char === singleQuote) {
                        this.state = ParsingState.InsideSingleQuotes;
                    }
                    break;
                }
                case ParsingState.InsideSingleQuotes: {
                    this.current += char;
                    if (char === singleQuote) {
                        this.state = ParsingState.Standard;
                        this.endCurrent();
                    }
                    break;
                }
                default: {
                    assertNever(this.state);
                }
            }

            this.nextToken();
        }

        const result = this.args;
        this.clearState();
        return result;
    }
}
