'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ProfilePicAndNameButton = require('./ff_module-profile-picture-and-name-button');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_module-profile-picture-and-name-button]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = React.createElement(ProfilePicAndNameButton, {
                label: 'Sally Student',
                pic_href: '/images/default_picture.png',
                guid: 'profile-guid',
                showImage: false,
                onSelect: function(){
                    console.log('Select Sally Student');
                }
            });
            ReactDOM.render(element, root);
        }
    });
};
