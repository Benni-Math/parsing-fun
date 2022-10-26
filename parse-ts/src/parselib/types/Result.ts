// Import types
import Context from './Context';

// Output of our parser
type Result<T> = Success<T> | Failure;

export type Success<T> = Readonly<{
  success: true;
  value: T;
  ctx: Context;
}>;

export type Failure = Readonly<{
  success: false;
  expected: string;
  ctx: Context;
}>;

// Constructors
export const success = <T>(ctx: Context, value: T): Success<T> => {
  return { success: true, value, ctx };
};

export const failure = (ctx: Context, expected: string): Failure => {
  return { success: false, expected, ctx };
};

export default Result;
