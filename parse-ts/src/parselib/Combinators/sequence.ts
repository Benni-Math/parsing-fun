// Import types
import Parser from '../types/Parser';
import { success, Failure } from '../types/Result';

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

export default sequence;
