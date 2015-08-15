# Component Man

[![Join the chat at https://gitter.im/xiroji/component-man](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/xiroji/component-man?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/xiroji/component-man.svg)](https://david-dm.org/xiroji/component-man)
[![npm version](https://badge.fury.io/js/component-man.svg)](http://badge.fury.io/js/component-man)
[![Build Status](https://travis-ci.org/xiroji/component-man.svg?branch=master)](https://travis-ci.org/xiroji/component-man)

> This node module helps create small modular components using [Browserify](http://browserify.org), [Vueify](https://github.com/vuejs/vueify), and [Browserify-Umdify](https://github.com/xiroji/browserify-umdify).

Component man helps you write web components faster. Use the power of browserify, and Vueify to write small, reusable web components.

The components outputted by component-man will work with CommonJS `require('')` statements, AMD loaders `requirejs`, or a good old fashioned `<script src=''></script>` tag.

## Getting Started:

### Install Component Man

    npm install -g component-man

### Create a New Project

Create a new folder and run the following command inside the new folder.

    component-man init <name> -m <modules...>

`name`    - Name of your new component

`modules` - Boostrap your component with any dependencies this component will need.


### Build Your Component

To build your component simply run the following command:

    component-man build

### Run Your Component

To test your component while you're coding run the following command:

    component-man serve -p <port>

It launches a simple server that setups up the component, and executes it in an AMD environment.

### Publish your component

This one is both simple and exciting, simply publish it to npm. This will allow yourself and others to consume and build larger components with small modular components. 

## License
The MIT License (MIT)

Copyright (c) 2015 Xiroji Systems Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
