'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');
var _ = require('underscore');

var DropdownFilters = require('./ff_module-dropdown-filters');

var propsList = [
    {
        text: 'Filter by status - Checkbox',
        onAddFilter: function(id, event){
            console.log('filter '+id+' added');
        },
        onRemoveFilter: function(id, event){
            console.log('filter '+id+' removed');
        },
        isOpen: false,
        isDisabled: false,
        isRadioGrp: false,
        filters: [{
            name: 'Awaiting Response',
            id: 'filter-1'
        }, {
            isActive: true,
            name: 'Approved',
            id: 'filter-2'
        }, {
            name: 'Response Received',
            id: 'filter-3'
        }]
    }, {
        text: 'Filter by status - Radio',
        onAddFilter: function(id, event){
            console.log('filter '+id+' selected');
        },
        onRemoveFilter: function(id, event){
            console.log('This is a radio button');
        },
        isOpen: false,
        isDisabled: false,
        isRadioGrp: true,
        filters: [{
            name: 'Awaiting Response',
            id: 'filter-1-radio'
        }, {
            name: 'Approved',
            id: 'filter-2-radio'
        }, {
            name: 'Response Received',
            id: 'filter-3-radio'
        }]
    }
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-dropdown-filters]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, propsList.map(function(props, propsIndex) {
                return React.createElement('li', { key: 'li' + propsIndex, style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(DropdownFilters, props));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
