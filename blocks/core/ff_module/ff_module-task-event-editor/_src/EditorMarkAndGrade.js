'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
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
markForms[markTypes.mark] = renderMark;
markForms[markTypes.grade] = renderGrade;
markForms[markTypes.markAndGrade] = renderMarkAndGrade;

function getMarkTypeOptions() {
    return Object.keys(markTypes).map(function(key){
        return { value: markTypes[key], text: markText[markTypes[key]] };
    });
}

function renderMark(state, props) {
    return <ContainerFormLine>
                <FormLabel modifier="mini" required="true">Mark:</FormLabel>
                <FormInput modifier="mini" key='mark' value={props.event.description.mark} onChange={props.onMarkChange} />
                <FormLabel modifier="mini" required="true">out of</FormLabel>
                <FormInput modifier="mini" key='markMax' value={props.event.description.markMax} onChange={props.onMarkMaxChange} />
            </ContainerFormLine>;
}

function renderGrade(state, props) {
    return <ContainerFormLine>
                <FormLabel modifier="mini" required="true">Grade:</FormLabel>
                <FormInput modifier="mini" key='grade' value={props.event.description.grade} onChange={props.onGradeChange} />
            </ContainerFormLine>;
}

function renderMarkAndGrade(state, props) {
    return <div><ContainerFormLine>
                <FormLabel modifier="mini" required="true">Mark:</FormLabel>
                <FormInput modifier="mini" key='mark' value={props.event.description.mark} onChange={props.onMarkChange} />
                <FormLabel modifier="mini" required="true">out of</FormLabel>
                <FormInput modifier="mini" key='markMax' value={props.event.description.markMax} onChange={props.onMarkMaxChange} />
            </ContainerFormLine>
            <ContainerFormLine>
                <FormLabel modifier="mini" required="true">Grade:</FormLabel>
                <FormInput modifier="mini" key='grade' value={props.event.description.grade} onChange={props.onGradeChange} />
            </ContainerFormLine></div>;
}

function renderMarkOrGrade(state, props) {
    var method = markForms[state.type] || null;
    if (method) return method(state, props);
    return null;
}


module.exports = React.createClass({
    displayName: 'EditorMarkAndGrade',
    getInitialState: function(){
        return { type: markTypes.mark}
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
    onChangeType: function(event){
        this.setState({type: event.target.value});
    }
});

