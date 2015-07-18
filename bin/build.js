var fs = require('fs');
var _ = require('lodash');
var browserify = require('browserify');
var vueify = require('vueify');
var BrowserifyUmdify = require('browserify-umdify');
var path = require('path');


function compile(file, options) {

    options = options || {
        exports: options.exports || []
    };

    var bundle = browserify(file, {
        transform: [vueify]
    });

    _.each(options.exports, function(f, e) {
        bundle.require(path.join(options.requireDir, f), {
            expose: e
        });
    });

    return bundle.bundle();
}

module.exports = function(options, env) {

    var configPath = env.configPath || path.join(options.cwd, "package.json");
    var writer = fs.createWriteStream(path.join(env.cwd, 'index.js'));

    var packageJson = JSON.parse(fs.readFileSync(configPath));

    var buildOptions = packageJson['component-man'] || {};

    buildOptions.requireDir = buildOptions.requireDir || env.cwd;

    compile(buildOptions.main, buildOptions)
        .pipe(new BrowserifyUmdify)
        .pipe(writer);
};
