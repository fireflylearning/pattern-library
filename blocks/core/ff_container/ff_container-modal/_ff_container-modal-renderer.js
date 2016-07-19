'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerModal = require('./ff_container-modal');
var props = { isOpen: true, modifier: 'parent' };

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-modal]');
        if (el) {
            window.ContainerModal = ContainerModal;
            var instance = React.createElement(ContainerModal, props);
            window.ContainerModalInstance = instance;
            ReactDOM.render(instance, el);
        }
    });
};
