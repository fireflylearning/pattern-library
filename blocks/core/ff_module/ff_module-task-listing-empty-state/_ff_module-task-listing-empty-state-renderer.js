'use strict';
var ReactDOM = require('react-dom');

var EmptyState = require('./ff_module-task-listing-empty-state');

var data = {
    text: "You haven't set any tasks yet.",
    button: {
        text: 'Set a task',
        id: 'btn-01',
    }

}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_module-task-listing-empty-state]');
        if (element) {
            ReactDOM.render(React.createElement(EmptyState, data), element);
        }
    });
};
