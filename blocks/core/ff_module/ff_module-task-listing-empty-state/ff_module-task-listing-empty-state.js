'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;
var Button = require('../ff_module-button/ff_module-button.js');

module.exports = React.createClass({
    displayName: 'EmptyState',
    propTypes: {

    },
    render: function() {
        return <div className={generateClasses('ff_module-task-listing-empty-state', this.props)}>
            <p className="ff_module-task-listing-empty-state__text">You haven't set any tasks yet.</p>
            <div className="ff_module-task-listing-empty-state__action">
                <Button modifier="link" {...this.props.button} />
            </div>
        </div>
    }
});
