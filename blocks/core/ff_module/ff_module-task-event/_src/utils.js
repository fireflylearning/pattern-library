'use strict';

var stateClasses = require('./presentationStates').stateClasses;
var presentationStates = require('./presentationStates').presentationStates;
var eventStates = require('./events').states;

// Taken from SQLKeyRing.cs (combination of short and full regex)
const urlRegex = /(www(\.[A-Za-z0-9\-]+){2,})|(([A-Za-z]{3,9}):\/\/)([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/;

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

function urlifyText(text) {
    let urlTextArray = [];
    let parts = text.split(" ");

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].match(urlRegex)) {
            urlTextArray.push(<a key={'link' + i} href={parts[i]} target='_blank'>{parts[i]}</a>);
        }
        else {
            urlTextArray.push(parts[i]);
        }

        if (i < parts.length - 1) {
            urlTextArray.push(" ");
        }
    }
    return urlTextArray;
}

function breakifyComponents(tags) {
    var out = [];
    tags.forEach(tag => {
        if (typeof tag == "string") {
            var lines = tag.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
            out.push(lines.shift());
            lines.forEach(line => {
                out.push(<br />);
                out.push(line);
            });
        } else {
            out.push(tag);
        }
    });
    return out;
}

module.exports.getPresentationState = getPresentationState;
module.exports.generateClass = generateClass;
module.exports.urlifyText = urlifyText;
module.exports.breakifyComponents = breakifyComponents;
