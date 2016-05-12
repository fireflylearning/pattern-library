'use strict';
var ReactDOM = require('react-dom');

var OnlineStatus = require('./ff_module-online-status');
var attr = '[data-ff_module-online-status]';

var props = {
    state : {
        offline: true
    }
};



module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector(attr);
        if (element) {
            ReactDOM.render(<OnlineStatus {...props} />, element);
        }
    });
};
