'use strict';
var React = require('react');

var activateDropdowns = require('../ff_module-dropdown-button');

var DropdownButton = require('./ff_module-dropdown-button-component');
var list = [{
        href:'#',
        text: 'Item A'
    }, {
        href:'#',
        text: 'Item B'
    }, {
        href:'#',
        text: 'Item C'
    }];

var buttonProps = [{
    text: 'Dropdown button d',
    id: 'dd0',
    list: list
}, {
    text: 'Button block',
    id: 'btn-01a',
    modifier: 'block',
    list: list
}, {
    text: 'Button open',
    id: 'btn-01b',
    isOpen: true,
    list: list
}, {
    text: 'Button primary',
    id: 'btn-04',
    modifier: 'primary',
    list: list
}, {
    text: 'Button disabled',
    id: 'btn-05',
    isDisabled: true,
    list: list
}];


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-dropdown-button-component]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, buttonProps.map(function(props, propsIndex) {
                return React.createElement('li', { key: 'li'+propsIndex, style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(DropdownButton, props));
            }));
            React.render(root, domElement);

        });
        activateDropdowns();
    });
};
