'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventStatus = require('./ff_module-task-event-status');
var eventStates = require('../ff_module-task-event/_src/events').states;
var eventTypes = require('../ff_module-task-event/_src/events').types;

var m1States = [
    eventStates.default,
    eventStates.deleted
];
var m2States = [
    eventStates.error,
    eventStates.pending,
    eventStates.released,
    eventStates.unreleased,
    eventStates.saved
];

var types = [
    eventTypes.setTask,
    eventTypes.stampResponseAsSeen,
    eventTypes.requestResubmission,
    eventTypes.confirmStudentIsExcused,
    eventTypes.confirmTaskIsComplete,
    eventTypes.comment,
    eventTypes.markAndGrade,
    eventTypes.addFile
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-status]'), function(domElement, index) {
            var root = <ul style={{ listStyle: 'none', margin: 0, padding: '5px', backgroundColor:'#fff' }}>
                {types.map((type, tIndex)=>{
                    return m2States.map((m2State, m2Index)=>{
                        return m1States.map((m1State, m1Index)=>{
                            var state = {};
                            state[m1State] = true;
                            state[m2State] = true;

                            return <li key={'li'+m1State+''+m2State+''+tIndex} style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' }}>
                                <pre>{type + ': ' + m2State + ' & ' + m1State}</pre>
                                <TaskEventStatus state={state} type={type}/>
                                </li>;
                        })
                    })
                })}
            </ul>;

            ReactDOM.render(root, domElement);
        });
    });
};
