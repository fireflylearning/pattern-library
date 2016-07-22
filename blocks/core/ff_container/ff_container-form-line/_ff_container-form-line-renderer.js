'use strict';
var React = require('react'),
ReactDOM = require('react-dom');

var ContainerFormLine = require('./ff_container-form-line');

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-form-line]');
        var formLine =  <ContainerFormLine dataAnchor="true">
                            <label htmlFor="id02">Input label</label>
                            <input modifier="fullwidth" id="id02" type="text" value="Input fullwidth"></input>
                        </ContainerFormLine>;
        if (element) {
		  ReactDOM.render(formLine, element);
        }
	});
};
