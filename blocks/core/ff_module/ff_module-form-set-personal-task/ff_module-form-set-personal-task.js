'use strict';

var $ = require('jquery'),
    _ = require('underscore');

var React = require('react'),
    Button = require('../ff_module-button/ff_module-button'),
    FormLabel = require('../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../ff_module-form-input/ff_module-form-input'),
    FormField = require('../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../ff_container/ff_container-form-line/ff_container-form-line'),
    DatePickerJumpTo = require('../ff_module-date-picker-jumpto-component/ff_module-date-picker-jumpto-component');

import { actions } from 'react-redux-form';
import { isRequired, isNumber, maxLength, maxMess, isString } from '../../_lib/simpleValidation';


function generateClass(base, props) {
    var classNames = [];
    props = props || {};
    classNames.push(base);
    if (!!props.modifier) {
        classNames.push(base + '--' + props.modifier);
    }
    return classNames.join(' ');
}

var maxMessageLength = 255;

var _titleValidation = {
    validateOn: 'blur',
    validators: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a title to this task'
    }
};

var _dueDateValidation = {
    validateOn: 'blur',
    validators: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please set a due date',
        valid: (val) => val ? 'Please use numbers' : '',
    }
};

var _classValidation = {
    validateOn: 'blur',
    validators: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please choose a class',
        valid: (val) => val ? '5 characters maximum' : '',
    }
};

var _descriptionValidation = {
    validateOn: 'blur',
    validators: {
        valid: maxLength(maxMessageLength)
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        valid: (val) => val ? '' + maxMessageLength + ' characters maximum' : '',
    }
};


function getValidationProps(props, key, _defaultValidation) {
    var model = props.models && props.models[key] || null,
        validation = props.validation && props.validation[key] || {},
        validation = model ? _.defaults(validation, _defaultValidation) : null;

    return {
        model: model,
        validation: validation
    }
}

module.exports = React.createClass({
    displayName: 'ModuleFormSetPersonalTask',

    props: {
        models: React.PropTypes.object,
        validation: React.PropTypes.object
    },

    render: function() {

        var taskTitleValidationProps = getValidationProps(this.props, 'title', _titleValidation),
            taskDueDateValidationProps = getValidationProps(this.props, 'dueDate', _dueDateValidation),
            taskClassValidationProps = getValidationProps(this.props, 'class', _classValidation),
            taskDescriptionValidationProps = getValidationProps(this.props, 'description', _descriptionValidation);

        var datePickerProps = {
            id: 'due-date',
            dateFormat: 'dd/mm/yy',
            onChangeDueDate: this.onChangeDueDate,
            inlineContainer: '#datepicker-container',
            data: [{
                attr: 'data-ff-target',
                value: 'due-date'
            }]
        };

        return (
            <div className={generateClass('ff_module-form-set-personal-task', this.props)}>
                <ContainerFormLine>
                    <FormField model={taskTitleValidationProps.model} validation={taskTitleValidationProps.validation}>
                        <FormLabel key="l0" modifier="stacked" required="true">Task Title</FormLabel>
                        <FormInput modifier="fullwidth" type="text" value={this.props.personalTask.title} onChange={this.onChangeTitle} required/>
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskTitleValidationProps.model} validation={taskTitleValidationProps.validation} />
                </ContainerFormErrors>

                <ContainerFormLine dataAnchor="true">
                    <FormField model={taskDueDateValidationProps.model} validation={taskDueDateValidationProps.validation}>
                        <FormLabel key="l1" modifier="stacked" required="true">Due Date</FormLabel>
                        <FormInput
                            id="due-date"
                            modifier="constrained"
                            type="text"
                            onClick={this.onClickDueDate.bind(this, datePickerProps.id)}
                            value={this.props.personalTask.dueDate}

                        />
                        <DatePickerJumpTo {...datePickerProps} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDueDateValidationProps.model} validation={taskDueDateValidationProps.validation}/>
                </ContainerFormErrors>

                <div id="datepicker-container" style={{display: 'none'}}></div>

                <ContainerFormLine>
                    <FormField model={taskClassValidationProps.model} validation={taskClassValidationProps.validation}>
                        <FormLabel key="l2" modifier="stacked" required="true">Class</FormLabel>
                        <FormInput
                            modifier="constrained"
                            type="select"
                            onChange={this.onChangeClass}
                            options={this.props.classList}
                        />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskClassValidationProps.model} validation={taskClassValidationProps.validation}/>
                </ContainerFormErrors>

                <ContainerFormLine>
                    <FormField model={taskDescriptionValidationProps.model} validation={taskDescriptionValidationProps.validation}>
                        <FormLabel key="l3" modifier="stacked">Description</FormLabel>
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.onChangeDescription} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDescriptionValidationProps.model} validation={taskDescriptionValidationProps.validation}/>
                </ContainerFormErrors>

            </div>
        );
    },

    onClickDueDate: function(id){
        var target = 'data-ff-target-input-id=' + id;
        $('['+ target + ']').trigger('focus');
    },

    onChangeDueDate: function(value){
        this.props.dispatch(actions.focus(this.props.models['dueDate']));
        this.props.dispatch(actions.change(this.props.models['dueDate'], value));
    },

    onChangeTitle: function(){},
    onChangeClass: function(){},
    onChangeDescription: function(){},


});
