"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const { sequence, str, } = _1.default;
test('Testing sequence + str combinator.', () => __awaiter(void 0, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=index.test.js.map