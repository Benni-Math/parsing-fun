// Import types
import Parser from '../types/Parser';
import { success, Failure } from '../types/Result';

const map = <A, B>(parser: Parser<A>, fn: (val: A) => B): Parser<B> => {
  return (ctx) => {
    const res = parser(ctx);
    return res.success ? success(res.ctx, fn(res.value)) : (res as Failure);
  };
};

export default map;
