'use strict';

var React = require('react');
var ProfileResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button.js');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater.js');

import { types as recipientTypes } from '../../../../../front-end/lib/task-details/recipients.js';
import _ from 'underscore';
import $ from 'jquery';

const allRecipientsRefsIdentifier = 'all-recipients';
const recipientsContainerRefsIdentifier = 'recipient-list-container';

function isElementVerticallyVisible(element, container) {
    let containerHeight = $(container).height();
    let elementBoundingRect= element.getBoundingClientRect();

    return elementBoundingRect.top < containerHeight && elementBoundingRect.top > 0;
}

module.exports = React.createClass({
    displayName: 'TaskResponseRecipientList',
    propTypes:{
        responses: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
    componentDidMount: function(prevProps, prevState) {
        if (this.props.selectedRecipient == null || this.props.selectedRecipient.type === recipientTypes.all) {
            return;
        }

        this.scrollToRecipient(this.props.selectedRecipient);
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.selectedRecipient != null && this.props.selectedRecipient.guid !== prevProps.selectedRecipient.guid) {
            this.scrollToRecipient(this.props.selectedRecipient);
        }
    },
    scrollToRecipient: function(recipient) {
        let recipientIdentifer = recipient.type === recipientTypes.all ? allRecipientsRefsIdentifier : recipient.guid;
        let recipientDomElement = this.refs[recipientIdentifer].getDOMNode();

        if (isElementVerticallyVisible(recipientDomElement, this.refs[recipientsContainerRefsIdentifier].getDOMNode().parentElement)) {
            return;
        }

        if (recipientDomElement.scrollIntoView) {
            recipientDomElement.scrollIntoView();
        }
    },
    render: function() {
        return <ItemRepeater modifier='separated' ref={recipientsContainerRefsIdentifier}>
                {this.props.responses && this.props.responses.map(response =>{
                    var currentResponse = response.isSelected ?
                        <div className='ff_module-response-recipient-list__currentResponse'>
                            {this.props.currentTaskResponse}
                        </div> : null;

                    return <div key={response.guid}>
                        <ProfileResponseButton
                            ref = {response.recipient.type === recipientTypes.all ? allRecipientsRefsIdentifier : response.recipient.guid}
                            isRead = {response.isRead}
                            isSelected = {response.isSelected}
                            label = {response.label}
                            event = {response.latestEvent}
                            markAndGrade = {response.markAndGrade}
                            lastEventWasAuthoredByCurrentUser = {response.lastEventWasAuthoredByCurrentUser}
                            onSelect = {()=>this.props.onSelect(response.recipient)}
                            pic_href = {response.pic_href}
                            releaseMode={this.props.releaseMode}
                            status={response.status}/>
                        {currentResponse}
                    </div>
                })}
            </ItemRepeater>;
    }
});
