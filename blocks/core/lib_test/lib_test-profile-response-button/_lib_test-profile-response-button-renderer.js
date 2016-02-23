'use strict';
var React = require('react');

var ProfileResponseButton = require('../../ff_module/ff_module-profile-response-button/ff_module-profile-response-button');
var selector = 'data-ff_module-profile-response-button-lib';

var data = {
    id0: {
        onSelect: function() {
            console.log("onSelect is0");
        },
        guid: "u42",
        label: "Sally Student",
        status: "Marked",
        mark: "B, 76%",
        pic_href: "/images/default_picture.png"
    },
    id1: {
        onSelect: function() {
            console.log("onSelect id1");
        },
        isSelected: true,
        guid: "u43",
        label: "Terry Teacher",
        status: "Resubmission Requested",
        pic_href: "/images/default_picture.png"
    },
    id2: {
        onSelect: function() {
            console.log("onSelect id2");
        },
        isRead: true,
        guid: "u44",
        label: "Joseph Goulden",
        status: "Awaiting Response",
        pic_href: "/images/default_picture.png"
    }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('['+selector+']'), function(domElement) {
            var id = domElement.getAttribute(selector);
            console.log(id);
            var element = React.createElement(ProfileResponseButton, data[id]);
            React.render(element, domElement);
        });
    });
};
