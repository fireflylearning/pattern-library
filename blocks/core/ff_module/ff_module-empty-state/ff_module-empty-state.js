'use strict';

var React = require('react');

export default class EmptyState extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'EmptyState';
	}
	renderEmptyState() {
		var image = this.props.image ? <div className="ff_module-empty-state__item ff_module-empty-state__item--decoration">{this.props.image}</div> : "";
		var headline = this.props.headline ? <div className="ff_module-empty-state__item ff_module-empty-state__item--headline">{this.props.headline}</div> : "";
		var explanation = this.props.explanation ? <div className="ff_module-empty-state__item ff_module-empty-state__item--explanation">{this.props.explanation}</div> : "";
		var callToAction = this.props.callToAction ? <div className="ff_module-empty-state__item ff_module-empty-state__item--calltoaction">{this.props.callToAction}</div> : "";
		
		return <div className="ff_module-empty-state">{image}{headline}{explanation}{callToAction}</div>;
	}
	render() {
		return this.renderEmptyState();
	} 
}   
