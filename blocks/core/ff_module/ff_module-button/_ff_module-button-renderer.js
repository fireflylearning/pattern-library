'use strict';
var React = require('react');

var Button = require('./ff_module-button');

var buttonProps = [{
    text: 'Button large',
    id: 'btn-01',
    modifier: 'large'
}, {
    text: 'Button with icon',
    id: 'btn-02',
    icon: 'calendar',
}, {
    text: 'Button with icon right',
    id: 'btn-02',
    icon: 'calendar',
    iconAlign: 'right'
},{
    text: 'Button tertiary',
    id: 'btn-03',
    modifier: 'tertiary',
    hide_text: false
}, {
    text: 'Button primary',
    id: 'btn-04',
    modifier: 'primary',
}, {
    text: 'Button with classes, disabled',
    id: 'btn-04',
    classes: 'ff_other-class',
    disabled: true
}, {
    text: 'Button disabled',
    id: 'btn-05',
    disabled: true
}];



module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-buttons]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, buttonProps.map(function(props) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(Button, props));
            }));
            React.render(root, domElement);
        });
    });
};
