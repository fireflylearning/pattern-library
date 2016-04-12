'use strict';

var React = require('react');

var Button = require('../ff_module-button/ff_module-button');
var CheckableList = require('../ff_module-form-checkable-list/ff_module-form-checkable-list');
var ControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');

module.exports = React.createClass({
	displayName: 'MarkingControls',
	generateClass: function(base, props) {
		var classNames = [];
		props = props || {};
		classNames.push(base);
		if (!!props.modifier) classNames.push(base + '--' + props.modifier);
		if (!!props.classes) classNames.push(props.classes);
		if (!!props.className) classNames.push(props.className);
		return classNames.join(' ');
	},
	render: function() {
		return <div className={this.generateClass('ff_module-form-marking-controls', this.props.modifier)}>
			<ControlBar>
				<ControlBar.ControlBarSet>
					{this.props.controls.buttons.map((button)=>{
						return <Button text={button.text} id={button.id}/>;
					})}
				</ControlBar.ControlBarSet>
			</ControlBar>
			<div className='ff_module-form-markin-controls__marking-settings'>
				<CheckableList {...this.props.controls.checkableList}/>
			</div>
		</div>;
	}
});