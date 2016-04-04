'use strict';

var React = require('react');

function generateClass(base, props){
    var classNames = [];
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
}

function getTopClose(){
    return <button type="button" className="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button>;
}

var DialogHeading = React.createClass({
    displayName:'ContainerDialogHeading',
    render:function(){
        var className = generateClass('ff_container-dialog__heading', this.props);
        var topClose = this.props.showClose ? getTopClose() : null;

        return <h3 className={className}>{this.props.children} {topClose}</h3>;
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
        showTopClose: React.PropTypes.bool,
        headingText: React.PropTypes.string.isRequired,
        body: React.PropTypes.node.isRequired,
        controls: React.PropTypes.node.isRequired
    },
    render: function() {
        var className = generateClass('ff_container-dialog', this.props);

        return <div className={className}>
            <DialogHeading showClose={this.props.showTopClose}>{this.props.headingText}</DialogHeading>
            <DialogBody>{this.props.body}</DialogBody>
            <DialogControls>{this.props.controls}</DialogControls>
         </div>;
    }
});
