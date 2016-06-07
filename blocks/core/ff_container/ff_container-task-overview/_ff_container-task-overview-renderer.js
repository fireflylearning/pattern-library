'use strict';

var ReactDOM = require('react-dom'),
    React = require('react');

var ContainerTaskOverview = require('./ff_container-task-overview');

var children = [
    <div>Task Overview controls</div>,
    <div>Task Overview preview</div>
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_container-task-overview]'), function(domElement, index) {
            var overview =
                    <ContainerTaskOverview key={'to'+index}>
                        {children}
                    </ContainerTaskOverview>

            ReactDOM.render(overview, domElement);
        });
    });
};
