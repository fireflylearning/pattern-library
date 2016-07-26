'use strict';

var ReactDOM = require('react-dom');
var App = require('./lib_test-set-personal-task');
var selector = '[data-lib_test-set-personal-task]';


var props = {
	isOpen: false,
	modifier: 'parent',
	title: 'Set a Personal Task',
	controls: [<button key="set-task" className="ff_module-button ff_module-button--primary">Set Task</button>]
};


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll(selector), function(domElement) {
            if (domElement) {
                ReactDOM.render(<App/>, domElement);
            }
        });
    });
};
