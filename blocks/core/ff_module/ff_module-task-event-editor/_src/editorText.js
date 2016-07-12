'use strict';

var recipientText = {},
    sendTypeText = {},
    releaseTypes = {
        released: 'released',
        unreleased: 'unreleased'
    },
    recipientTypes = {
        individual: 'individual',
        all: 'all'
    },
    nextStudent = 'and Next Student';

recipientText[recipientTypes.individual] = '';
recipientText[recipientTypes.all] = 'for All Students';

sendTypeText[releaseTypes.released] = 'Send';
sendTypeText[releaseTypes.unreleased] = 'Save';


module.exports.getPrimaryButtonText = function getPrimaryButtonText(base, props) {
    var textItems = [];
    var eventState = props.event && props.event.state || {};

    if (eventState.released) {
        textItems.push(sendTypeText[releaseTypes.released]);
    } else {
        textItems.push(sendTypeText[releaseTypes.unreleased]);
    }

    textItems.push(base);

    if (eventState.allStudents) {
        textItems.push(recipientText[recipientTypes.all]);
    }

    return textItems.join(' ');
};

module.exports.getSecondaryButtonText = function getSecondaryButtonText(props) {
    var textItems = [];
    var eventState = props.event && props.event.state || {};

    if (eventState.released) {
        textItems.push(sendTypeText[releaseTypes.released]);
    } else {
        textItems.push(sendTypeText[releaseTypes.unreleased]);
    }
    textItems.push(nextStudent);
    return textItems.join(' ');
};
