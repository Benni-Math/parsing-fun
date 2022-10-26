import clone from 'fast-clone';

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

// Creates a Parser from Regex
const regex = (re: RegExp, expected: string): Parser<string> => {
  const syncRe = clone(re);
  return (ctx) => {
    syncRe.lastIndex = ctx.index;
    const res = syncRe.exec(ctx.text);
    if (res && res.index === ctx.index) {
      return success({ ...ctx, index: ctx.index + res[0].length }, res[0]);
    }
    return failure(ctx, expected);
  };
};

// The any combinator matches against the first successful Parser in an array
const any = <T>(parsers: Parser<T>[]): Parser<T> => {
  return (ctx) => {
    let furthestRes: Result<T> | null = null;
    for (let i = 0; i < parsers.length; i++) {
      const res = parsers[i](ctx);
      if (res.success) return res;
      if (!furthestRes || furthestRes.ctx.index < res.ctx.index) {
        furthestRes = res;
      }
    }
    return furthestRes!;
  };
};

// This one will match against repetition of a Parser - can't fail, only returns []
const many = <T>(parser: Parser<T>): Parser<T[]> => {
  return (ctx) => {
    const values: T[] = [];
    let nextCtx = ctx;
    while (nextCtx.index < nextCtx.text.length) {
      const res = parser(nextCtx);
      if (!res.success) break;
      values.push(res.value);
      nextCtx = res.ctx;
    }
    return success(nextCtx, values);
  };
};

// match a parser or succeed with null
const optional = <T>(parser: Parser<T>): Parser<T | null> => {
  const nullParser: Parser<null> = (ctx) => { return success(ctx, null); };
  return any([parser, nullParser]);
};

// method for mapping a Success to a callback, useful for ASTs
const map = <A, B>(parser: Parser<A>, fn: (val: A) => B): Parser<B> => {
  return (ctx) => {
    const res = parser(ctx);
    return res.success ? success(res.ctx, fn(res.value)) : (res as Failure);
  };
};

export const Combinators = {
  any,
  many,
  map,
  optional,
  regex,
  str,
  sequence,
};

// Implementing our mini-language
type Expr = Call | number;

interface Call {
  targets: string;
  args: Expr[];
}

export default Combinators;
