'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ProfileResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button.js');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater.js');
function repeatResponse1(response, responseIndex) {
    return React.createElement(ProfileResponseButton, {
        'key': 'list-profile-response-btn-' + response.guid,
        'uiState': response.uiState,
        'guid': response.guid,
        'label': response.label,
        'status': response.status,
        'markAndGrade': response.markAndGrade,
        'onSelect': response.onSelect,
        'pic_href': response.pic_href
    });
}
module.exports = function () {
    return React.createElement.apply(this, [
        ItemRepeater,
        { 'modifier': 'separated' },
        _.map(this.props.responses, repeatResponse1.bind(this))
    ]);
};