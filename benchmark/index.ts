'use strict'

import benchmark = require('benchmark');

let suite = new benchmark.Suite();




suite.add('set', function () {
});




suite
    .on('cycle', (event) => {
        console.log(String(event.target))
        if (event.target.error)
            console.error(event.target.error)
    })
    .run()
