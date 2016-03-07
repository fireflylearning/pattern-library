'use strict';
var React = require('react');

var FormInput = require('./ff_module-form-input');

var data = {
    id: 'input-id',
    value: 'Form input',
    name: 'input-name',
    data: [{
        attr: 'data-ff-attr',
        value: true
	}]
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        React.render(React.createElement(FormInput, data), document.querySelector('[data-ff_module-form-input]'));
    });
};
