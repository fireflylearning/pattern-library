'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventStatus = require('./ff_module-task-event-status');
var eventStates = require('../ff_module-task-event/_src/events').states;
var eventTypes = require('../ff_module-task-event/_src/events').types;

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
    eventStates.default,
    // eventStates.released,
    eventStates.unreleased
];

var types = [
    eventTypes.stampResponseAsSeen
];

function onError(){
    console.log('Error, retrying');
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-status]'), function(domElement, index) {
            var root = <ul style={{ listStyle: 'none', margin: 0, padding: '5px', backgroundColor:'#fff' }}>
                {types.map((type, tIndex)=>{
                    return serverStates.map((sState, sIndex)=>{
                        return editStates.map((eState, eIndex)=>{
                            return releaseStates.map((rState, rIndex)=>{
                                var state = {};
                                state[eState] = true;
                                state[sState] = true;
                                state[rState] = true;

                            return <li key={'li'+eState+''+sState+''+rState+''+tIndex} style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' }}>
                                <pre>{sState + ' & ' + eState + ' & ' + rState}</pre>
                                <TaskEventStatus state={state} type={type} onError={onError} />
                                </li>;
                            })

                        })
                    })
                })}
            </ul>;

            ReactDOM.render(root, domElement);
        });
    });
};
