// This will track where we are in the parsing process
type Context = Readonly<{
  text: string; // the input string which we are parsing
  // Ideally, we would also parse binary (but, then again, just parse as ascii)
  index: number; // the index indicating where we are
}>;

export default Context;
