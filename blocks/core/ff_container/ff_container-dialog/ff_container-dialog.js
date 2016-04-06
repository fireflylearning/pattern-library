'use strict';

var React = require('react');

function generateClass(base, props){
    var classNames = [];
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
}

function getTopClose(props){
    return <button type="button" onClick={props.onCloseIconClick} className="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button>;
}

var DialogTitle = React.createClass({
    displayName:'ContainerDialogTitle',
    render:function(){
        var props = { modifier: this.props.modifier },
            headingClassName = generateClass('ff_container-dialog__heading', props),
            titleClassName = generateClass('ff_container-dialog__title', props);

        var topClose = this.props.showCloseIcon ? getTopClose(this.props) : null;

        return <h3 className={headingClassName}><span className={titleClassName}>{this.props.children}</span> {topClose}</h3>;
    }
});

var DialogBody = React.createClass({
    displayName:'ContainerDialogBody',
    render:function(){
        var className = generateClass('ff_container-dialog__body', this.props);

        return <div className={className}>{this.props.children}</div>;
    }
});

var DialogControls = React.createClass({
    displayName:'ContainerDialogControls',
    render:function(){
        var className = generateClass('ff_container-dialog__controls', this.props);

        return <div className={className}>{this.props.children}</div>;
    }
});


module.exports = React.createClass({
    displayName: 'ContainerDialog',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.node.isRequired,
        controls: React.PropTypes.node.isRequired,
        showCloseIcon: React.PropTypes.bool,
        onCloseIconClick: React.PropTypes.func
    },
    render: function() {
        var className = generateClass('ff_container-dialog', this.props);

        return <div className={className}>
            <DialogTitle showCloseIcon={this.props.showCloseIcon} onCloseIconClick={this.props.onCloseIconClick}>{this.props.title}</DialogTitle>
            <DialogBody>{this.props.body}</DialogBody>
            <DialogControls>{this.props.controls}</DialogControls>
         </div>;
    }
});
