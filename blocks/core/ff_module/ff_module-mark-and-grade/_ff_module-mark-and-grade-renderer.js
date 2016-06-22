'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var MarkAndGrade = require('./ff_module-mark-and-grade');
var props = { mark: 5, markMax: 10, grade: 'D' };

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-mark-and-grade]');
        if (el) {
            ReactDOM.render(React.createElement(MarkAndGrade, props), el);
        }
    });
};
