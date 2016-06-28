'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var FormBoxMember = require('./ff_module-form-box-member');
var props = { label: "Member input name" , guid: "input-member-id", type: 'profile'};


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-form-box-member]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var repeater = React.createElement(FormBoxMember, props);

            ReactDOM.render(repeater, el);
        }
    });
};
