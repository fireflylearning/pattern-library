'use strict';
var React = require('react');

var ResponseRecipientList = require('./ff_module-response-recipient-list');

var responses = [{
    onSelect: function() {
        console.log("onSelect is0");
    },
    guid: "u47",
    label: "Sally Student",
    status: "Marked",
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    isSelected: true,
    guid: "u43",
    label: "Terry Teacher",
    status: "Resubmission Requested",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id2");
    },
    isRead: true,
    guid: "u44",
    label: "Joseph Goulden",
    status: "Awaiting Response",
    pic_href: "/images/default_picture.png"
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-response-recipient-list]'), function(domElement) {
            var element = React.createElement(ResponseRecipientList, {
                responses: responses
            });
            React.render(element, domElement);
        });
    });
};
