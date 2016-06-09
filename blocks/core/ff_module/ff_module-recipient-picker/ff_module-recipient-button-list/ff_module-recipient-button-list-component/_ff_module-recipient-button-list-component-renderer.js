'use strict';

var React = require('react');
var ReactDOM = require('react-dom');


var RecipientButtonList = require('./ff_module-recipient-button-list-component');
var mockService = require('./_ff_module-recipient-button-list-component-mockservice');
var props = {
    onSelect: function(){
        console.log('onSelect');
    },
    isSelected: function(id){
        return id === '125';
    },
    results: mockService.groups['your-groups']
};

module.exports = function() {

    document.addEventListener('DOMContentLoaded', function(event) {

        var el = document.querySelector('[data-ff_module-recipient-button-list-component]');

        if (el) {

            ReactDOM.render(<RecipientButtonList {...props}/>, el);
        }

    });

};
