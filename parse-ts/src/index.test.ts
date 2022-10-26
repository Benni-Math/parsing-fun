import Combinators from '.';

const {
  sequence,
  str,
} = Combinators;

test(
  'Testing sequence + str combinator.',
  async () => {
    const cow = str('cow');
    const says = str('says');
    const moo = str('moo');
    const space = str(' ');

    const parseCowSentence = sequence([cow, space, says, space, moo]);

    const cowSentence = 'cow says moo';

    const inputCtx = {
      text: cowSentence,
      index: 0,
    };

    const parseOutput = parseCowSentence(inputCtx);

    const expectedOutput = {
      success: true,
      ctx: {
        text: cowSentence,
        index: cowSentence.length,
      },
      value: [
        'cow',
        ' ',
        'says',
        ' ',
        'moo',
      ],
    };

    expect(parseOutput).toStrictEqual(expectedOutput);
  },
);
