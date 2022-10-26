/**
 * First, we're gonna do a rough walk-through of a blog post.
 * Then, I'll refactor into a working parser for .properties files.
 * Finally, I'll refactor into a more general library with an implementation of
 * our .properties file parser with said general parser combinator library.
 */

// General parser function type
type Parser<T> = (ctx: Context) => Result<T>;

// This will track where we are in the parsing process
type Context = Readonly<{
  text: string; // the input string which we are parsing
  // Ideally, we would also parse binary (but, then again, just parse as ascii)
  index: number; // the index indicating where we are
}>;

// The output of a Parser
type Result<T> = Success<T> | Failure;

type Success<T> = Readonly<{
  success: true;
  value: T;
  ctx: Context;
}>;

type Failure = Readonly<{
  success: false;
  expected: string;
  ctx: Context;
}>;

// constructors
const success = <T>(ctx: Context, value: T): Success<T> => {
  return { success: true, value, ctx };
};

const failure = (ctx: Context, expected: string): Failure => {
  return { success: false, expected, ctx };
};

// Our first combinator
// Creates a parser matching against a string
const str = (match: string): Parser<string> => {
  return (ctx) => {
    const endIdx = ctx.index + match.length;
    if (ctx.text.substring(ctx.index, endIdx) === match) {
      return success({ ...ctx, index: endIdx }, match);
    }
    return failure(ctx, match);
  };
};

// Combinator which creates Parser to match against exact sequence of Parsers
const sequence = <T>(parsers: Parser<T>[]): Parser<T[]> => {
  return (ctx) => {
    const values: T[] = [];
    let nextCtx = ctx;
    for (let i = 0; i < parsers.length; i++) {
      const res = parsers[i](nextCtx);
      if (!res.success) return res as Failure;
      values.push(res.value);
      nextCtx = res.ctx;
    }
    return success(nextCtx, values);
  };
};

// The any combinator matches against the first successful Parser in an array
const any = <T>(parsers: Parser<T>[]): Parser<T[]> => {

};

// This one will match against repeated anys - can't fail, only returns []
const many = <T>(parsers: Parser<T>[]): Parser<T[]> => {

};

const Combinators = {
  str,
  sequence,
};

export default Combinators;
