'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var FormBoxGroup = require('./ff_module-form-box-group');
var props = { label: "Group input name" , guid: "input-group-id", type: 'groupprofile'};


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-form-box-group]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var repeater = React.createElement(FormBoxGroup, props);

            ReactDOM.render(repeater, el);
        }
    });
};
