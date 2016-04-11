'use strict';

var React = require('react'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

function generateIconClass(file){
    var classNames = ['ff_icon', 'ff_icon-left', 'ff_module-file__icon'];
    if (file.type && file.type == 'page') {
        classNames.push('ff_icon-computer');
    } else {
        classNames.push('ff_icon-file');
    }
    return classNames.join(' ');
}

module.exports = React.createClass({
    displayName: 'ModuleFile',
    propTypes: {
        file: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            type: React.PropTypes.string,
            href: React.PropTypes.string,
        }).isRequired,
        modifier: React.PropTypes.string,
        classes: React.PropTypes.string
    },
    render: function(){
        var file = this.props.file;
        var title = <span className="ff_module-file__title">{file.title}</span>;

        var child = file.href ? <a href={file.href} className="ff_module-file__link">{title}</a> : title;
        return  <div className={generateClass('ff_module-file', file)}>
                    <span className={generateIconClass(file)}></span> {child}
                </div>;
    }
});
