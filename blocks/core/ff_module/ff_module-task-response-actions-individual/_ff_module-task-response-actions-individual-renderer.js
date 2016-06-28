'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventActions = require('./ff_module-task-response-actions-individual');

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
        userCanEdit: false
    },
    onClick: onClick
}];




module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-response-actions-individual]'), function(domElement, index) {
            var actions = props.map(function(prop, index){
                return <TaskEventActions key={'te'+index} {...prop} />
            });
            ReactDOM.render(<div>{actions}</div>, domElement);
        });
    });
};
