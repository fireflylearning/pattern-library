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
    var className = generateClass('ff_container-dialog__close-top', props);

    return <span className={className}>Close</span>;
}

var DialogHeading = React.createClass({
    displayName:'ContainerDialogHeading',
    render:function(){
        var className = this.generateClass('ff_container-dialog__heading');
        var topClose = this.props.showClose ? getTopClose(this.props) : null;

        return <h3 className={className}>{this.props.children} {topClose}</h3>;
    }
});



module.exports = React.createClass({
    displayName: 'ContainerDialog',
    render: function() {
        var className = this.generateClass('ff_container-dialog');

        return <div className={className}>
            <DialogHeading showClose={this.props.showTopClose}>{this.props.headingText}</DialogHeading>
         </div>;
    },
    generateClass:function(base) {
        return generateClass(base, this.props);
    }
});
