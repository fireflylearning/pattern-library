'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var TaskEventStatus = require('../blocks/core/ff_module/ff_module-task-event-status/ff_module-task-event-status'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, TaskEventStatus);

var eventStates = require('../blocks/core/ff_module/ff_module-task-event/_src/events').states;
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;

var editStates = [
    eventStates.default,
    eventStates.deleted,
    eventStates.saved,
    eventStates.sent,
    eventStates.edited
];

var serverStates = [
    eventStates.default,

    eventStates.pendingSend,
    eventStates.erroredSend,

    eventStates.pendingSave,
    eventStates.erroredSave,

    eventStates.pendingEdit,
    eventStates.erroredEdit,

    eventStates.pendingDelete,
    eventStates.erroredDelete,
];

var releaseStates = [
    eventStates.released,
    eventStates.unreleased
];

var types = [
    eventTypes.stampResponseAsSeen
];

function getStatusMessage(presentationState) {

    var messages = {};
    messages[eventStates.default] = '';

    messages[eventStates.pendingSend]   = 'Sending';
    messages[eventStates.sent]          = 'Sent';
    messages[eventStates.erroredSend]   = 'Your response didn\'t send. Try again.';

    messages[eventStates.pendingSave]   = 'Saving';
    messages[eventStates.saved]         = 'Saved';
    messages[eventStates.erroredSave]   = 'Your response didn\'t save. Try again.';

    messages[eventStates.pendingEdit]   = 'Editing';
    messages[eventStates.edited]        = '';
    messages[eventStates.erroredEdit]   = 'Your edit didn\'t send. Try again.';

    messages[eventStates.pendingDelete] = 'Deleting';
    messages[eventStates.deleted]       = '';
    messages[eventStates.erroredDelete] = 'Your response didn\'t delete. Try again.';

    messages[eventStates.released]      = '';
    messages[eventStates.unreleased]    = 'Ready to Send';

    return messages[presentationState] || '';
}

function getEditState(state) {
    var editState = '';
    state = state || {};
    if (state[eventStates.deleted]) {
        editState = eventStates.deleted; // deleted overrides any send-states
    }
    // we don't care about edited, sent or saved here

    return editState;
}

function getReleaseState(state) {
    var releaseState = '';
    state = state || {};
    if (state[eventStates.unreleased]) {
        releaseState = eventStates.unreleased;
    }
    return releaseState;
}

function getTransientDisplayState(eventState, uiState) {
    var transientDisplayState = '';

    eventState = eventState || {};

    if (uiState.transientDisplayStatesActive) {
        if (eventState[eventStates.saved]) {
            transientDisplayState = eventStates.saved;
        } else if (eventState[eventStates.sent]) {
            transientDisplayState = eventStates.sent;
        }
    }
    return transientDisplayState;
}

function getSendState(state) {
    var sendState = '';
    state = state || {};

    if (state[eventStates.erroredSend]) {
        sendState = eventStates.erroredSend;
    } else if (state[eventStates.erroredSave]) {
        sendState = eventStates.erroredSave;
    } else if (state[eventStates.erroredEdit]) {
        sendState = eventStates.erroredEdit;
    } else if (state[eventStates.erroredDelete]) {
        sendState = eventStates.erroredDelete;

    } else if (state[eventStates.pendingSend]) {
        sendState = eventStates.pendingSend;
    } else if (state[eventStates.pendingSave]) {
        sendState = eventStates.pendingSave;
    } else if (state[eventStates.pendingEdit]) {
        sendState = eventStates.pendingEdit;
    } else if (state[eventStates.pendingDelete]) {
        sendState = eventStates.pendingDelete;
    }

    return sendState;
}

function getPresentationState(eventState, uiState) {

    var sendState = getSendState(eventState),
        editState = getEditState(eventState),
        transientDisplayState = getTransientDisplayState(eventState, {transientDisplayStatesActive:true}),
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


function onError(){
    console.log('Error, retrying');
}

describe('TaskEventStatus', function() {

    it('should render', function() {
        var element = React.createElement(TaskEventStatus, {});
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    types.forEach((type, tIndex)=>{
        return serverStates.forEach((sState, sIndex)=>{
            return editStates.forEach((eState, eIndex)=>{
                return releaseStates.forEach((rState, rIndex)=>{

                    var state = {};
                    state[eState] = true;
                    state[sState] = true;
                    state[rState] = true;

                    var presentationState = getPresentationState(state);
                    var expectedText = getStatusMessage(getPresentationState(state));

                    it('should render correct props for [' +eState+', ' +sState+', ' +rState+']', function() {
                        if (eState === eventStates.deleted ||
                            ((eState !== eventStates.saved && eState !== eventStates.sent) &&
                                (sState === eventStates.default) &&
                                (rState !== eventStates.unreleased))) {

                            var attemptToFindNode = function(){
                                getElementByClass({state: state, type:type, onError:onError}, 'ff_module-task-event-status__text');
                            };
                            expect(attemptToFindNode).to.throw(Error, /Did not find/);
                        } else {
                            var status = getElementByClass({state: state, type:type, onError:onError}, 'ff_module-task-event-status__text');
                            expect(status).to.exist;
                            expect(status.textContent).to.equal(expectedText);
                        }
                    });

                });
            });
        });
    });
});
