// Import types
import Parser from '../types/Parser';
import Result from '../types/Result';

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

export default any;
