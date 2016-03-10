'use strict';

var React = require('react');

module.exports = React.createClass({
    render() {
        return <label htmlFor={this.props.to} className={'ff_module-form-label' + (this.props.modifier != null ? ' ff_module-form-label--' + this.props.modifier : '')} {...this.props.data}>
            {this.props.children}
            {(!this.props.required) ? <span className="ff_module-form-label__optional"> (optional)</span> : ''}
        </label>;
    }
}