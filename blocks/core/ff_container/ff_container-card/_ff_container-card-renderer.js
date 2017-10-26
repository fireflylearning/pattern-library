'use strict';
var React = require('react'),
    ReactDOM = require('react-dom'),
    selector = 'data-ff-crate-block-react-item';

import Card from './ff_container-card';
var createHeading = require('../../_lib/ff-core/_ff-core.js').createHeading;

var props = {
    title: 'Card Title',
    modifier: 'in-list',
    items: ['This is the fist item', 'This is the second item','This is the third item']
}

module.exports = function() {

    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(React.createElement(Card, props), domElement);
                createHeading(domElement);
            }
        });
    }); 
};  