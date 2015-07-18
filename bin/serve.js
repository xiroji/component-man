var connect = require('connect');
var serveStatic = require('serve-static');
var chalk = require('chalk');

module.exports = function(options, env) {

    console.log("Serving: ", chalk.magenta(env.cwd), " to ", chalk.magenta(
        "http://localhost:" + options.port));

    connect()
        .use(function(req, res, next) {
            console.log(req.method, req.url);
            next();
        })
        .use(serveStatic(env.cwd, {
            index: ['index.html']
        }))
        .listen(options.port);
};
