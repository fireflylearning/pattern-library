'use strict';

var $ = require('jquery');

var React = require('react'),
    Button = require('../ff_module-button/ff_module-button'),
    FormLabel = require('../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../ff_module-form-input/ff_module-form-input'),
    FormField = require('../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../ff_container/ff_container-form-line/ff_container-form-line'),
    DatePickerJumpTo = require('../ff_module-date-picker-jumpto-component/ff_module-date-picker-jumpto-component');

import {modelReducer, actions} from 'react-redux-form';
import thunk from 'redux-thunk';

function generateClass(base, props) {
    var classNames = [];
    props = props || {};
    classNames.push(base);
    if (!!props.modifier) {
        classNames.push(base + '--' + props.modifier);
    }
    return classNames.join(' ');
}

function getOptions() {
    return [
        {
            value: 'opt_1',
            text: 'Option 1'
        },
        {
            value: 'opt_2',
            text: 'Option 2'
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
                    <FormField model={taskTitleModel} validation={taskTitleValidation}>
                        <FormLabel key="l0" modifier="stacked" required="true">Task Title</FormLabel>
                        <FormInput modifier="fullwidth" type="text" value={this.props.personalTask.taskTitle} onChange={this.onChangeTitle} required/>
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskTitleModel} validation={taskTitleValidation} />
                </ContainerFormErrors>

                <ContainerFormLine dataAnchor="true">
                    <FormField model={taskDueDateModel} validation={taskDueDateValidation}>
                        <FormLabel key="l1" modifier="stacked" required="true">Due Date</FormLabel>
                        <FormInput 
                            id="due-date" 
                            modifier="constrained" 
                            type="text" 
                            onClick={this.onClickDueDate.bind(this, datePickerProps.id)}
                            value={this.props.personalTask.dueDate} 
                            readonly={true}
                        />
                        <DatePickerJumpTo {...datePickerProps} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDueDateModel} validation={taskDueDateValidation}/>
                </ContainerFormErrors>
                
                <div id="datepicker-container"></div>

                <ContainerFormLine>
                    <FormField model={taskClassModel} validation={taskClassValidation}>
                        <FormLabel key="l2" modifier="stacked" required="true">Class</FormLabel>
                        <FormInput modifier="constrained" type="select" onChange={this.onChangeClass} options={getOptions()} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskClassModel} validation={taskDescriptionValidation}/>
                </ContainerFormErrors>

                <ContainerFormLine>
                    <FormField model={taskDescriptionModel} validation={taskDescriptionValidation}>
                        <FormLabel key="l3" modifier="stacked" required="true">Description</FormLabel>
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.onChangeDescription} />
                    </FormField>
                </ContainerFormLine>

                <ContainerFormErrors>
                    <FormFieldErrors model={taskDescriptionModel} validation={taskDescriptionValidation}/>
                </ContainerFormErrors>

            </div>
        );
    },

    onClickDueDate: function(id){
        var target = 'data-ff-target-input-id=' + id;
        $('['+ target + ']').trigger('focus');
        
        // setTimeout(function(){
        //     $('.ff_container-dialog__body').scrollTop($('#due-date').parent().position().top - 30);    
        // }, 1000);

    },

    onChangeDueDate: function(value){        
        this.props.dispatch(actions.focus(this.props.models['dueDate']));
        this.props.dispatch(actions.change(this.props.models['dueDate'], value));
    },

    onChangeTitle: function(){},
    onChangeClass: function(){},
    onChangeDescription: function(){},

});

