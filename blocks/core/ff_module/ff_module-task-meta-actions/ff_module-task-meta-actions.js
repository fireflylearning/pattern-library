'use strict';

var React = require('react'),
    _ = require('lodash');


var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerControlBarSet = ContainerControlBar.ControlBarSet,
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters');

var eventStates = require('../../ff_module/ff_module-task-event/_src/events').states;


function renderArchived(props) {
    return <p className="ff_util-prose__text-block--notify">This task is archived</p>;
}

function renderDefault(props) {
    return  <div className="ff_module-task-meta-actions ff_util-row-bottom">
                <ContainerControlBar modifier="split">

                    <ContainerControlBarSet>

                        {props.filters ? props.filters : null}

                    </ContainerControlBarSet>

                    <ContainerControlBarSet>

                        {props.description.numRecipientsAffected ? <p className='ff_module-task-meta-actions__num-affected'>Send feedback and marks to {props.description.numRecipientsAffected} students</p> : null}

                        {props.singleButtons ? props.singleButtons.map(function(singleButton, index){
                            return singleButton;
                        }) : null}

                        {props.groupedActions ? props.groupedActions : null}

                    </ContainerControlBarSet>

                </ContainerControlBar>
            </div>;
}

var renderMethods = {};
renderMethods[eventStates.archived] = renderArchived;
renderMethods[eventStates.default] = renderDefault;


function getPresentationState(props) {
    if (props.state && props.state[eventStates.archived])
        return eventStates.archived;
    return eventStates.default;
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
        state: React.PropTypes.object,
        filters: React.PropTypes.shape({
            type: React.PropTypes.oneOf([DropdownFilters])
        }),
        singleButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
            type: React.PropTypes.oneOf([Button])
        })),
        groupedActions: React.PropTypes.shape({
            type: React.PropTypes.oneOf([DropdownButton])
        })
    },
    render: function() {
        return getRenderMethod(this.props);
    }
});
