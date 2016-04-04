'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerDialog = require('./ff_container-dialog');
var props = { isOpen: true, modifier: '' };

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-dialog]');
        if (el) {
            // window.ContainerDialog = ContainerDialog;
            var instance = React.createElement(ContainerDialog, props);
            // window.ContainerModalInstance = instance;
            ReactDOM.render(instance, el);
        }
    });
};
