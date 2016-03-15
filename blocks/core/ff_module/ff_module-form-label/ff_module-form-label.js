'use strict';

var React = require('react');

var LabelTemplate = require('./ff_module-form-label.jsx');

module.exports = React.createClass({
    displayName: 'FormLabel',
    render: function() {
        var dataAttributes = {};
        if (this.props.data)
        {
            this.props.data.forEach(function(attribute) {
                dataAttributes[attribute.attr] = attribute.value;
            });
        }
        
        return <LabelTemplate {...this.props} data={dataAttributes} >{this.props.children}</LabelTemplate>;
    }
});