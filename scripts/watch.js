const browserify = require("browserify");
const babelify = require("babelify");
const tsify = require("tsify");
const watchify = require('watchify');
const fs = require('fs');


const b = browserify({
    entries: ['./src/index.ts'],
    // transform: [babelify.configure({ sourceMaps: false, stage: 3 })],
    cache: {},
    packageCache: {},
    plugin: [watchify]
})
b.on('update', bundle);
bundle();

function bundle() {
    b.plugin(tsify, { target: 'es5' })
        // .transform(babelify.configure({ extensions: [".ts", ".js"] }))
        .bundle()
        .on('error', console.error)
        .pipe(fs.createWriteStream('./output/index.js'));
}