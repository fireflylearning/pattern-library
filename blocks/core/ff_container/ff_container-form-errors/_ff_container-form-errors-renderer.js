'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerFormErrors = require('./ff_container-form-errors');


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_container-form-errors]');
        var formLine =  <ContainerFormErrors>
                            Form Errors
                        </ContainerFormErrors>;
        if (element) {
          ReactDOM.render(formLine, element);
        }
    });
};
