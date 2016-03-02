'use strict';
var React = require('react');

var IncrementalNavigation = require('./ff_module-incremental-navigation');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_module-incremental-navigation]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = React.createElement(IncrementalNavigation, {
                nextText: 'Next Student',
                previousText: 'Previous Student',
                isFirst: false,
                isLast: true,
                onNext: function(){
                    console.log('Click Next Student');
                },
                onPrevious: function(){
                    console.log('Click Previous Student');
                }
            });
            React.render(element, root);
        }
    });
};
