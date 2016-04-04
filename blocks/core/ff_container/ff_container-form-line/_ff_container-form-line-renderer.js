'use strict';
var React = require('react'),
ReactDOM = require('react-dom');

var FormLine = require('./ff_container-form-line');


var data = {
    formLine: [{
        content: <label htmlFor="id02"> Input label </label>
    }, {
        modifier: 'fullwidth',
        content: <input id="id02" type="text" value="Input fullwidth"></input>
    }]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-form-line]');
        if (element) {
		  ReactDOM.render(React.createElement(FormLine, data), element);
        }
	});
};
