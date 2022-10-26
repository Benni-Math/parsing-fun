// Import types
import Parser from '../types/Parser';
import { success, failure } from '../types/Result';

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

export default str;
