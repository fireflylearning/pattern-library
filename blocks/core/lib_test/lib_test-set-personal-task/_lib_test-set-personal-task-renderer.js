'use strict';

var ReactDOM = require('react-dom');
var App = require('./lib_test-set-personal-task');
var selector = '[data-lib_test-set-personal-task]';

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll(selector), function(domElement) {
            if (domElement) {
                ReactDOM.render(<App/>, domElement);
            }
        });
    });
};