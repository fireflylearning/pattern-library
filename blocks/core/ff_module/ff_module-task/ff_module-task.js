'use strict';

var React = require('react'),
	Progress = require('../ff_module-progress/ff_module-progress.js'),
	generateClass = require('../../_lib/_ui/class-utils.js').generateStandardClass;

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
		classes: React.PropTypes.string
	},
	render: function() {

	var meta = this.props.from ? <span className="ff_module-task__meta">{'Set by '+ this.props.from}</span> : null,
		duedate = this.props.duedate ? <dd className="ff_module-task__item ff_module-task__item--date">{'Due ' + this.props.duedate}</dd> : null;

	return 	<dl className={ generateClass('ff_module-task', this.props) }>
				<dt className="ff_module-task__item ff_module-task__item--title">
					<a href={this.props.linkHref} className="ff_module-task__link">{this.props.message}</a>
					{meta}
				</dt>
				<dd className="ff_module-task__item ff_module-task__item--to">{this.props.to}</dd>
				{duedate}
				<dd className="ff_module-task__item ff_module-task__item--progress">
					<Progress {...this.props.progress} />
				</dd>
			</dl>;
	}
});
