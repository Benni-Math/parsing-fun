// Import npm helpers
import clone from 'fast-clone';

// Import types
import Parser from '../types/Parser';
import { success, failure } from '../types/Result';

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

export default regex;
