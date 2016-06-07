'use strict';

var ReactDOM = require('react-dom'),
    React = require('react');

var TaskOverviewActions = require('./ff_module-task-overview-actions');

function getOnClick(type) {
    return function defaultOnClick(e) {
        console.log(type, e);
    };
}

var props = [{
    state: {
        archived: false
    },
    onEditClick: getOnClick('onEditClick'),
    onDuplicateClick: getOnClick('onDuplicateClick'),
    onExportClick: getOnClick('onExportClick'),
    onArchiveClick: getOnClick('onArchiveClick'),
    onUnarchiveClick: getOnClick('onUnarchiveClick'),
    onDeleteClick: getOnClick('onDeleteClick'),
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-overview-actions]'), function(domElement, index) {

            var actions = props.map(function(prop, index){
                return <TaskOverviewActions key={'te'+index} {...prop} />
            });
            ReactDOM.render(<div>{actions}</div>, domElement);
        });
    });
};
