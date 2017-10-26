'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskMetaActions = require('./ff_module-task-meta-actions'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters'),

    dataAttr = '[data-ff_module-task-meta-actions]',
    filterProps = {
        text: '[Filter by Status]',
        modifier: 'compact',
        onAddFilter: function(id, event) { console.log('Adding ' + id); },
        onRemoveFilter: function(id, event) { console.log('Removing ' + id); },
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
    buttonProps = {
        text: '[Send All Now]',
        modifier: 'compact',
        onClick: function() {}
    },
    dropdownProps = {
        text: '[More Actions]',
        modifier: 'compact',
        list: [{ text: '[Edit]', onClick: function(event) { console.log(event); } }]
    },

    props = [{
        state: {
            // archived: true
        },
        modifier: 'my-modifier',
        description: {
            numRecipientsAffected: 1,
            author: { name: 'Terry Teacher' }
        },
        filters: <DropdownFilters {...filterProps} />,
        singleButtons: [<Button key="send-all-now" {...buttonProps}/>],
        groupedActions: <DropdownButton {...dropdownProps}/>
    },
    {
        state: {
            // archived: true
        },
        description: {
            numRecipientsAffected: 24,
            author: { name: 'Terry Teacher' }
        },
        filters: <DropdownFilters {...filterProps} />,
        singleButtons: [<Button key="send-all-now" {...buttonProps}/>],
        groupedActions: <DropdownButton {...dropdownProps}/>
    },
    {
        state: {
            archived: true
        },
        description: {
            numRecipientsAffected: 1,
            author: { name: 'Terry Teacher' }
        },
        filters: <DropdownFilters {...filterProps} />,
        singleButtons: [<Button key="send-all-now" {...buttonProps}/>],
        groupedActions: <DropdownButton {...dropdownProps}/>
    }];



module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll(dataAttr), function(domElement, index) {
            var el = <div>
                {props.map(function(_props, index){
                    return <TaskMetaActions {..._props} key={index} />;
                })}
            </div>
            ReactDOM.render(el, domElement);

        });
    });
};
