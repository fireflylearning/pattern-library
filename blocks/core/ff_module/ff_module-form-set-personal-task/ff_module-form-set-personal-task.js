'use strict';

var React = require('react'),
    Button = require('../ff_module-button/ff_module-button'),
    FormLabel = require('../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../ff_module-form-input/ff_module-form-input'),
    FormField = require('../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../ff_container/ff_container-form-line/ff_container-form-line'),
    JumptoDatePicker = require('../ff_module-date-picker-jumpto/ff_module-date-picker-jumpto');


function getOptions() {
    return [
        {
            key: 'opt1',
            value: 'Option 1',
            text: 'is'
        },
        {
            key: 'opt2',
            value: 'Option 2',
            text: 'this'
        }
    ]
}

module.exports = React.createClass({
    displayName: 'ModuleFormSetPersonalTask',

    props: {
        models: React.PropTypes.object,
        validation: React.PropTypes.object
    },

    render: function() {

        var taskTitleModel = this.props.models && this.props.models['taskTitle'] || null,
            taskTitleValidation = this.props.validation && this.props.validation['taskTitle'] || null,
            taskDueDateModel = this.props.models && this.props.models['dueDate'] || null,
            taskDueDateValidation = this.props.validation && this.props.validation['dueDate'] || null,
            taskClassModel = this.props.models && this.props.models['class'] || null,
            taskClassValidation = this.props.validation && this.props.validation['class'] || null,
            taskDescriptionModel = this.props.models && this.props.models['description'] || null,
            taskDescriptionValidation = this.props.validation && this.props.validation['description'] || null;

        return (
            <div>
                
                <ContainerFormLine>
                    <FormField model={taskTitleModel} validation={taskTitleValidation}>
                        <FormLabel key="l0" modifier="stacked">Task Title</FormLabel>
                        <FormInput modifier="fullwidth" type="text" value={this.props.personalTask.taskTitle} onChange={this.onChangeType} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskTitleModel} validation={taskTitleValidation} />
                </ContainerFormErrors>

                <ContainerFormLine>
                    <FormField model={taskDueDateModel} validation={taskDueDateValidation}>
                        <FormLabel key="l1" modifier="stacked">Due Date</FormLabel>
                        <FormInput modifier="constrained" type="text" onChange={this.onChangeType} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDueDateModel} validation={taskDueDateValidation}/>
                </ContainerFormErrors>

                <ContainerFormLine>
                    <FormField model={taskClassModel} validation={taskClassValidation}>
                        <FormLabel key="l2" modifier="stacked">Class</FormLabel>
                        <FormInput modifier="constrained" type="select" onChange={this.onChangeType} options={getOptions()} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskClassModel} validation={taskDescriptionValidation}/>
                </ContainerFormErrors>

                <ContainerFormLine>
                    <FormField model={taskDescriptionModel} validation={taskDescriptionValidation}>
                        <FormLabel key="l3" modifier="stacked">Description</FormLabel>
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDescriptionModel} validation={taskDescriptionValidation}/>
                </ContainerFormErrors>

            </div>
        );
    },

    /*componentWillMount() {
        if (typeof document !== "undefined" && document.body) {
            Modal.setAppElement(document.body);
        }
    }*/
});

