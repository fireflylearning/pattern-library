'use strict';
var React = require('react');

var Responses = require('./ff_module-responses');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student',
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    comment: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    error: true,
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
}].map(function(description, index) {
    return {
        description: description,
        localEventId: 'event' + index,
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }]
    };
});


var data = {
	responses: [{
		onSelect: function() {console.log('selected');},
		label: 'Sally Student',
		isSelected: true,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	},
	{
		onSelect: function() {console.log('selected');},
		label: 'Sandra Dubney',
		isSelected: false,
		pic_href: "/images/default_picture.png",
		events: events
	}]
};
module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-responses]'), function(domElement) {
			if(domElement){
				React.render(<Responses {...data} />,domElement);
			}

		});
	});
};
