'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark = require("benchmark");
let suite = new benchmark.Suite();
suite.add('set', function () {
});
suite
    .on('cycle', (event) => {
    console.log(String(event.target));
    if (event.target.error)
        console.error(event.target.error);
})
    .run();
//# sourceMappingURL=index.js.map