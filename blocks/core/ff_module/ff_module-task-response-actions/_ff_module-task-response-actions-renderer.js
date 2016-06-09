'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventActions = require('./ff_module-task-response-actions');

function onClick(e){
    console.log(e);
}

var props = [{
    onClick: onClick
}, {
    state: {
        complete: true
    },
    onClick: onClick
}, {
    state: {
        excused: true
    },
    onClick: onClick
}, {
    state: {
        allStudents: true,
        excused: true,
        complete: true
    },
    onClick: onClick
}];




module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-response-actions]'), function(domElement, index) {
            var actions = props.map(function(prop, index){
                return <TaskEventActions key={'te'+index} {...prop} />
            });
            ReactDOM.render(<div>{actions}</div>, domElement);
        });
    });
};
