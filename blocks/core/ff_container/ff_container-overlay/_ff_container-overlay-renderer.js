'use strict';

var React = require('react');

var ContainerOverlay = require('./ff_container-overlay');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_container-overlay]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = React.createElement(ContainerOverlay,
            {
                modifier: 'split',
                classes: 'ff_other-class',
                body: React.createElement('span',
                            { className:'crate_util-block' },
                            'The body of the page'),
                bar: React.createElement('span',
                            { className:'crate_util-block' },
                            'The overlay bar for the page')
            });
            React.render(element, root);
        }
    });
};
