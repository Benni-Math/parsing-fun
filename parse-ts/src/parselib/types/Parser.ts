// Import types
import Context from './Context';
import Result from './Result';

/**
 * General Parser function type.
 */
type Parser<T> = (ctx: Context) => Result<T>;

export default Parser;
