var should = require('chai')
    .should();
var mock = require('mock-fs');
var path = require('path');

var Init = require('../bin/init');

describe("Init", function() {

    describe(".mergeModules", function() {

        it("should should exist", function() {
            Init.mergeModules.should.exist;
        });

        it("should define the correct default modules", function() {
            var modules = Init.mergeModules();
            modules.should.to.include.members([
                'requirejs', 'vue', 'insert-css'
            ]);
        });

        it("should define additional modules passed in", function() {
            var modules = Init.mergeModules(['underscore']);
            modules.should.to.include.members([
                'requirejs', 'vue', 'insert-css', 'underscore'
            ]);
        });
    });

    describe(".parseConfig", function() {

        it("should exist", function() {
            Init.parseConfig.should.exist;
        });

        describe("with an empty config", function() {

            beforeEach(function() {
                mock({});
            });

            afterEach(function() {
                mock.restore();
            });

            it("should not return an empty package.json", function() {
                Init.parseConfig({
                    name: "list-component",
                    cwd: process.cwd(),
                    configPath: path.join(process.cwd(), "package.json")
                }).should.not.be.empty;
            });
        });

        describe("with an non empty config", function() {

            beforeEach(function() {
                mock({
                    "package.json": mock.file({
                        content: JSON.stringify({
                            "name": "sample project"
                        })
                    })
                });
            });

            afterEach(function() {
                mock.restore();
            });

            it("should not override package.json values", function() {
                Init.parseConfig({
                    name: "list-component",
                    cwd: process.cwd(), 
                    configPath: path.join(process.cwd(), "package.json")
                }).should.contain.any.keys({
                    name: "sample project"
                });
            });
        });
    });
});
