'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');
var _ = require('lodash');

var DropdownButton = require('./ff_module-dropdown-button-component');
var checkbox = {
    type: 'checkbox',
    text: 'Item D'
};
var list = [{
    href: '#',
    text: 'Item A'
}, {
    href: '#',
    text: 'Item B'
}, {
    href: '#',
    text: 'Item C'
}, {
    onClick: function() {
        console.log('doing stuff');
    },
    text: 'Item C2'
}];

var buttonProps = [{
    text: 'Dropdown button d',
}, {
    text: 'Button block',
    modifier: 'block',
}, {
    text: 'Button open',
    isOpen: true,
}, {
    text: 'Button primary',
    modifier: 'primary',
}, {
    text: 'Button compact',
    modifier: 'compact',
}, {
    text: 'Button primary compact',
    modifier: 'primary-compact',
}, {
    text: 'Button compact right',
    modifier: 'compact-right',
}, {
    text: 'Button primary compact right',
    modifier: 'primary-compact-right',
}, {
    text: 'Button disabled',
    isDisabled: true,
}, {
    text: 'Icon Button',
    icon: 'response-edit'
}, {
    text: 'Icon Button hideText',
    icon: 'response-edit',
    hideText: true
}, {
    text: 'Icon Button icon only',
    icon: 'response-edit',
    hideArrow: true,
}, {
    text: 'Link Button',
    modifier: 'link'
}, {
    text: 'Icon Link Button',
    icon: 'calendar',
    modifier: 'link'
}, {
    text: 'Icon Button hide text link',
    icon: 'response-edit',
    hideText: true,
    modifier: 'link'
}, {
    text: 'Icon Button icon only',
    icon: 'response-edit',
    hideArrow: true,
    modifier: 'link'
}, {
    text: 'Link Button right',
    modifier: 'link-right'
}, {
    text: 'Icon Link Button right',
    icon: 'calendar',
    modifier: 'link-right'
}, {
    text: 'Icon Button hide text link right',
    icon: 'response-edit',
    hideText: true,
    modifier: 'link-right'
}, {
    text: 'Icon Button icon only right',
    icon: 'response-edit',
    hideArrow: true,
    modifier: 'link-right'
}];

buttonProps = buttonProps.map(function(props) {
    return _.assign({}, props, {
        list: [].concat(list, _.assign({}, checkbox, {
            id: _.uniqueId('dd_list-')
        }))
    });
});
buttonProps.push({
    text: 'Button checklist',
    list: [{
        type: 'checkbox',
        onChange: function(event) {
            console.log('click button checklist');
        },
        text: 'Awaiting Response',
        id: 'checkbox-1'
    }, {
        type: 'checkbox',
        onChange: function(event) {
            console.log('click button checklist');
        },
        text: 'Approved',
        id: 'checkbox-2'
    }, {
        type: 'checkbox',
        onChange: function(event) {
            console.log('click button checklist');
        },
        text: 'Response Received',
        id: 'checkbox-3'
    }]
});

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-dropdown-button-component]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, buttonProps.map(function(props, propsIndex) {
                return React.createElement('li', { key: 'li' + propsIndex, style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(DropdownButton, props));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
