'use strict';

var React = require('react');
var template = require('./_ff_module-profile-response-button.rt.js');

module.exports = React.createClass({
    displayName: 'ProfileTaskResponseButton',
    render: template,
    generateClass: function(base){
        var classNames = [],
            props = this.props;
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.isRead && !props.isSelected) classNames.push(base + '--is-read');
        if (!!props.isSelected) classNames.push(base + '--is-selected');
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
    },
    renderGrade: function(props){
        var marksAll = props.markAndGrade;
        if (!marksAll) return '';
        if (marksAll.grade && marksAll.mark && marksAll.markMax) {
            return marksAll.mark+'/'+marksAll.markMax+', '+ marksAll.grade;
        } else if (marksAll.grade) {
            return marksAll.grade;
        } else if (marksAll.mark && marksAll.markMax) {
            return marksAll.mark+'/'+marksAll.markMax;
        }
        return '';
    }
});
