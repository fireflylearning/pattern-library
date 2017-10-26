'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventStatus = require('./ff_module-task-event-status');
var eventStates = require('../ff_module-task-event/_src/events').states;
var eventTypes = require('../ff_module-task-event/_src/events').types;

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

function tryAgainCallback(){
    console.log('Retrying');
}

var renderedStates = [];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-status]'), function(domElement, index) {
            var root = <ul style={{ listStyle: 'none', margin: 0, padding: '5px', backgroundColor:'#fff' }}>
                {types.map((type, tIndex)=>{
                    return serverStates.map((sState, sIndex)=>{
                        return deletedStates.map((dState, dIndex)=>{
                            return releaseStates.map((rState, rIndex)=>{
                                var state = {};

                                state[sState] = true;
                                state[dState] = true;
                                state[rState] = true;

                            var key = '' + JSON.stringify(state);
                            // console.log(key, releaseStates[key]);

                            if (releaseStates[key]) return null;

                            releaseStates[key] = state;

                            return <li key={'li'+sState+''+dState+''+rState+''+tIndex} style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' }}>
                                <pre>{sState + ' & ' + dState + ' & ' + rState}</pre>
                                <TaskEventStatus state={state} type={type} tryAgainCallback={tryAgainCallback} />
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
