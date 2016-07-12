'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerDialog = require('./ff_container-dialog');
var props = {
    title: 'Title',
    showCloseIcon: true,
    onCloseIconClick: function(){
        console.log('close');
    },
    body: <p>Test body text</p>,
    controls: [<button key="send">Send</button>, <button key="close">Close</button>],
    modifier: ''
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-dialog]');
        if (el) {
            ReactDOM.render(React.createElement(ContainerDialog, props), el);
        }
    });
};
