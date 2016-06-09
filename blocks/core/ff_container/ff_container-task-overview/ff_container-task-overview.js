'use strict';

var React = require('react');

var ContainerTaskOverview = function ContainerTaskOverview(props) {
    return (
        <div className="ff_container-task-overview">
            {props.children}
        </div>
    );
}

module.exports = ContainerTaskOverview;
