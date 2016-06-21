'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ProfileResponseButton = require('./ff_module-profile-response-button'),
    eventTypes = require('../ff_module-task-event/_src/events').types;

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-profile-response-button]'), function(domElement) {
            var element = React.createElement(ProfileResponseButton, {
                onSelect: function() {
                    console.log("onSelect");
                },
                lastEventWasAuthoredByCurrentUser: true,
                isSelected: false,
                isRead: false,
                label: "Sally Student",
                event:{
                    description: {
                        type: eventTypes.requestResubmission,
                        sent: new Date()
                    }
                },
                markAndGrade: {
                    mark: 7,
                    markMax: 10,
                    grade: "A"
                },
                pic_href: "/images/default_picture.png"
            });
            ReactDOM.render(element, domElement);
        });
    });
};
