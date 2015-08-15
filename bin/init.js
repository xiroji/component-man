var npm = require('npm');

var fs = require('fs');
var fse = require('fs-extra');
var _ = require('lodash');
var chalk = require('chalk');
var path = require('path');
var readPackageTree = require('read-package-tree');
var npa = require('npm-package-arg');

var commands = require('../cli-common.js');

function failedToSave(dep) {
    error('Could not save dependency: ', dep,
        ' please add it manually to your package.json');
}

var mergeModules = module.exports.mergeModules = function(modules) {

    modules = modules || [];

    var defaultModules = ['requirejs', 'vue', 'insert-css'];

    _.each(defaultModules, function(module) {
        if (!_.includes(modules, module)) {
            modules.push(module);
        }
    });

    return modules;
};

var parseConfig = module.exports.parseConfig = function(options) {

    console.log(chalk.magenta("Executing in:", options.cwd));

    if (!fs.existsSync(options.configPath)) {
        fs.appendFileSync(options.configPath, "{}");
    }

    var packageJson = JSON.parse(fs.readFileSync(options.configPath));

    var vueMainFile = 'component.vue';
    var exports = {};
    exports[options.name] = vueMainFile;

    packageJson = _.merge({
        "name": options.name,
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "component-man": {
            "main": vueMainFile,
            "exports": exports
        }
    }, packageJson);

    return packageJson;
}

module.exports.exec = function(options, env) {

    var modules = options.modules = mergeModules(options.modules);
    var cwd = options.cwd = process.cwd();
    var configPath = options.configPath = path.join(cwd, "package.json");

    var packageJson = parseConfig(options);

    fs.writeFileSync(configPath, JSON.stringify(packageJson, null, 4));

    npm.load(configPath, function(err) {

        if (err) commands.exit(err);

        npm.commands.install(modules, function(err) {

            if (err) commands.exit(err);

            console.log(chalk.magenta("\n" + packageJson.name,
                " initialized"));

            readPackageTree(cwd, function(err, packageTree) {

                if (err) commands.exit(err);

                var deps = {};

                _.each(modules, function(module) {

                    var installed = npa(module);

                    if (installed.hosted) {

                        var found = _.find(packageTree.children,
                            function(compare) {

                                var other = npa(compare.package._from);

                                if (!other.hosted)
                                    return false;
                                if (installed.type !== other.type) return false;
                                if (installed.spec !== other.spec) return false;
                                return true;
                            });

                        if (found) {
                            deps[found.package.name] = found.package._from;
                        } else {
                            failToSave(installed.raw);
                        }

                    } else if (installed.name) {

                        var found = _.find(packageTree.children,
                            function(compare) {
                                var other = npa(compare.package._from);
                                return other.name === installed.name;
                            });

                        if (found) {
                            deps[found.package.name] = found.package.version;
                        } else {
                            failToSave(installed.raw);
                        }

                    } else {
                        failToSave(installed.raw);
                    }
                });

                var packageJson = JSON.parse(fs.readFileSync(configPath));

                packageJson.dependencies = packageJson.dependencies || {};
                packageJson.dependencies = _.merge(packageJson.dependencies, deps);

                fs.writeFileSync(configPath, JSON.stringify(packageJson, null, 4));

                fse.copySync(path.join(__dirname, '..', 'templates'), cwd);
            });
        });
    });
}
