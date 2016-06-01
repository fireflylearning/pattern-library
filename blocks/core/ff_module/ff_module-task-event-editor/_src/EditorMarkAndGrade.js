'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');

var markTypes = {
        mark: 'mark',
        grade: 'grade',
        markAndGrade: 'mark-and-grade'
    },
    markText = {};

markText[markTypes.mark] = 'Mark (e.g. 7/10)';
markText[markTypes.grade] = 'Grade/Level (e.g. A, 7, +)';
markText[markTypes.markAndGrade] = 'Mark & Grade/Level';

var markForms = {};
markForms[markTypes.mark] = Mark;
markForms[markTypes.grade] = Grade;
markForms[markTypes.markAndGrade] = MarkAndGrade;


function getMarkTypeOptions() {
    return Object.keys(markTypes).map(function(key) {
        return { value: markTypes[key], text: markText[markTypes[key]] };
    });
}

function Mark(props) {
    var markModel = props.models && props.models['event.description.mark'] || null,
        markValidation = props.validation && props.validation['event.description.mark'] || null,
        markMaxModel = props.models && props.models['event.description.markMax'] || null,
        markMaxValidation = props.validation && props.validation['event.description.markMax'] || null;

    return (
        <div>
            <ContainerFormLine>
                <FormField model={markModel} validation={markValidation}>
                    <FormLabel modifier="mini" required="true">Mark:</FormLabel>
                    <FormInput modifier="mini" key='mark' value={props.event.description.mark} onChange={props.onMarkChange} />
                </FormField>

                <FormField model={markMaxModel} validation={markMaxValidation}>
                    <FormLabel modifier="mini" required="true">out of</FormLabel>
                    <FormInput modifier="mini" key='markMax' value={props.event.description.markMax} onChange={props.onMarkMaxChange} />
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
    var gradeModel = props.models && props.models['event.description.grade'] || null,
        gradeValidation = props.validation && props.validation['event.description.grade'] || null;

    return (
        <div>
            <ContainerFormLine>
                <FormField model={gradeModel}
                    validation={gradeValidation}>
                    <FormLabel modifier="mini" required="true">Grade:</FormLabel>
                    <FormInput modifier="mini" key='grade' value={props.event.description.grade} onChange={props.onGradeChange} />
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

    return (
        <div>
            <Mark {...props}/>
            <Grade {...props}/>
        </div>
    );
}

function renderMarkOrGrade(state, props) {
    var Method = markForms[state.type] || null;
    if (Method) return <Method {...props}/>;
    return null;
}


module.exports = React.createClass({
    displayName: 'EditorMarkAndGrade',
    getInitialState: function() {
        return { type: markTypes.mark }
    },
    render: function() {
        return <div>
            <ContainerFormLine>
                <FormLabel key="l0" modifier="stacked" required="true">Mark or Grade</FormLabel>
                <FormInput modifier="constrained" type="select" onChange={this.onChangeType} options={getMarkTypeOptions()}/>
            </ContainerFormLine>
            {renderMarkOrGrade(this.state, this.props)}
            <ContainerFormLine>
                <FormLabel key="l0" modifier="stacked">Feedback</FormLabel>
                <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} value={this.props.event.description.message} />
            </ContainerFormLine>
        </div>
    },
    onChangeType: function(event) {
        this.setState({ type: event.target.value });
    }
});
