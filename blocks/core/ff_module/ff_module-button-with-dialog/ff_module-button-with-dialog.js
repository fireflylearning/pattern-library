'use strict';

import React from 'react';

var Button = require('../../ff_module/ff_module-button/ff_module-button');
var ContainerModalWithDialog = require('../../ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

module.exports = React.createClass({
	displayName: 'ButtonWithDialog',
	
	getInitialState: function() {
	    return { modalIsOpen: false };
	},
	
	openModal: function() {
	    this.setState({modalIsOpen: true});
	},

	closeModal: function() {
	    this.setState({modalIsOpen: false});
	},

	render: function() {

		console.log(this.props);

		return (
			<div className={generateClass('ff_module-button-with-dialog', this.props)} data-modal-anchor="">
				<Button key="add-task" onClick={this.openModal} text="Add a Task" modifier="primary" />
				<ContainerModalWithDialog 
				    {...this.props} 
				    isOpen={this.state.modalIsOpen}
				    onClose={this.closeModal}
				    >
				    {this.props.children}
				</ContainerModalWithDialog>
			</div>
		);
	}

});