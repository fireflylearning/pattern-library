'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');


var TaskEventEditor = require('../blocks/core/ff_module/ff_module-task-event-editor/ff_module-task-event-editor'),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types,
    eventStates = require('../blocks/core/ff_module/ff_module-task-event/_src/events').states;

var EditorBase = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorBase'),
    EditorBaseMini = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorBaseMini'),
    EditorCommon = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorCommon'),
    EditorMarkAndGrade = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorMarkAndGrade'),
    EditorAddFile = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorAddFile'),
    ContainerDialog = require('../blocks/core/ff_container/ff_container-dialog/ff_container-dialog'),
    dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];


var events = [{
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
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B'
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    erroredSend: true,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    erroredSave: true,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}].map(function(event) {
    return {
        description: event,
        state: {}
    };
});

var types = {};
types[eventTypes.stampResponseAsSeen] = [EditorBase, EditorCommon];
types[eventTypes.requestResubmission] = [EditorBase, EditorCommon];
types[eventTypes.confirmTaskIsComplete] = [EditorBase, EditorCommon];
types[eventTypes.confirmStudentIsExcused] = [EditorBase, EditorCommon];
types[eventTypes.comment] = [EditorBase, EditorCommon];
types[eventTypes.markAndGrade] = [EditorBase, EditorMarkAndGrade];

types[eventTypes.addFile] = [EditorBase, EditorAddFile];
types[eventTypes.deleteResponse] = [EditorBaseMini, ContainerDialog];
types[eventStates.erroredSend] = [EditorBaseMini, ContainerDialog];
types[eventStates.erroredSave] = [EditorBaseMini, ContainerDialog];

describe('TaskEventEditor', function() {

    it('should render', function() {

        var element = React.createElement(TaskEventEditor, {
                        event: events[0],
                        onSend: sinon.spy(),
                        onChange: sinon.spy(),
                        onClose: sinon.spy(),
                    });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render correct views for each event type', function(){
        events.forEach(function(event) {
            var element = React.createElement(TaskEventEditor, {
                    event: event,
                    onSend: sinon.spy(),
                    onChange: sinon.spy(),
                    onClose: sinon.spy(),
                });
            var component = TestUtils.renderIntoDocument(element);
            var typeName = event.type;

            if (event.erroredSave) typeName = eventStates.erroredSave;
            else if (event.erroredSend) typeName = eventStates.erroredSend;

            var rootView = TestUtils.findRenderedComponentWithType(component, types[typeName][0]);
            expect(rootView).to.exist;
            var subView = TestUtils.findRenderedComponentWithType(rootView, types[typeName][1]);
            expect(subView).to.exist;

        });
    });


});
