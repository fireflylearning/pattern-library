'use strict';

var React = require('react'),
    Button = require('../../ff_module-button/ff_module-button'),
    EditorBase = require('./EditorBase'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line'),
    getEditorControls = require('./EditorControls').getEditorControls;

var title = 'Mark or Grade',
    markTypes = {
        mark: 'mark',
        grade: 'grade',
        markAndGrade: 'mark-and-grade'
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

markSelectText[markTypes.mark] = 'Mark (e.g. 7/10)';
markSelectText[markTypes.grade] = 'Grade/Level (e.g. A, 7, +)';
markSelectText[markTypes.markAndGrade] = 'Mark & Grade/Level';

labelText[markTypes.mark] = 'Mark';
labelText[markTypes.grade] = 'Grade';
labelText[markTypes.markAndGrade] = 'Mark and Grade';

var markForms = {};
markForms[markTypes.mark] = Mark;
markForms[markTypes.grade] = Grade;
markForms[markTypes.markAndGrade] = MarkAndGrade;



function Mark(props) {
    var markModel = props.models && props.models['mark'] || null,
        markValidation = props.validation && props.validation['mark'] || null,
        markMaxModel = props.models && props.models['markMax'] || null,
        markMaxValidation = props.validation && props.validation['markMax'] || null;

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
    var gradeModel = props.models && props.models['grade'] || null,
        gradeValidation = props.validation && props.validation['grade'] || null;

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


function getMarkTypeOptions() {
    return Object.keys(markTypes).map(function(key) {
        return { value: markTypes[key], text: markSelectText[markTypes[key]] };
    });
}

function getLabelText(state, defaultLabel) {
    return labelText[state.type] || defaultLabel;
}

module.exports = React.createClass({
    displayName: 'EditorMarkAndGrade',
    getInitialState: function() {
        return { type: markTypes.mark }
    },
    render: function() {
        var messageModel = this.props.models && this.props.models['message'] || null,
            messageValidation = this.props.validation && this.props.validation['message'] || null;

        return (
            <EditorBase
                title={title}
                controls={getEditorControls(getLabelText(this.state, title), this.props, true)}
                onClose={this.props.onClose}
                >
                <div>
                    <ContainerFormLine>
                        <FormInput modifier="constrained" type="select" onChange={this.onChangeType} options={getMarkTypeOptions()}/>
                    </ContainerFormLine>

                    {renderMarkOrGrade(this.state, this.props)}

                    <ContainerFormLine>
                        <FormField
                            model={messageModel}
                            validation={messageValidation}
                            >
                            <FormLabel key="l0" modifier="stacked">Feedback</FormLabel>
                            <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} />
                        </FormField>
                    </ContainerFormLine>

                    <ContainerFormErrors>
                        <FormFieldErrors
                            model={messageModel}
                            validation={messageValidation}/>
                    </ContainerFormErrors>
                </div>
            </EditorBase>
        );
    },
    onChangeType: function(event) {
        this.setState({ type: event.target.value });
    }
});
