// Import types
import Parser from '../types/Parser';
import { success } from '../types/Result';

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

export default many;
