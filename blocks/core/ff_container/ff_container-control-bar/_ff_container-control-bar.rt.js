'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ControlBarSet = require('./_src/_ControlBarSet.js');
function repeatSet1(set, setIndex) {
    return React.createElement(ControlBarSet, {
        'title': set.title,
        'key': setIndex
    }, set.modules);
}
module.exports = function () {
    return React.createElement.apply(this, [
        'div',
        { 'className': 'ff_container-control-bar' + (this.props.modifier ? ' ff_container-control-bar--' + this.props.modifier : '') + (this.props.classes ? ' ' + this.props.classes : '') },
        _.map(this.props.sets, repeatSet1.bind(this)),
        this.props.children
    ]);
};