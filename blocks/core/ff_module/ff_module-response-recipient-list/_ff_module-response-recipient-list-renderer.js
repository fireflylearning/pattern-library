'use strict';
var React = require('react');

var ResponseRecipientList = require('./ff_module-response-recipient-list');

var data = [{
        onSelect: function() {
            console.log("onSelect is0");
        },
        uiState: "",
        guid: "u42",
        label: "Sally Student",
        status: "Marked",
        mark: "B, 76%",
        pic_href: "/images/default_picture.png"
    },
    {
        onSelect: function() {
            console.log("onSelect id1");
        },
        uiState: "is-selected",
        guid: "u43",
        label: "Terry Teacher",
        status: "Resubmission Requested",
        pic_href: "/images/default_picture.png"
    },
    {
        onSelect: function() {
            console.log("onSelect id2");
        },
        uiState: "is-reviewed",
        guid: "u44",
        label: "Joseph Goulden",
        status: "Awaiting Response",
        pic_href: "/images/default_picture.png"
    }
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-response-recipient-list]'), function(domElement) {
            var element = React.createElement(ResponseRecipientList, {
                responses:data
            });
            React.render(element, domElement);
        });
    });
};
