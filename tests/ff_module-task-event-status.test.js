'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var TaskEventStatus = require('../blocks/core/ff_module/ff_module-task-event-status/ff_module-task-event-status'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, TaskEventStatus);

var eventStates = require('../blocks/core/ff_module/ff_module-task-event/_src/events').states;
var presentationStates = require('../blocks/core/ff_module/ff_module-task-event-status/_src/presentationStates').presentationStates;
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;

var deletedStates = [
    eventStates.default,
    eventStates.deleted
];

var serverStates = [
    eventStates.default,
    eventStates.pending,
    eventStates.error,
    eventStates.success,

    eventStates.editPending,
    eventStates.editError,
    eventStates.editSuccess,

    eventStates.deletePending,
    eventStates.deleteError,
    eventStates.deleteSuccess
];

var releaseStates = [
    eventStates.default,
    eventStates.released
];

var types = [
    eventTypes.stampResponseAsSeen
];

function getStatusMessage(presentationState) {

    var messages = {};
    messages[presentationStates.default] = '';

    messages[presentationStates.pendingSend]   = 'Sending';
    messages[presentationStates.sent]          = 'Sent';
    messages[presentationStates.erroredSend]   = 'Your response didn\'t send. Try again.';

    messages[presentationStates.pendingSave]   = 'Saving';
    messages[presentationStates.saved]         = 'Saved';
    messages[presentationStates.erroredSave]   = 'Your response didn\'t save. Try again.';

    messages[presentationStates.pendingEdit]           = 'Saving';
    messages[presentationStates.pendingEditReleased]   = 'Sending';
    messages[presentationStates.erroredEdit]           = 'Your edit didn\'t save. Try again.';
    messages[presentationStates.erroredEditReleased]   = 'Your edit didn\'t send. Try again.';

    messages[presentationStates.pendingDelete] = 'Deleting';
    messages[presentationStates.erroredDelete] = 'Your response didn\'t delete. Try again.';

    messages[presentationStates.unreleased]    = 'Ready to Send';

    return messages[presentationState] || '';
}

function getDeleteState(state) {
    var deleteState = '';
    state = state || {};
    if (state[eventStates.deleted] || state[eventStates.deleteSuccess]) {
        deleteState = presentationStates.deleted; // deleted overrides any send-states
    }
    // we don't care about edited, sent or saved here

    return deleteState;
}

function getReleaseState(state) {
    var releaseState = '';
    state = state || {};
    if (!state[eventStates.released]) {
        releaseState = presentationStates.unreleased;
    }
    return releaseState;
}

function getTransientDisplayState(eventState) {
    var transientDisplayState = '';

    eventState = eventState || {};

    if (eventState[eventStates.success] || eventState[eventStates.editSuccess]) {
        if (eventState[eventStates.released]) {
            transientDisplayState = presentationStates.sent;
        } else {
            transientDisplayState = presentationStates.saved;
        }
    }
    return transientDisplayState;
}

function getSendState(state) {
    var sendState = '';
    state = state || {};


    if (state[eventStates.error]) {
        if (state[eventStates.released]) {
            sendState = presentationStates.erroredSend;
        } else {
            sendState = presentationStates.erroredSave;
        }

    } else if (state[eventStates.editError]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.erroredEditReleased;
        } else {
            sendState = presentationStates.erroredEdit;
        }
    } else if (state[eventStates.deleteError]) {

        sendState = presentationStates.erroredDelete;

    } else if (state[eventStates.pending]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.pendingSend;
        } else {
            sendState = presentationStates.pendingSave;
        }

    } else if (state[eventStates.editPending]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.pendingEditReleased;
        } else {
            sendState = presentationStates.pendingEdit;
        }

    } else if (state[eventStates.deletePending]) {

        sendState = presentationStates.pendingDelete;

    }

    return sendState;
}

function getPresentationState(eventState) {

    var sendState = getSendState(eventState),
        editState = getDeleteState(eventState),
        transientDisplayState = getTransientDisplayState(eventState),
        releaseState = getReleaseState(eventState),

        presentationState = eventStates.default;

    if (editState) {
        presentationState = editState;
    } else if (sendState) {
        presentationState = sendState;
    } else if (transientDisplayState) {
        presentationState = transientDisplayState;
    } else if (releaseState) {
        presentationState = releaseState;
    }


    return presentationState;
}


function tryAgainCallback(){
    console.log('Error, retrying');
}

describe('TaskEventStatus', function() {

    it('should render', function() {
        var element = React.createElement(TaskEventStatus, {state:{},tryAgainCallback:tryAgainCallback});
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    types.forEach((type, tIndex)=>{
        return serverStates.forEach((sState, sIndex)=>{
            return deletedStates.forEach((eState, eIndex)=>{
                return releaseStates.forEach((rState, rIndex)=>{

                    var state = {};
                    state[eState] = true;
                    state[sState] = true;
                    state[rState] = true;

                    var presentationState = getPresentationState(state);
                    var expectedText = getStatusMessage(presentationState);

                    it('should render correct props for [' +eState+', ' +sState+', ' +rState+']', function() {
                        if ((eState === eventStates.deleted || sState === eventStates.deleteSuccess) ||
                            ((sState === eventStates.default) && (rState === eventStates.released))) {

                            var attemptToFindNode = function(){
                                getElementByClass({state: state, type: type, tryAgainCallback: tryAgainCallback}, 'ff_module-task-event-status__text');
                            };
                            expect(attemptToFindNode).to.throw(Error, /Did not find/);
                        } else {
                            var status = getElementByClass({state: state, type: type, tryAgainCallback: tryAgainCallback}, 'ff_module-task-event-status__text');
                            expect(status).to.exist;
                            expect(status.textContent).to.equal(expectedText);
                        }
                    });

                });
            });
        });
    });
});
