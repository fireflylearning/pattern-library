'use strict';
var React = require('react');

var ResponseRecipientList = require('./ff_module-response-recipient-list'),
    eventTypes = require('../ff_module-task-event/_src/events').types;

var responses = [{
    recipient: {
        name: 'rudy'
    },
    guid: "u47",
    label: "Sally Student",
    latestEvent: {
        description: {
            type: eventTypes.markAndGrade,
            sent: new Date()
        }
    },
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    recipient: {
        name: 'ffolay'
    },
    isSelected: true,
    guid: "u43",
    label: "Terry Teacher",
    latestEvent: {
        description: {
            type: eventTypes.requestResubmission,
            sent: new Date()
        }
    },
    markAndGrade: {
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    recipient: {},
    isRead: true,
    guid: "u44",
    label: "Joseph Goulden",
    latestEvent: {
        description: {
            type: eventTypes.confirmTaskIsComplete,
            sent: new Date()
        }
    },
    pic_href: "/images/default_picture.png"
},{
    recipient: {
        name: 'rudy'
    },
    lastEventWasAuthoredByCurrentUser: true,
    guid: "u42",
    label: "Sally Student",
    latestEvent: {
        description: {
            type: eventTypes.markAndGrade,
            sent: new Date()
        }
    },
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    recipient: {
        name: 'ffolay'
    },
    lastEventWasAuthoredByCurrentUser: true,
    isSelected: true,
    guid: "u41",
    label: "Terry Teacher",
    latestEvent: {
        description: {
            type: eventTypes.requestResubmission,
            sent: new Date()
        }
    },
    markAndGrade: {
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    recipient: {},
    lastEventWasAuthoredByCurrentUser: true,
    isRead: true,
    guid: "u40",
    label: "Joseph Goulden",
    latestEvent: {
        description: {
            type: eventTypes.confirmTaskIsComplete,
            sent: new Date()
        }
    },
    pic_href: "/images/default_picture.png"
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-response-recipient-list]'), function(domElement) {
            var element = React.createElement(ResponseRecipientList, {
                responses: responses,
                onSelect: function(recipient){
                    console.log(recipient);
                },
                currentTaskResponse: <span className='crate_util-block'>Component</span>
            });
            React.render(element, domElement);
        });
    });
};
