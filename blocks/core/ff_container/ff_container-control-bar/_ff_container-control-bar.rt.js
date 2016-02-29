'use strict';
var React = require('react/addons');
var _ = require('lodash');
function repeatSet1(set, setIndex) {
    return React.createElement('div', {
        'className': 'ff_container-control-bar__group',
        'key': setIndex
    }, set.title ? React.createElement('h3', { 'className': 'ff_container-control-bar__title' }, set.title) : null, set.modules);
}
module.exports = function () {
    return React.createElement.apply(this, [
        'div',
        { 'className': 'ff_container-control-bar' + (this.props.modifier ? ' ff_container-control-bar--' + this.props.modifier : '') + (this.props.classes ? ' ' + this.props.classes : '') },
        _.map(this.props.sets, repeatSet1.bind(this))
    ]);
};