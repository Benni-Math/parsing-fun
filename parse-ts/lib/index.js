"use strict";
/**
 * First, we're gonna do a rough walk-through of a blog post.
 * Then, I'll refactor into a working parser for .properties files.
 * Finally, I'll refactor into a more general library with an implementation of
 * our .properties file parser with said general parser combinator library.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// constructors
const success = (ctx, value) => {
    return { success: true, value, ctx };
};
const failure = (ctx, expected) => {
    return { success: false, expected, ctx };
};
// Our first combinator
// Creates a parser matching against a string
const str = (match) => {
    return (ctx) => {
        const endIdx = ctx.index + match.length;
        if (ctx.text.substring(ctx.index, endIdx) === match) {
            return success(Object.assign(Object.assign({}, ctx), { index: endIdx }), match);
        }
        return failure(ctx, match);
    };
};
// Combinator which creates Parser to match against exact sequence of Parsers
const sequence = (parsers) => {
    return (ctx) => {
        const values = [];
        let nextCtx = ctx;
        for (let i = 0; i < parsers.length; i++) {
            const res = parsers[i](nextCtx);
            if (!res.success)
                return res;
            values.push(res.value);
            nextCtx = res.ctx;
        }
        return success(nextCtx, values);
    };
};
const Combinators = {
    str,
    sequence,
};
exports.default = Combinators;
//# sourceMappingURL=index.js.map