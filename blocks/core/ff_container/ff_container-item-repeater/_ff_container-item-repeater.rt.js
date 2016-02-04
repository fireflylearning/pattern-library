'use strict';
var React = require('react/addons');
var _ = require('lodash');
function repeatChild1(child, childIndex) {
    return React.createElement('li', { 'className': 'ff_container-item-repeater__item' }, '\n            ', child, '\n        ');
}
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_container-item-repeater' }, React.createElement.apply(this, [
        'ol',
        { 'className': 'ff_container-item-repeater__items' },
        _.map(React.Children.toArray(this.props.children), repeatChild1.bind(this))
    ]));
};