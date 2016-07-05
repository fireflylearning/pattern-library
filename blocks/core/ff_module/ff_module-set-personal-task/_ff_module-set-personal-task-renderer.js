'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleSetPersonalTask = require('./ff_module-set-personal-task'),
	TaskTitle = require('./_src/TaskTitle'),
	DueDate = require('./_src/DueDate'),
	ClassSelector = require('./_src/ClassSelector'),
	Description =   require('./_src/Description');

var props = { 
	isOpen: true,
	modifier: 'popup',
	title: 'Set a Personal Task',
	body: <p>Test body text</p> 
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-set-personal-task]');
        if (el) {
            ReactDOM.render(
            	<ModuleSetPersonalTask {...props}>
 					<TaskTitle />
 					<DueDate />
 					<ClassSelector />
 					<Description />
            	</ModuleSetPersonalTask>
            , el);
        }
    });
};
