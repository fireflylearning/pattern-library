'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ProfileResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button.js');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater.js');
function onSelect1(response, responseIndex) {
    this.props.onSelect(response.recipient);
}
function repeatResponse2(response, responseIndex) {
    return React.createElement(ProfileResponseButton, {
        'key': 'list-profile-response-btn-' + response.guid,
        'isRead': response.isRead,
        'isSelected': response.isSelected,
        'label': response.label,
        'event': response.latestEvent,
        'markAndGrade': response.markAndGrade,
        'onSelect': onSelect1.bind(this, response, responseIndex),
        'pic_href': response.pic_href
    });
}
module.exports = function () {
    return React.createElement.apply(this, [
        ItemRepeater,
        { 'modifier': 'separated' },
        _.map(this.props.responses, repeatResponse2.bind(this))
    ]);
};