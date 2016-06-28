'use strict';

var React = require('react');
var ProfileResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button.js');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater.js');

module.exports = React.createClass({
    displayName: 'TaskResponseRecipientList',
    propTypes:{
        responses: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <ItemRepeater modifier="separated">
                {this.props.responses && this.props.responses.map(response =>
                	var currentResponse = response.currentTaskResponse ? <div className='ff_module-response-recipient-list__currentResponse'>{response.currentTaskResponse}</div> : '';
                    <ProfileResponseButton
                        key = {response.guid}
                        isRead = {response.isRead}
                        isSelected = {response.isSelected}
                        label = {response.label}
                        event = {response.latestEvent}
                        markAndGrade = {response.markAndGrade}
                        lastEventWasAuthoredByCurrentUser = {response.lastEventWasAuthoredByCurrentUser}
                        onSelect = {()=>this.props.onSelect(response.recipient)}
                        pic_href = {response.pic_href}
                    />
                    {currentResponse}
                )}
            </ItemRepeater>
        );
    }
});
