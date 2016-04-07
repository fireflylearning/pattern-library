'use strict';

var React = require('react');

function generateClass(base, props) {
    var classNames = [];
    props = props || {};
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    return classNames.join(' ');
}

module.exports = React.createClass({
	displayName: 'FormInput',
	render: function() {

        var attributes = {},
            className = generateClass('ff_module-form-input', this.props);

		if (this.props.type == 'checkbox' || this.props.type == 'radio') {
			if (this.props.checked) {
				attributes['checked'] = true;
			}
			if (this.props.disabled) {
				attributes['disabled'] = true;
			}
		}

		if (this.props.data) {
			this.props.data.forEach(function(attribute) {
				attributes[attribute.attr] = attribute.value;
			});
		}

		if (this.props.type == 'select') {
			var options = this.props.options.map(function(option) {
				return <option value={option.value}>{option.text}</option>;
			});

			return <select className={className} name={this.props.name} {...attributes} onChange={this.props.onChange} onClick={this.props.onClick} id={this.props.id}>{options}</select>;

        } else if (this.props.type == 'textarea') {

            return <textarea className={className} name={this.props.name} {...attributes} onChange={this.props.onChange} onClick={this.props.onClick} id={this.props.id} value={this.props.value}></textarea>;
        } else {

        	return <input className={className} name={this.props.name} {...attributes} onChange={this.props.onChange} onClick={this.props.onClick} id={this.props.id} value={this.props.value} type={this.props.type ? this.props.type : 'text'} ></input>;
		}
	}
});
