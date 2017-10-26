'use-strict';
var generateClass = require('../../_lib/_ui/class-utils.js').generateStandardClass;
import React from 'react';

export default class CountIndicator extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <span className={generateClass('ff_module-count-indicator', this.props)} title={this.props.title}>{this.props.count}</span>
	}
}