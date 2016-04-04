'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerDialog = require('./ff_container-dialog');
var props = {
    headingText: 'Heading',
    showTopClose: true,
    body: <p>Test body text</p>,
    controls: [<button key="send">Send</button>, <button key="close">Close</button>]
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-dialog]');
        if (el) {
            ReactDOM.render(React.createElement(ContainerDialog, props), el);
        }
    });
};
