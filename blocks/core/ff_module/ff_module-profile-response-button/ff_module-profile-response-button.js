'use strict';

var React = require('react');
var template = require('./_ff_module-profile-response-button.rt.js');

module.exports = React.createClass({
    displayName: 'ProfileTaskResponseButton',
    render: template,
    generateClass: function(props){

        if (props.isSelected) {
            return 'ff_module-profile-response-button ff_module-profile-response-button--is-selected';
        }
        if (props.isRead) {
            return 'ff_module-profile-response-button ff_module-profile-response-button--is-read';
        }

        return 'ff_module-profile-response-button';
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
