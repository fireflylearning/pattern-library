'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

export default class TextWithLabel extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'TextWithLabel';
	}
	
	render() {
		return <div className={generateClasses("ff_module-text-with-label" ,this.props)}>
			<div className="ff_module-text-with-label__label">
				{this.props.label}
			</div>
			<div className="ff_module-text-with-label__text">
				{this.props.text}
			</div>
		</div>
	} 
}   
