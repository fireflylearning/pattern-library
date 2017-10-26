'use strict';

var React = require('react');

var LabelTemplate = React.createClass({
    render() {
        var optionalMarkerSet = !(this.props.optionalMarker === null || this.props.optionalMarker === undefined);
        var optionalMarker = optionalMarkerSet ? this.props.optionalMarker : '(optional)';
        return <label htmlFor={this.props.id} className={this.generateClass('ff_module-form-label')} {...this.props.data}>
            {this.props.children}
            {this.props.hint ? <span className="ff_module-form-label__hint">{' ('+this.props.hint+')'}</span> : null}
            {(!this.props.required && optionalMarker) ? <span className="ff_module-form-label__optional">{' '+optionalMarker}</span> : null}
        </label>;
    },
    generateClass(base) {
        var classNames = [],
            props = this.props;
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (props.valid === false) classNames.push(base + '--has-errors');
        if (!!props.classes) classNames.push(props.classes);
        if (!!props.className) classNames.push(props.className);
        return classNames.join(' ');
    }
});

module.exports = LabelTemplate;
