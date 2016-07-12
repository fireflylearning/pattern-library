'use strict';

var React = require('react'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;


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



module.exports = React.createClass({
    displayName: 'ContainerDialog',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.node.isRequired,
        controls: React.PropTypes.node,
        showCloseIcon: React.PropTypes.bool,
        onCloseIconClick: React.PropTypes.func
    },
    render: function() {
        var className = generateClass('ff_container-dialog', this.props);

        return <div className={className}>
            <DialogTitle showCloseIcon={this.props.showCloseIcon} onCloseIconClick={this.props.onCloseIconClick} modifier={this.props.modifier}>{this.props.title}</DialogTitle>
            <DialogBody modifier={this.props.modifier}>{this.props.body}</DialogBody>
            {(this.props.controls) ? <DialogControls modifier={this.props.modifier}>{this.props.controls}</DialogControls> : null}
         </div>;
    }
});
