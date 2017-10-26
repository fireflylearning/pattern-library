'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    _ = require('underscore'),
    Form = require('react-redux-form').Form,
    Button = require('../../ff_module-button/ff_module-button'),
    EditorBase = require('./EditorBase'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line'),
    getEditorControls = require('./EditorControls').getEditorControls,
    isRequired = require('../../../_lib/simpleValidation').isRequired,
    isNumber = require('../../../_lib/simpleValidation').isNumber,
    maxLength = require('../../../_lib/simpleValidation').maxLength;

var events = require("../../ff_module-task-event/_src/events" );

var title = 'Mark, Grade or Feedback',
    markTypes = {
        mark: 'mark',
        grade: 'grade',
        markAndGrade: 'mark-and-grade',
        feedback: 'feedback'
    },
    releaseTypes = {
        released: 'released',
        unreleased: 'unreleased'
    },
    recipientTypes = {
        individual: 'individual',
        all: 'all'
    },
    markSelectText = {},
    labelText = {};

var markSelectTextLabel = "Mark, Grade or Feedback";
markSelectText[markTypes.mark] = 'Mark (e.g. 7/10)';
markSelectText[markTypes.grade] = 'Grade/Level (e.g. A, 7, +)';
markSelectText[markTypes.markAndGrade] = 'Mark & Grade/Level';
markSelectText[markTypes.feedback] = 'Feedback';

labelText[markTypes.mark] = 'Mark';
labelText[markTypes.grade] = 'Grade';
labelText[markTypes.markAndGrade] = 'Mark and Grade';

var markForms = {};
markForms[markTypes.mark] = Mark;
markForms[markTypes.grade] = Grade;
markForms[markTypes.markAndGrade] = MarkAndGrade;

var
    _validationMark = {
        validateOn: 'blur',
        validators: {
            required: isRequired,
            valid: isNumber
        },
        showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
        messages: {
            required: 'Please add a mark',
            valid: (val) => val ? 'Please use numbers for the mark' : '',
        }
    },
    _validationMarkMax = {
        validateOn: 'blur',
        validators: {
            required: isRequired,
            valid: isNumber
        },
        showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
        messages: {
            required: 'Please add a maximum mark',
            valid: (val) => val ? 'Please use numbers for the maximum mark' : '',
        }
    },
    _validationGrade = {
        validateOn: 'blur',
        validators: {
            required: isRequired,
            valid: maxLength(5)
        },
        showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
        messages: {
            required: 'Please add a grade',
            valid: (val) => val ? '5 characters maximum' : '',
        }
    },
    _feedbackMessageValidation = {
        validateOn: 'blur',
        validators: {
        },
        showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
        messages: {
        }
    };


function Mark(props) {
    var markModel = props.models && props.models['mark'] || null,
        markValidation = props.validation && props.validation['mark'] || {},
        markValidation = markModel ? _.defaults(markValidation, _validationMark) : null,
        markValue = props.event && props.event.description && props.event.description.mark;

    var markMaxModel = props.models && props.models['markMax'] || null,
        markMaxValidation = props.validation && props.validation['markMax'] || {},
        markMaxValidation = markMaxModel ? _.defaults(markMaxValidation, _validationMarkMax) : null,
        markMaxValue = props.event && props.event.description && props.event.description.markMax;

    return (
        <div>
            <ContainerFormLine>
                <FormField model={markModel} validation={markValidation}>
                    <FormLabel modifier="mini" required="true">Mark:</FormLabel>
                    <FormInput modifier="mini" key='mark' value={markValue} onChange={props.onMarkChange} autoFocus={props.focus} />
                </FormField>

                <FormField model={markMaxModel} validation={markMaxValidation}>
                    <FormLabel modifier="mini" required="true">out of</FormLabel>
                    <FormInput modifier="mini" key='markMax' value={markMaxValue} onChange={props.onMarkMaxChange} />
                </FormField>
            </ContainerFormLine>

            <ContainerFormErrors>
                <FormFieldErrors model={markModel} validation={markValidation} />
                <FormFieldErrors model={markMaxModel} validation={markMaxValidation} />
            </ContainerFormErrors>
        </div>
    );
}

function Grade(props) {
    var gradeModel = props.models && props.models['grade'] || null,
        gradeValidation = props.validation && props.validation['grade'] || {},
        gradeValidation = gradeModel ? _.defaults(gradeValidation, _validationGrade) : null,
        gradeValue = props.event && props.event.description && props.event.description.markMax;

    return (
        <div>
            <ContainerFormLine>
                <FormField model={gradeModel}
                    validation={gradeValidation}>
                    <FormLabel modifier="mini" required="true">Grade:</FormLabel>
                    <FormInput modifier="mini" key='grade' value={gradeValue} onChange={props.onGradeChange} autoFocus={props.focus} />
                </FormField>
            </ContainerFormLine>

            <ContainerFormErrors>
                <FormFieldErrors
                    model={gradeModel}
                    validation={gradeValidation}/>
            </ContainerFormErrors>
        </div>
    );
}


function MarkAndGrade(props) {
    var newProps = _.omit(props, ["focus"]);
    return (
        <div>
            <Mark {..._.extend(newProps, { focus: true })}/>
            <Grade {..._.extend(newProps, { focus: false })}/>
        </div>
    );
}

function renderMarkOrGrade(state, props) {
    var Method = markForms[state.type] || null;
    if (Method) return <Method {..._.extend(props, { focus: true })}/>;
    return null;
}


function getMarkTypeOptions() {
    return Object.keys(markTypes).map(function(key) {
        return { value: markTypes[key], text: markSelectText[markTypes[key]] };
    });
}

function getLabelText(state, defaultLabel) {
    return labelText[state.type] || defaultLabel;
}

function getNewEvent(props, state) {
    let newEvent = {
        initialMarkType: state.type,
        description: {
            type: events.types.markAndGrade
        }
    };
    if (newEvent.initialMarkType == markTypes.mark || newEvent.initialMarkType == markTypes.markAndGrade) {
        newEvent.description.markMax = props.event.description.markMax;
    }
    return newEvent;
}

module.exports = React.createClass({
    displayName: 'EditorMarkAndGrade',
    getInitialState: function() {
        return { 
            type: this.props.persistTaskEventState.type ? this.props.persistTaskEventState.type : markTypes.mark
        }
    },
    render: function() {
  
        var feedbackMessageModel = this.props.models && this.props.models['feedback']  || null,
            feedbackMessageValidation = this.props.validation && this.props.validation['feedback']  || {},
            feedbackMessageValidation = feedbackMessageModel ? _.defaults(feedbackMessageValidation, _feedbackMessageValidation) : null,
            feedbackMessageValue = this.props.event && this.props.event.description && this.props.event.description.message,
            feedbackMessageModel = this.state.type === markTypes.feedback ? feedbackMessageModel : null,
            feedbackMessageValidation = this.state.type === markTypes.feedback ? feedbackMessageValidation : null;
        var eventForm = this.props.eventForm;

        var newProps = _.extend({}, this.props, { onSend: this.onAdd, onNext: this.onNext });

        return (
            <EditorBase
                title={title}
                controls={getEditorControls(getLabelText(this.state, title), newProps, true)}
                onClose={newProps.onClose}
                {...newProps}>

                <ContainerFormLine>
                    <FormLabel modifier="stacked" required="true">{markSelectTextLabel}</FormLabel>
                    <FormInput modifier="constrained" type="select" onChange={this.onChangeType} options={getMarkTypeOptions()} value={this.state.type} />
                </ContainerFormLine>

                {renderMarkOrGrade(this.state, newProps)}

                <ContainerFormLine>
                    <FormField
                        model={feedbackMessageModel}
                        validation={feedbackMessageValidation}
                        >
                        <FormLabel key="l0" modifier="stacked"  required={this.state.type === markTypes.feedback}>Feedback</FormLabel>
                        <FormInput modifier="fullwidth" key="i0" type='textarea' value={feedbackMessageValue} onChange={newProps.onMessageChange} />
                    </FormField>
                </ContainerFormLine>
                <ContainerFormErrors>
                    <FormFieldErrors
                        model={feedbackMessageModel}
                        validation={feedbackMessageValidation}/>
                </ContainerFormErrors>

            </EditorBase>
        );
    },
    onChangeType: function(event) {
        let type = event.target.value;

        if (type === markTypes.mark){
            this.props.onChange(this.omitValuesFromEventDescription(['grade']));
        }
        else if (type === markTypes.grade){
            this.props.onChange(this.omitValuesFromEventDescription(['mark', 'markMax']));
        }
        else if (type === markTypes.feedback){
            this.props.onChange(this.omitValuesFromEventDescription(['mark', 'markMax', 'grade']));
        }


        this.setState({ type: type });
    },
    onAdd: function() {
        this.props.onSend(getNewEvent(this.props, this.state));
    },
    onNext: function() {
        this.props.onNext(getNewEvent(this.props, this.state));
    },
    omitValuesFromEventDescription: function(valuesToOmit) {
        return _.extend({}, this.props.event, {
            description: _.omit(this.props.event.description, valuesToOmit)
        });
    }
});
