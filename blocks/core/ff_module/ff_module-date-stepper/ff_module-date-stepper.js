'use strict';

var React = require('react');
var IconSVG =  require('../../ff_icons/ff_icon-svg/ff_icon-svg').default;

export default class DateStepper extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'DateStepper';
	}
	generateIconProps(action) {
		if (action === "next") {
			return {
				name:"page-forward-blue",
				classes: "ff_module-date-stepper__icon--next"
			}
		} else if (action === "prev") {
			return {
				name:"page-back-blue",
				classes: "ff_module-date-stepper__icon--prev"
			}
		}
	}
	render() {
		return (
			<div className="ff_module-date-stepper">
				<a className="ff_module-date-stepper__link ff_module-date-stepper__link--prev" href={this.props.prevUrl}>
					<IconSVG {...this.generateIconProps("prev")} />
					<span className="ff_util-icon-text">Previous</span>
				</a>
				<h3 className="ff_module-date-stepper__title">
					<span className="ff_module-date-stepper__title--type">{this.props.niceDate}</span> 
					<span className="ff_module-date-stepper__title--date">{this.props.date}</span>
				</h3>
				<a className="ff_module-date-stepper__link ff_module-date-stepper__link--next" href={this.props.nextUrl}>
					<IconSVG {...this.generateIconProps("next")} />
					<span className="ff_util-icon-text">Next</span>
				</a>
			</div>
		);
	} 
}   
