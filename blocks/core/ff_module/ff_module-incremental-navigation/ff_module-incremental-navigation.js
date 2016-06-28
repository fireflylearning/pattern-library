'use strict';

var React = require('react');

var Button = require('../ff_module-button/ff_module-button'),
    ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ControlBarSet = ContainerControlBar.ControlBarSet;

module.exports = React.createClass({
    displayName: 'IncrementalNavigation',
    propTypes: {
        nextText: React.PropTypes.string.isRequired,
        previousText: React.PropTypes.string.isRequired,
        isFirst: React.PropTypes.bool,
        isLast: React.PropTypes.bool,
        onNext: React.PropTypes.func.isRequired,
        onPrevious: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <ContainerControlBar modifier="split" classes="ff_module-incremental-navigation">
                <ControlBarSet>
                    <Button
                        modifier="link"
                        icon="page-back-blue"
                        classes="ff_module-incremental-navigation__previous"
                        text={this.props.previousText}
                        disabled={this.props.isFirst}
                        onClick={this.props.onPrevious} />
                </ControlBarSet>
                <ControlBarSet>
                    <Button
                        modifier="link"
                        icon="page-forward-blue"
                        iconAlign="right"
                        classes="ff_module-incremental-navigation__next"
                        text={this.props.nextText}
                        disabled={this.props.isLast}
                        onClick={this.props.onNext}/>
                </ControlBarSet>
            </ContainerControlBar>
        );
    }
});
