'use strict';
var $ = require('jquery');

var React = require('react');
var activateDatePickerJumpTo = require('../ff_module-date-picker-jumpto/ff_module-date-picker-jumpto');

module.exports = React.createClass({
	displayName: 'DatePickerJumpTo',
    
    propTypes: {
        modifier: React.PropTypes.string
    },

	componentDidMount: function() {

		activateDatePickerJumpTo({
			root: this._root,
			selector: 'data-ff=date-picker',
			displayElement: 'data-ff-target-input-id',
			inlineContainer: this.props.inlineContainer,
			onChangeDueDate: this.props.onChangeDueDate
		});
	},

	bindRef: function(component){
	    this._root = component;
	},
	
	render: function() {

		var inputs = [];
		if (this.props.dataUrlPrefix) {
			inputs.push(<input key="url-prefix" className="ff_module-date-picker-jumpto__cal" data-ff="date-picker" data-ff-url-prefix={this.props.dataUrlPrefix} onFocus={this.onFocusHandler} onBlur={this.onBlurHandler} value=""/>);	
		}
		if (this.props.id) {
			inputs.push(<input key="target" className="ff_module-date-picker-jumpto__cal" data-ff="date-picker" data-ff-target-input-id={this.props.id} data-ff-display-format={this.props.dateFormat} onFocus={this.onFocusHandler}  onBlur={this.onBlurHandler} value=""/>);
		}
		
		return (
			<div className="ff_module-date-picker-jumpto__icon" options={this.options} ref={this.bindRef}>
		        <span className="ff_icon ff_icon-calendar-blue ff_module-date-picker-jumpto__trigger">			
		        	{inputs}
		        </span>
		    </div>
		)
	},

	onFocusHandler: function() {
		if (this.props.inlineContainer) $(this.props.inlineContainer).slideDown(250);
	},

	onBlurHandler: function() {
		// if (this.props.inlineContainer) $(this.props.inlineContainer).slideUp(250);
	}

});
