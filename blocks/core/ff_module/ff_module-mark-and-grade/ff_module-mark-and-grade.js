'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

function getMarkText(props) {
    if (props.mark) {
        if (props.markMax) {
            return props.mark + '/' + props.markMax;
        }
        return props.mark;
    }
    return null;
}

var MarkAndGrade = function TaskEventMarkAndGrade(props) {
    var markText = props.markText,
        gradeText = props.gradeText;

    var mark = markText ?
            <span className="ff_module-mark-and-grade__mark">{markText}</span> :
            null,

        grade = gradeText ?
            <span className="ff_module-mark-and-grade__grade">{gradeText}</span> :
            null,

        sep = (markText && gradeText) ? ' ' : '';

    return (mark || grade) ?
        <p className={generateClasses("ff_module-mark-and-grade", props)}>{mark}{sep}{grade}</p> :
        <span/>;

}

module.exports = React.createClass({
    displayName: 'MarkAndGrade',
    propTypes: {
        mark: React.PropTypes.number,
        markMax: React.PropTypes.number,
        grade: React.PropTypes.string
    },
    render: function(){
        var markText = getMarkText(this.props),
            gradeText = this.props.grade || '';

        return <MarkAndGrade markText={markText} gradeText={gradeText}/>
    }
})
