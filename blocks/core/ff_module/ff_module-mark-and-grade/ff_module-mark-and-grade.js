'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

function getMarkText(props) {
    if (props.mark != null) {
        if (props.markMax != null) {
            return props.mark + '/' + props.markMax;
        }
        return props.mark;
    }
    return null;
}

function getPercentageText(props) {
    if (props.mark != null && props.markMax != null && props.markMax > 0 && props.mark <= props.markMax) {
        return Math.round(props.mark / props.markMax * 100) + '%';
    }
    return null;
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
            percentageText = getPercentageText(this.props),
            gradeText = this.props.grade || null;

        var marks = [];

        if (markText != null) {
           marks.push(<span className="ff_module-mark-and-grade__mark">{markText}</span>);
        }

        if (percentageText) {
            marks.push(<span className="ff_module-mark-and-grade__percentage">{percentageText}</span>);
        }

        if (gradeText != null) {
            marks.push(<span className="ff_module-mark-and-grade__grade">{gradeText}</span>);
        }

        return (marks.length > 0) ?
            <p className={generateClasses("ff_module-mark-and-grade", this.props)}>{marks}</p> :
            <span/>;
    }
});
