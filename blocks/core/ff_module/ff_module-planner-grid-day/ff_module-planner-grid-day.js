'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

export default class PlannerGridDay extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'PlannerGridDay';
	}
	isEmptyEvent(event) {
		return event.subject ? false : true;
	}
	generateEventModifier(event) {
		let modifier = this.isEmptyEvent(event) ? " ff_module-planner-grid-day__item--empty" : " ff_module-planner-grid-day__item--event";
		return "ff_module-planner-grid-day__item" + modifier;
	}
	generateSingleEvent(event) {
		if(this.isEmptyEvent(event)) {
			return <span className="ff_util-prose__left-blank">No lesson in timetable</span>;
		} else {
			return (
				<div className="ff_module-planner-grid-day__event">
					<div className="ff_module-planner-grid-day__event ff_module-planner-grid-day__event--class">
						<a className="ff_module-planner-grid-day__event ff_module-planner-grid-day__event--link" href={event.url}>
							{event.class}
						</a>
					</div>
					<div className="ff_module-planner-grid-day__event ff_module-planner-grid-day__event--details">
						<span className="ff_module-planner-grid-day__event ff_module-planner-grid-day__event--details">
							{event.subject + ", " + event.location}
						</span>
					</div>
				</div>
			);
		}
	}
	generateEvents(props) {
		let events = props.events.map((event, index)=>{
			return (
				<tr className="ff_module-planner-grid-day__row" data-event-guid={event.guid}>
					<th scope="row" className="ff_module-planner-grid-day__header">
						{event.startDate + "-" + event.endDate}
					</th>
					<td style={{borderLeftColor: event.color}} className={this.generateEventModifier(event)}>
						{this.generateSingleEvent(event)}
					</td>
					<td className="ff_module-planner-grid-day__item ff_module-planner-grid-day__item--note">
						{event.note}
					</td>
				</tr>
			);
		})

		return events;
	}
	render() {
		return <div className={generateClasses("ff_module-planner-grid-day" ,this.props)}>
			<table className="ff_module-planner-grid-day__content">
				<tbody>
					{this.generateEvents(this.props)}
				</tbody>
			</table>
		</div>;
	} 
}   
