'use strict';
var React = require('react/addons');
var _ = require('lodash');
var TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event.js');
function repeatActionableEvent1(actionableEvent, actionableEventIndex) {
    return React.createElement('li', {
        'className': 'ff_container-task-event-repeater__item',
        'key': 'event-' + actionableEvent.event.localEventId
    }, React.createElement(TaskEvent, {
        'event': actionableEvent.event,
        'actions': actionableEvent.actions
    }));
}
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_container-task-event-repeater' }, React.createElement.apply(this, [
        'ol',
        { 'className': 'ff_container-task-event-repeater__items' },
        _.map(this.getEvents(), repeatActionableEvent1.bind(this))
    ]));
};