'use strict';

var React = require('react'),
    _ = require('underscore');


var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerControlBarSet = ContainerControlBar.ControlBarSet,
    TaskResponses = require('../../ff_module/ff_module-task-responses/ff_module-task-responses'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters');

var test = { value: 1 };

module.exports = React.createClass({
    displayName: 'TaskMetaActions',
    propTypes: {
        numAffected: React.PropTypes.number,
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
        return <div className="ff_util-row-bottom">
                    <ContainerControlBar modifier="split">
                        <ContainerControlBarSet>
                            <DropdownFilters
                                text="Filter by Status"
                                modifier="compact-widelist"
                                onAddFilter={(id, event)=>console.log('Adding '+id)}
                                onRemoveFilter={(id, event)=>console.log('Removing '+id)}
                                filters={[{
                                    name: 'Awaiting Response',
                                    id: 'filter-1'
                                }, {
                                    isActive: true,
                                    name: 'Approved',
                                    id: 'filter-2'
                                }, {
                                    name: 'Response Received',
                                    id: 'filter-3'
                                }]}
                            />
                        </ContainerControlBarSet>

                        <ContainerControlBarSet>
                            {this.props.numAffected ? <p>Send feedback and marks to {this.props.numAffected} students</p> : null}
                            <Button
                                modifier="compact"
                                text="Send All Now"
                                onClick={()=>{}}
                            />
                            <DropdownButton
                                modifier="compact-right-widelist"
                                text="More Actions"
                                list={[{
                                        href: '#',
                                        text: 'Item A'
                                    }, {
                                        href: '#',
                                        text: 'Item B'
                                    }, {
                                        href: '#',
                                        text: 'Item C'
                                    }]}
                            />
                        </ContainerControlBarSet>

                    </ContainerControlBar>
                </div>;
    }
});
