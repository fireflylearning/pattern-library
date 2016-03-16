'use strict';

var React = require('react');

module.exports = React.createClass({
    render() {
        var optionalMarkerSet = !(this.props.optionalMarker === null || this.props.optionalMarker === undefined);
        var optionalMarker = optionalMarkerSet ? this.props.optionalMarker : '(optional)';
        return <label htmlFor={this.props.id} className={'ff_module-form-label' + (this.props.modifier != null ? ' ff_module-form-label--' + this.props.modifier : '')} {...this.props.data}>
            {this.props.children}
            {(!this.props.required) ? <span className="ff_module-form-label__optional"> {optionalMarker}</span> : ''}
        </label>;
    }
});
