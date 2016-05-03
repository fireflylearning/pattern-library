'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    _ = require('lodash');

var TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types;
var eventStates = require('../../ff_module/ff_module-task-event/_src/events').states;

var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student'
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    message: 'Please resubmit'
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'This task is complete'
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Student is excused'
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B',
    message: 'Great work!'
}, {
    type: eventTypes.confirmStudentIsUnexcused,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Student is unexcused'
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    files: [{
        title: 'File one',
        href: '#'
    }, {
        title: 'File two',
        type: 'page',
        href: '#'
    }]
}].map(function(description){
    return {
        description: description
    };
});

var m1States = [
    // eventStates.default,
    // eventStates.deleted,
    // eventStates.edited,
    eventStates.saved,
    eventStates.sent
];

var m2States = [
    eventStates.default,

    eventStates.released,
    eventStates.unreleased,

    // eventStates.pendingSend,
    // eventStates.erroredSend,

    // eventStates.pendingSave,
    // eventStates.erroredSave,

    // eventStates.pendingEdit,
    // eventStates.erroredEdit,

    // eventStates.pendingDelete,
    // eventStates.erroredDelete
];

var actions = [{
    key: 'edit',
    text: 'Edit',
    onClick: function() { console.log('edit'); }
}, {
    key: 'delete',
    text: 'Delete',
    onClick: function() { console.log('delete'); }
}];

function retryAfterStatusError() {
    console.log('[retryAfterStatusError]');
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(e) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-lib_test-task-event]'), function(domElement) {
            var root = <div>{m2States.map(function(m2State, key){
                                return m1States.map(function(m1State, key) {
                                    return  <section key={'section-'+m2State+m1State}>
                                    <h2><pre>{'Send state: \''+ m2State + '\' & Edit state: \'' + m1State+'\''}</pre></h2>
                                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {events.map(function(event, index){
                                            var eventDescription = event.description;
                                            var eventState = {};
                                            eventState[m1State] = true;
                                            eventState[m2State] = true;
                                            if (eventDescription.type === eventTypes.markAndGrade && m1State === eventStates.edited){
                                                eventState.markAndGradeEdited = true;
                                                eventState.messageEdited = true;
                                            }

                                            return  <li key={m2State+'-'+eventDescription.type+'-'+m1State}>
                                                        <pre>Response event: <b>{eventDescription.type}</b></pre>
                                                        <TaskEvent description={eventDescription} actions={actions} state={eventState} onRetryAfterStatusError={retryAfterStatusError} />
                                                    </li>
                                        })}
                                    </ul>
                                </section>;
                                })

                })}</div>;

            ReactDOM.render(root, domElement);
        });
    });
};
