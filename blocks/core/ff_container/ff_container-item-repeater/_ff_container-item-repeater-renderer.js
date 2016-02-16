'use strict';
var React = require('react');


var ItemRepeater = require('./ff_container-item-repeater');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff-container-item-repeater]'); //Use jquery or sim in Firefly for backwards compat
        // var el = document.getElementById('recipient-picker-container');
        if (el) {
            var repeater = React.render(React.createElement(ItemRepeater), el);
            // picker.getSelectedRecipients();
        }
    });
};
