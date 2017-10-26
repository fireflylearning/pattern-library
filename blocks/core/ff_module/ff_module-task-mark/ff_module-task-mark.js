'use strict';

var React = require('react'),
	MarkGrade = require('../ff_module-mark-and-grade/ff_module-mark-and-grade.js'),
	generateClass = require('../../_lib/_ui/class-utils.js').generateStandardClass;

module.exports = React.createClass({
	displayName: 'Task',
	propTypes: {
		to: React.PropTypes.string.isRequired,
		assignment: React.PropTypes.string.isRequired,
		postbackHref: React.PropTypes.string.isRequired,
		classes: React.PropTypes.string,
		markGrade: React.PropTypes.string
	},
	render: function() {

	var checkbox = this.props.hasCheckbox ? <dd className="ff_module-task-mark__item ff_module-task-mark__item--checkbox"><FormInput {...this.props.input} /></dd> : null;

	return 	<dl className={ generateClass('ff_module-task-mark', this.props) }>
				<dt className="ff_module-task-mark__item ff_module-task-mark__item--title">
					<a href={this.props.postbackHref} className="ff_module-task-mark__link">{this.props.assignment}</a>
					<p className="ff_module-task-mark__to">{this.props.to}</p>
				</dt>
				<dd className="ff_module-task-mark__item ff_module-task-mark__item--mark-and-grade">
					<MarkGrade {...this.props.markGrade} />
				</dd>
			</dl>;
	}
});
