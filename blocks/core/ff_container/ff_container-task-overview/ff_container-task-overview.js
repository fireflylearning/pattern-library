'use strict';

var React = require('react');

var TaskOverview = function TaskOverview(props) {
    return (
        <div className="ff_module-task-overview">
            {props.children}
        </div>
    );
}

module.exports = TaskOverview;
