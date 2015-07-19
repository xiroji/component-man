requirejs.config({
    baseUrl: './',
    packages: [{
        "name": "component",
        "location": "./",
        "main": "index.js"
    }]
});

define(['./node_modules/vue/dist/vue', 'component'], function(Vue, component) {
    new Vue(component).$mount('#component');
});
