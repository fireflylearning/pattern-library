'use strict';
var React = require('react');

var ProfileResponseButton = require('./ff_module-profile-response-button');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-profile-response-button]'), function(domElement) {
            var element = React.createElement(ProfileResponseButton, {
                onSelect: function() {
                    console.log("onSelect");
                },
                isSelected: false,
                guid: "u42",
                label: "Sally Student",
                pic_href: "/images/default_picture.png"
            });
            React.render(element, domElement);
        });
    });
};
