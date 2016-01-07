'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ResultButton = require('../../ff_module-profile-picture-and-name-button/_ff_module-profile-picture-and-name-button-view');
function onSelect1(result, resultIndex) {
    this.props.onSelect(result.guid);
}
function repeatResult2(result, resultIndex) {
    return React.createElement('li', {
        'className': 'ff_module-recipient-button-list__item',
        'key': result.guid
    }, React.createElement(ResultButton, {
        'guid': result.guid,
        'label': result.label,
        'pic_href': result.pic_href,
        'isSelected': this.props.isSelected(result.guid),
        'onSelect': onSelect1.bind(this, result, resultIndex)
    }));
}
module.exports = function () {
    return React.createElement.apply(this, [
        'ul',
        { 'className': 'ff_module-recipient-button-list' },
        _.map(this.props.results, repeatResult2.bind(this))
    ]);
};