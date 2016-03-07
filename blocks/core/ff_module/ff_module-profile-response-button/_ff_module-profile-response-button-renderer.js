'use strict';
var React = require('react');

var ProfileResponseButton = require('./ff_module-profile-response-button'),
eventTypes = require('../ff_module-task-event/_src/events').types;

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-profile-response-button]'), function(domElement) {
            var element = React.createElement(ProfileResponseButton, {
                onSelect: function() {
                    console.log("onSelect");
                },
                uiState: "is-updated",
                guid: "u42",
                label: "Sally Student",
                event:{
                    type: eventTypes.requestResubmission,
                    sent: new Date()
                },
                markAndGrade: {
                    mark: 7,
                    markMax: 10,
                    grade: "A"
                },
                pic_href: "/images/default_picture.png"
            });
            React.render(element, domElement);
        });
    });
};
