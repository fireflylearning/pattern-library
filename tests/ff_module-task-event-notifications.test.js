'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');



var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');


var TaskEventNotifications = require('../blocks/core/ff_module/ff_module-task-event-notifications/ff_module-task-event-notifications'),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;

var NotificationBase = require('../blocks/core/ff_module/ff_module-task-event-notifications/_src/NotificationBase'),
    NotificationDeleteTask = require('../blocks/core/ff_module/ff_module-task-event-notifications/_src/NotificationDeleteTask');


var events = [{
    type: eventTypes.deleteTask,
    sent: new Date(),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 123
},{
    type: eventTypes.releaseFeedbackAndMarks,
    sent: new Date(),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 23
},{
    type: eventTypes.sendReminder,
    sent: new Date(),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 38
}].map(function(event){
    return {
        description: event
    };
});

var types = {};
types[eventTypes.deleteTask] = NotificationDeleteTask;
types[eventTypes.releaseFeedbackAndMarks] = NotificationBase;
types[eventTypes.sendReminder] = NotificationBase;

describe('TaskEventNotifications', function() {

    it('should render', function() {
        var element = React.createElement(TaskEventNotifications, {
                        event: events[0],
                        onConfirm: function() {
                            console.log('confirm');
                        },
                        onClose: function() {
                            console.log('close');
                        }
                    });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render correct views for each event type', function(){
        events.forEach(function(event) {
            var element = React.createElement(TaskEventNotifications, {
                    event: event,
                    onConfirm: sinon.spy(),
                    onClose: sinon.spy(),
                });
            var component = TestUtils.renderIntoDocument(element);
            var viewType = TestUtils.findRenderedComponentWithType(component, types[event.type]);
            expect(viewType).to.exist;
        });
    });


});
