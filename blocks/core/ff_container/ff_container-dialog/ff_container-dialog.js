'use strict';

var React = require('react'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

import Button from '../../ff_module/ff_module-button/ff_module-button';
import ContainerControlBar from '../ff_container-control-bar/ff_container-control-bar';
var ContainerControlBarSet = ContainerControlBar.ControlBarSet;

var TopClose = function TopClose(props){
    return <button type="button" onClick={props.onCloseIconClick} className="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button>;
}

var DialogTitle = function DialogTitle(props) {
    var modProps = { modifier: props.modifier },
        headingClassName = generateClass('ff_container-dialog__heading', modProps),
        titleClassName = generateClass('ff_container-dialog__title', modProps);

    var topClose = props.showCloseIcon ? <TopClose {...props}/> : null;

    return <h3 className={headingClassName}><span className={titleClassName}>{props.children}</span> {topClose}</h3>;
};

var DialogBody = function DialogBody(props) {
    var className = generateClass('ff_container-dialog__body', props);

    return <div className={className}>{props.children}</div>;
};

var DialogControls = function DialogControls(props) {
    var className = generateClass('ff_container-dialog__controls', props);

    return <div className={className}>{props.children}</div>;
};

var StatusOverlay = function StatusOverlay(props) {
    var className = generateClass('ff_container-dialog__status-overlay', props),
        innerClassName = generateClass('ff_container-dialog__status-overlay-inner', props),
        labelClassName = generateClass('ff_container-dialog__status-overlay-label', props);

    var content = (props.saveState === 'SAVE_IN_PROGRESS') ?
                        <div className={innerClassName}>
                            <svg className="ff_container-dialog__status-image--saving" width={80} height={80} viewBox="0 0 80 80"><path d="M0 40C0 17.94 18.17 0 40.5 0c17.8 0 32.77 11.75 37.84 28.58.8 2.65-.73 5.43-3.4 6.22-2.7.8-5.5-.72-6.3-3.37C64.83 18.8 53.83 10 40.5 10c-16.75 0-30.37 13.46-30.37 30S23.75 70 40.5 70c13.35 0 24.33-8.8 28.13-21.43.8-2.64 3.6-4.15 6.3-3.36 2.68.8 4.2 3.58 3.4 6.23C73.26 68.25 58.3 80 40.5 80 18.18 80 0 62.06 0 40z" fill="#C8E1B9" fill-rule="evenodd"/></svg>
                            <div className={labelClassName}>Saving</div>
                        </div>
                    : (props.saveState === 'SAVE_SUCCESS') ?
                        <div className={innerClassName}>
                            <svg className="ff_container-dialog__status-image--saved" width={80} height={80} viewBox="0 0 80 80"><circle fill="#C8E1B9" cx="40" cy="40" r="40"/><path d="M34.7 56c-1.18 0-2.34-.45-3.23-1.34l-12.14-12.2c-1.77-1.77-1.77-4.67 0-6.45 1.78-1.78 4.66-1.78 6.44 0l8.92 8.96 19.53-19.62c1.78-1.8 4.66-1.8 6.44 0 1.77 1.78 1.77 4.68 0 6.46L37.9 54.66c-.88.9-2.05 1.34-3.2 1.34" fill="#FFF"/></svg>
                            <div className={labelClassName}>Saved</div>
                            <ContainerControlBar modifier="centered">
                                <ContainerControlBarSet>
                                    <Button text="Close" modifier="primary" onClick={props.onCloseForm} />
                                    <Button text="View Task" modifier="tertiary" href={'/set-tasks/' + props.taskID} />
                                    <Button text="Go to Tasks" modifier="tertiary" href="/set-tasks" />
                                </ContainerControlBarSet>
                            </ContainerControlBar>                         
                        </div>
                    : null;

    var overlay = <div className={className}>{content}</div>;

    return  (content !== null) ? overlay : <noscript />;
}

module.exports = React.createClass({
    displayName: 'ContainerDialog',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        subTitle: React.PropTypes.string,
        body: React.PropTypes.node.isRequired,
        controls: React.PropTypes.node,
        showCloseIcon: React.PropTypes.bool,
        onCloseIconClick: React.PropTypes.func
    },
    render: function() {
        var className = generateClass('ff_container-dialog', this.props);

        return <div className={className}>
            <StatusOverlay {...this.props} />
            <DialogTitle showCloseIcon={this.props.showCloseIcon} onCloseIconClick={this.props.onCloseIconClick} modifier={this.props.modifier}>{this.props.title}{this.props.subTitle ? <span className="ff_util-prose__text--quiet"> {'\u2013'} {this.props.subTitle}</span> : null}</DialogTitle>
            <DialogBody modifier={this.props.modifier}>{this.props.body}</DialogBody>
            {(this.props.controls) ? <DialogControls modifier={this.props.modifier}>{this.props.controls}</DialogControls> : null}
         </div>;
    }
});
