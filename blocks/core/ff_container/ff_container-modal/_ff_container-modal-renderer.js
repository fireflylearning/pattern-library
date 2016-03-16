'use strict';
var React = require('react');

var ContainerModal = require('./ff_container-modal');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-modal]');
        if (el) {
            window.ContainerModal = ContainerModal;
            var instance = React.createElement(ContainerModal, {isOpen: true });
            window.ContainerModalInstance = instance;
            React.render(instance, el);
        }
    });
};
