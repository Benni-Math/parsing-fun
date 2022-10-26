// Import types
import Parser from '../types/Parser';
import { success } from '../types/Result';

// Import functions
import any from './any';

const optional = <T>(parser: Parser<T>): Parser<T | null> => {
  const nullParser: Parser<null> = (ctx) => { return success(ctx, null); };
  return any([parser, nullParser]);
};

export default optional;
