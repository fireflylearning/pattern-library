'use strict';

var React = require('react'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

// /blocks/core/_lib/_ui/class-utils.js
// /blocks/core/ff_module/ff_module-file/ff_module-file.js

function generateIconClass(props){
    var classNames = ['ff_icon', 'ff_icon-left', 'ff_module-file__icon'];
    if (props.type && props.type == 'page') {
        classNames.push('ff_icon-computer');
    } else {
        classNames.push('ff_icon-file');
    }
    return classNames.join(' ');
}

module.exports = React.createClass({
    displayName: 'ModuleFile',
    propTypes: {
        title: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        href: React.PropTypes.string,
        classes: React.PropTypes.string,
        modifier: React.PropTypes.string
    },
    render: function(){

        var title = <span className="ff_module-file__title">{this.props.title}</span>;

        var child = this.props.href ? <a href="{this.props.href}" className="ff_module-file__link">{title}</a> : title;
        return  <div className={generateClass('ff_module-file', this.props)}>
                    <span className={generateIconClass(this.props)}></span> {child}
                </div>;
    }
});
