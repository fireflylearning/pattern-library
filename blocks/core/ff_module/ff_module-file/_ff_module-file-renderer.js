'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleFile = require('./ff_module-file');

var props = {
    file: {
        title: 'My lovely file.pdf',
        // type: 'page',
        href: '#'
    }
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_module-file]');
        if (element) {
            ReactDOM.render(React.createElement(ModuleFile, props), element);
        }
    });
};
