'use strict';

var React = require('react');

var Button = require('../../ff_module-button/ff_module-button');

var getPrimaryButtonText = require('./editorText').getPrimaryButtonText,
    getSecondaryButtonText = require('./editorText').getSecondaryButtonText;


var EditorButton = function EditorButton(props) {
    return <Button key={props.key} onClick={props.onClick} text={props.text} modifier="primary"/>
}


module.exports.getEditorControls = function getEditorControls(base, props, showSecondary) {
    var eventState = props.event && props.event.state || {};
    var btns = [<EditorButton key="primary" onClick={props.onSend} text={getPrimaryButtonText(base, props)} />];
    if (eventState.allStudents !== true && showSecondary === true) {
        btns.push(<EditorButton key="secondary" onClick={props.onNext} text={getSecondaryButtonText(props)}/>);
    }
    return btns;
};
