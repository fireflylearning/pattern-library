'use strict';

var React = require('react');
var Button = require('../../ff_module-button/ff_module-button');

var getPrimaryButtonText = require('./editorText').getPrimaryButtonText,
    getSecondaryButtonText = require('./editorText').getSecondaryButtonText;


var EditorButton = function EditorButton(props) {
    return <Button {...props} modifier="primary"/>
}

module.exports.getEditorControls = function getEditorControls(base, props, showSaveAndNext) {
    var buttons = [<EditorButton key="primary" onClick={e=>props.onSend(props.event, props.eventForm.valid)} text={getPrimaryButtonText(base, props)}/>];

    if (props.showSaveAndNext === true && showSaveAndNext === true) {
        buttons.push(<EditorButton key="secondary" onClick={e=>props.onNext(props.event, props.eventForm.valid)} text={getSecondaryButtonText(props)}/>);
    }
    return buttons;
};
