'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerModalWithDialog = require('./ff_container-modal-with-dialog');
var props = { isOpen: true, modifier: 'wide', title: 'Container with Dialog' };

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-modal-with-dialog]');
        if (el) {

            ReactDOM.render(<ContainerModalWithDialog {...props}>
                <p>Container Dialog content</p>
            </ContainerModalWithDialog>, el);
        }
    });
};
