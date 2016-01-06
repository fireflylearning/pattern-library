'use strict';
var React = require('react/addons');
var _ = require('lodash');
var RecipientButtonList = require('../../ff_module/ff_module-recipient-button-list/_ff_module-recipient-button-list-view.js');
module.exports = function () {
    return React.createElement(RecipientButtonList, {
        'results': this.state.results,
        'isSelected': this.picker.checkIsSelected,
        'onSelect': this.addRecipientByResultId
    });
};