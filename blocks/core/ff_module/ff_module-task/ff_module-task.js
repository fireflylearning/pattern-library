'use strict';

var React = require('react'),
	Progress = require('../ff_module-progress/ff_module-progress.js'),
	FormInput = require('../ff_module-form-input/ff_module-form-input.js'),
	generateClass = require('../../_lib/_ui/class-utils.js').generateStandardClass;

import CountIndicator from '../ff_module-count-indicator/ff_module-count-indicator';

module.exports = React.createClass({
	displayName: 'Task',
	propTypes: {
		to: React.PropTypes.string.isRequired,
		message: React.PropTypes.string.isRequired,
		linkHref: React.PropTypes.string.isRequired,
		from: React.PropTypes.string,
		duedate: React.PropTypes.string,
		progress: React.PropTypes.object,
		modifier: React.PropTypes.string,
		classes: React.PropTypes.string,
		input: React.PropTypes.shape(FormInput.propTypes),
		indicator: React.PropTypes.object
	},
	render: function() {

		var meta = this.props.from ? <span className="ff_module-task__meta">{'Set by '+ this.props.from}</span> : null;

		var getDueDate = function(props) {
			if(props.duedate && props.fuzzydate) {
				return <div>
					<div>Due {props.fuzzydate}</div>
	                   			<time className="ff_util-prose__text--small-quiet">{props.duedate}</time>
	                   		</div>
			} else if(props.duedate) {
				return <div>Due {props.duedate}</div>
			} else {
				return <time className="ff_util-prose__text--small-quiet">{props.duedate}</time>
			}
		}

		var checkbox = this.props.hasCheckbox ? <dd className="ff_module-task__item ff_module-task__item--checkbox"><FormInput {...this.props.input} /></dd> : null;
		var progressBar = this.props.progress ? <dd className="ff_module-task__item ff_module-task__item--progress"><Progress {...this.props.progress} /></dd> : null;
		var progressBarClass = this.props.progress ? ' ff_module-task--with-progress-bar' : null;
		var responsesIndicator = this.props.indicator ? <CountIndicator modifier="top-right" {...this.props.indicator} /> : null;

		return 	<dl className={ generateClass('ff_module-task', this.props) + progressBarClass }>
					{checkbox}
					<dt className="ff_module-task__item ff_module-task__item--title">
						<p className="ff_module-task__to">{this.props.to}</p>
						<a href={this.props.linkHref} className="ff_module-task__link">{this.props.message}</a>
						{meta}
						{responsesIndicator}
					</dt>
				
					<dd className="ff_module-task__item ff_module-task__item--date">
						{getDueDate(this.props)}
					</dd>
					{progressBar}
				</dl>;
	}
});
