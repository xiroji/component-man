requirejs.config({
    baseUrl: './',
    packages: [{
        "name": "component",
        "location": "./",
        "main": "index.js"
    }]
});

define(['./vue.min', 'component'], function(Vue, component) {
    new Vue(component).$mount('#component');
});
