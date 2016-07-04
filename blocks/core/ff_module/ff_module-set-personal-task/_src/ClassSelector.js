'use strict';

var React = require('react'),
    FormInput = require('../../../ff_module/ff_module-form-input/ff_module-form-input');

var props = {
    id: 'class-select',
    type: 'select'
};

module.exports = React.createClass({
    displayName: 'ClassSelector',
    render: function(){
        return (
            <FormInput {...this.props} onChange={event => this.setValue(event)} value='{this.state.value}' />
        );
    },
    onChange: function() {
        console.log('changed')
    }
});
