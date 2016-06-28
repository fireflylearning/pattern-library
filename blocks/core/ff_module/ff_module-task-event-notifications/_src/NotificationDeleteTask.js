'use strict';

var React = require('react'),
    Button = require('../../ff_module-button/ff_module-button'),
    ContainerDialog = require('../../../ff_container/ff_container-dialog/ff_container-dialog'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');


module.exports = React.createClass({
    displayName: 'NotificationDeleteTask',
    getInitialState: function(){
        return {
            inputValue: ''
        };
    },
    render: function() {

        var body = <div>
            <p>This will delete the task for <b>{this.props.event.description.numRecipientsAffected} students</b>, and cannot be undone.</p>

            <ContainerFormLine>
                <FormLabel key="l0" modifier="stacked" required="true">Type the word <span className="ff_util-prose__text--danger">DELETE</span> to continue (it's case sensitive)</FormLabel>
                <FormInput modifier="constrained" key="i0" onChange={this.checkInputValueEqualsDelete}/>
            </ContainerFormLine>
        </div>;

        return <ContainerDialog
            title="Delete Task"
            showCloseIcon={false}
            body={body}
            controls={[
                <Button key="delete" onClick={this.props.onConfirm} text="Delete" modifier="danger" disabled={this.state.inputValue !== 'DELETE'}/>,
                <Button key="cancel" onClick={this.props.onClose} text="Cancel" modifier="tertiary"/>
            ]}
        />;
    },
    checkInputValueEqualsDelete(event) {
        this.setState({
            inputValue: event.target.value.trim()
        });
    }
});
