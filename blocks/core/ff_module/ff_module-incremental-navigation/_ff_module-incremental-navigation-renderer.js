'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var IncrementalNavigation = require('./ff_module-incremental-navigation');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_module-incremental-navigation]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = React.createElement(IncrementalNavigation, {
                nextText: 'Next Student',
                previousText: 'Previous Student',
                isFirst: false,
                isLast: false,
                onNext: function(){
                    console.log('Click Next Student');
                },
                onPrevious: function(){
                    console.log('Click Previous Student');
                }
            });
            ReactDOM.render(element, root);
        }
    });
};
