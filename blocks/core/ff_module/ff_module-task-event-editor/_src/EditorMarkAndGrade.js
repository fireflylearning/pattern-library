'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');

var markTypes = {
        mark: 'mark',
        grade: 'grade'
    },
    markText = {};

markText[markTypes.mark] = 'Mark (e.g. 7/10)';
markText[markTypes.grade] = 'Grade (e.g. B)';

function getMarkTypeOptions() {
    return Object.keys(markTypes).map(function(key){
        return { value: markTypes[key], text: markText[markTypes[key]] };
    });
}

function renderMarkOrGrade(state, props) {
    switch (state.type) {
        case markTypes.mark:
            return <ContainerFormLine>
                <FormLabel modifier="mini" required="true">Mark:</FormLabel>
                <FormInput modifier="mini" value={props.event.mark} onChange={props.onMarkChange} />
                <FormLabel modifier="mini" required="true">out of</FormLabel>
                <FormInput modifier="mini" value={props.event.markMax} onChange={props.onMarkMaxChange} />
            </ContainerFormLine>;
            break;
        case markTypes.grade:
            return <ContainerFormLine>
                <FormLabel modifier="mini" required="true">Grade:</FormLabel>
                <FormInput modifier="mini" value={props.event.grade} onChange={props.onGradeChange} />
            </ContainerFormLine>;
            break;
    }
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
                <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} value={this.props.event.message} />
            </ContainerFormLine>
        </div>
    },
    onChangeType: function(event){
        this.setState({type: event.target.value});
    }
});

