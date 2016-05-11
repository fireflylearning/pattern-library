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

                        {props.filters ? <DropdownFilters {...props.filters} modifier="compact-widelist" /> : null}

                    </ContainerControlBarSet>

                    <ContainerControlBarSet>

                        {props.description.numRecipientsAffected ? <p className='ff_module-task-meta-actions__num-affected'>Send feedback and marks to {props.description.numRecipientsAffected} students</p> : null}

                        {props.singleActions ? props.singleActions.map(function(actionProps, index){
                            return <Button key={'button'+index} {...actionProps} modifier="compact"  />
                        }) : null}

                        {props.groupedActions ? <DropdownButton {...props.groupedActions} modifier="compact-right-widelist" /> : null}

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
        filters: React.PropTypes.shape(DropdownFilters.propTypes),
        singleActions: React.PropTypes.arrayOf(React.PropTypes.shape({
            text: React.PropTypes.string,
            onClick: React.PropTypes.func
        })),
        groupedActions: React.PropTypes.shape(_.assign({},
            DropdownButton.propTypes, {
                onClick: React.PropTypes.func
            }))
    },
    render: function() {
        return getRenderMethod(this.props);
    }
});
