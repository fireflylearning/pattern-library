'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var generateClass = require('../../_lib/_ui/class-utils.js').generateStandardClass;

var Button = require('../ff_module-button/ff_module-button');
var CheckableList = require('../ff_module-form-checkable-list/ff_module-form-checkable-list');
var ControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');

module.exports = React.createClass({
	displayName: 'MarkingControls',
	render: function() {
		return <div className={generateClass('ff_module-form-marking-controls', this.props)}>
			{this.renderControlBarButtons()}
			{this.renderMarkSettingsRadios()}
		</div>;
	},
	renderControlBarButtons() {
		if (this.props.controls.buttons == null)
			return null;

		return <ControlBar {...this.props.controlBar}>
			<ControlBar.ControlBarSet>
				{this.props.controls.buttons.map((button)=>{
					return <Button {...button}/>;
				})}
			</ControlBar.ControlBarSet>
		</ControlBar>;
	},
	renderMarkSettingsRadios(){
		if (this.props.isCompletedTask && !this.props.canReleaseEvents) return null;

		return <div className='ff_module-form-marking-controls__marking-settings'>
			<CheckableList {...this.props.controls.checkableList}/>
		</div>;
	}
	
});
