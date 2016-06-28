'use strict';

var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;
var stateClasses = require('./presentationStates').stateClasses;
var presentationStates = require('./presentationStates').presentationStates;
var eventStates = require('./events').states;

function formatDate(date) {
    var validDate = ensureIsDate(date);
    if (validDate) {
        return dateFormatting.niceDate(date);
    }
    return '';
}

function getPresentationState(state) {
    state = state || {};
    var presentationState = eventStates.default;

    if (state[eventStates.deleted] || state[eventStates.deleteSuccess]) {
        presentationState = presentationStates.deleted;
    } else if (state[eventStates.edited] || state[eventStates.editSuccess]) {
        presentationState = presentationStates.edited;
    }

    return presentationState;
}

function generateClass(base, props) {
    var classNames = [];
    classNames.push(base);
    var description = props.description || {},
        presentationClass = stateClasses[getPresentationState(props.state)];

    if (description.type) classNames.push(base + '--' + description.type);
    if (presentationClass) classNames.push(base + presentationClass);
    if (props.modifier) classNames.push(base + '--' + props.modifier);
    return classNames.join(' ');
}

module.exports.formatDate = formatDate;
module.exports.getPresentationState = getPresentationState;
module.exports.generateClass = generateClass;
