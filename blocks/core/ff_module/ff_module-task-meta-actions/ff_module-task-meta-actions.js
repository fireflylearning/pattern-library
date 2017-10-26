'use strict';

var React = require('react'),
    _ = require('underscore');

var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerControlBarSet = ContainerControlBar.ControlBarSet,
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters'),
    simplePlural = require('../../_lib/_ui/grammar-utils.js').simplePlural;

import ArchivedNotice from "../ff_module-task-archived-notice/ff_module-task-archived-notice.js";

var eventStates = require('../../ff_module/ff_module-task-event/_src/events').states;
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

var presentationStates = {
    default: eventStates.default,
    single: 'single',
    archived: eventStates.archived
};


function getStatusText(num) {
    var message = num === 0 ? 'Send Responses' : 'Send ' + simplePlural(num, 'Response') + ' to ' + num + ' ' + simplePlural(num, 'Student');
    return message;
}

function renderArchived(props) {
    return <ArchivedNotice />;
}

function renderReleaseButton(props) {
  var button = props.isImmediateReleaseMode || !props.canReleaseEvents ? null : <Button onClick={props.releaseAction} modifier='primary' disabled={isReleaseButtonActive(props)} text={getStatusText(props.description.numRecipientsAffected)}/>;
  return button;
}

function isReleaseButtonActive(props) {
  return props.description.numRecipientsAffected < 1 ? true : false;
}

function renderDefault(props) {
    return <div className={generateClass('ff_module-task-meta-actions', props) + ' ff_util-row-bottom'}>
                <ContainerControlBar modifier="split" classes="ff_module-task-meta-actions__controlbar">

                    <ContainerControlBarSet>

                        {props.filters ? props.filters : null}
                    </ContainerControlBarSet>

                    <ContainerControlBarSet>
                        {props.task.shownInMarkbook ? <a className="ff_module-task-meta-actions__link" href={"/markbook?guid=" + props.task.addressees[0].Guid}>Go To Markbook</a> : null}
                        {renderReleaseButton(props)}

                        {props.groupedActions ? props.groupedActions : null}

                    </ContainerControlBarSet>

                </ContainerControlBar>
            </div>;
}

function renderSingle(props) {
    return <div className={generateClass('ff_module-task-meta-actions', props) + ' ff_util-row-bottom'}>
                <ContainerControlBar modifier="right" classes="ff_module-task-meta-actions__controlbar">

                    <ContainerControlBarSet>

                        {renderReleaseButton(props)}

                        {props.groupedActions ? props.groupedActions : null}

                    </ContainerControlBarSet>

                </ContainerControlBar>
            </div>;
}

var renderMethods = {};
renderMethods[presentationStates.archived] = renderArchived;
renderMethods[presentationStates.single] = renderSingle;
renderMethods[presentationStates.default] = renderDefault;


function getPresentationState(props) {
    if (props.state && props.state[eventStates.archived]) {
        return presentationStates.archived;
    } else if (props.description.numRecipientsAffected === 1) {
        return presentationStates.single
    }
    return presentationStates.default;
}

function getRenderMethod(props) {
    var presentationState = getPresentationState(props);
    return renderMethods[presentationState](props);
}

module.exports = React.createClass({
    displayName: 'TaskMetaActions',
    propTypes: {
        description: React.PropTypes.shape({
            numRecipientsAffected: React.PropTypes.number,
        }),
        modifier: React.PropTypes.string,
        state: React.PropTypes.object,
        filters: React.PropTypes.shape({
            type: React.PropTypes.oneOf([DropdownFilters])
        }),
        singleButtons: React.PropTypes.arrayOf(
            React.PropTypes.element
        ),
        groupedActions: React.PropTypes.shape({
            type: React.PropTypes.oneOf([DropdownButton])
        })
    },
    render: function() {
        return getRenderMethod(this.props);
    }
});
