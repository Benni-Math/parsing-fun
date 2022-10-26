/**
 * First, we're gonna do a rough walk-through of a blog post.
 * Then, I'll refactor into a working parser for .properties files.
 * Finally, I'll refactor into a more general library with an implementation of
 * our .properties file parser with said general parser combinator library.
 */
declare type Parser<T> = (ctx: Context) => Result<T>;
declare type Context = Readonly<{
    text: string;
    index: number;
}>;
declare type Result<T> = Success<T> | Failure;
declare type Success<T> = Readonly<{
    success: true;
    value: T;
    ctx: Context;
}>;
declare type Failure = Readonly<{
    success: false;
    expected: string;
    ctx: Context;
}>;
declare const Combinators: {
    str: (match: string) => Parser<string>;
    sequence: <T>(parsers: Parser<T>[]) => Parser<T[]>;
};
export default Combinators;
