'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskMetaActions = require('./ff_module-task-meta-actions'),
    dataAttr = '[data-ff_module-task-meta-actions]',
    props = {
        state: {
            archived: true,
            offline: true
        },
        description: {
            numRecipientsAffected: 43,
            author: { name: 'Terry Teacher' }
        },
        filters: {
            text: '[Filter by Status]',
            onAddFilter: function(id, event) { console.log('Adding '+id); },
            onRemoveFilter: function(id, event) { console.log('Removing '+id); },
            filters: [{
                name: '[Awaiting Response]',
                id: 'filter-1'
            }, {
                isActive: true,
                name: '[Approved]',
                id: 'filter-2'
            }, {
                name: '[Response Received]',
                id: 'filter-3'
            }]
        },
        singleActions: [{ text: '[Send All Now]', onClick: function() {} }],
        groupedActions: {
            text: '[More Actions]',
            list: [{ text: '[Edit]', onClick: function(event) { console.log(event); } }]
        }
    };


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll(dataAttr), function(domElement, index) {
            ReactDOM.render(React.createElement(TaskMetaActions, props), domElement);
        });
    });
};
