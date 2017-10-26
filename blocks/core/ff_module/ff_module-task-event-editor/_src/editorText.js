'use strict';
var events = require('../../ff_module-task-event/_src/events');

var recipientText = {},
    sendTypeText = {},
    releaseModes = {
        Batched: 0,
        Immediate: 1
    },
    recipientTypes = {
        individual: 'Individual',
        all: 'All'
    },
    nextStudent = 'and Next Student';

recipientText[recipientTypes.individual] = '';
recipientText[recipientTypes.all] = 'for All Students';

sendTypeText[releaseModes.Immediate] = 'Send';
sendTypeText[releaseModes.Batched] = 'Save';

module.exports.getPrimaryButtonText = function getPrimaryButtonText(base, props) {
    var textItems = [];
    var eventState = props.event && props.event.state || {};
    var eventDescription = props.event && props.event.description || {};

    if (eventDescription.type !== events.types.revertTaskToToDo) {
        if (eventState.released) {
            textItems.push(sendTypeText[releaseModes.immediate]);
        } else {
            textItems.push(sendTypeText[releaseModes[props.releaseMode]]);
        }
    }

    textItems.push(base);

    if (props.allStudents) {
        textItems.push(recipientText[recipientTypes.all]);
    }

    return textItems.join(' ');
};

module.exports.getSecondaryButtonText = function getSecondaryButtonText(props) {
    var textItems = [];
    var eventState = props.event && props.event.state || {};

    if (eventState.released) {
        textItems.push(sendTypeText[releaseModes.immediate]);
    } else {
        textItems.push(sendTypeText[releaseModes[props.releaseMode]]);
    }

    textItems.push(nextStudent);
    return textItems.join(' ');
};
