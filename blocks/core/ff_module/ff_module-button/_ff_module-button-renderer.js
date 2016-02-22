'use strict';
var React = require('react');

var Button = require('./ff_module-button');

var buttonProps = [{
    text: 'Button default',
    id: 'btn-01'
}{
    text: 'Button with icon',
    id: 'btn-01',
    modifier: 'large',
    icon: 'calendar',
    hide_text: false,
    disabled: true
}, {
    text: 'Button tertiary',
    id: 'btn-01',
    modifier: 'tertiary',
    icon: 'calendar',
    hide_text: false
},{
    text: 'Button primary',
    id: 'btn-01',
    modifier: 'primary',
}];



module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-buttons]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, buttonProps.map(function(props) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } }, React.createElement(Button, props))
            }));
            React.render(root, domElement);
        });
    });
};
