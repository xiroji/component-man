#!/usr/bin/env node 

var Liftoff = require('liftoff');
var chalk = require('chalk');
var tildify = require('tildify');
var program = require('commander');
var _ = require('lodash');

var commands = require('./cli-common.js');

var Cli = new Liftoff({
    name: "MyApp",
    moduleName: 'componentify',
    configName: 'package'
});

program
    .version('0.0.1');

function parseConfig(env) {
    if (!env.configPath) {
        console.log(chalk.magenta("package.json not found in: ", tildify(env.cwd)));
    }
}

function invoke(env) {

    program
        .command("init <name>")
        .option('-m, --modules <modules...>', "bootstrap project with modules")
        .description("initialize a new component in current folder")
        .action(function(name, opt) {
            require('./bin/init')({
                name: name,
                cwd: env.cwd,
                modules: (opt.modules) ? opt.modules.split(',') : []
            }, env);
        });

    program
        .command("build")
        .description("build component")
        .action(function() {
            require('./bin/build')({}, env);
        });

    program
        .command("serve")
        .option('-p, --port <port>', "set the port to use")
        .description("serve component")
        .action(function(options) {
            require('./bin/serve')({
                port: options.port || 8080
            }, env);
        });

    program.parse(process.argv);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}

Cli.launch({}, invoke);
