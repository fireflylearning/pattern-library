'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerFormErrors = require('./ff_container-form-errors');
var props = {
    modifier: 'full-width'
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-form-errors]');
        var formLine =  <ContainerFormErrors {...props}>
                            Form Errors
                        </ContainerFormErrors>;
        if (element) {
          ReactDOM.render(formLine, element);
        }
    });
};
