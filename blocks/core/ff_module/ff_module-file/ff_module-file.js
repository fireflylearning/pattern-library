'use strict';

var React = require('react'),
    Button = require('../ff_module-button/ff_module-button'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

function getIconType(file) {
    var type = 'ff_icon-file';

    if (file.type){
        switch (file.type) {
            case 'page' : type = 'ff_icon-computer';
                break;
            case 'description' : type = 'ff_icon-task-description';
                break;
        }
    }
    return type;
}

function generateIconClass(file){
    var classNames = ['ff_icon', 'ff_icon-left', 'ff_module-file__icon', getIconType(file)];
    return classNames.join(' ');
}

function getChild(file) {
    var icon = <span className={generateIconClass(file)}/>;
    var title = <span className="ff_module-file__title">{file.title}</span>;

    var child = <span>{icon}{title}</span>;

    if (file.href) child = <a href={file.href} className="ff_module-file__link">{icon}{title}</a>;
    else if (file.onClick) child = <Button text={file.title} modifier='link' onClick={file.onClick} icon={getIconType(file).replace('ff_icon-', '')}></Button>;

    return child;
}

module.exports = React.createClass({
    displayName: 'ModuleFile',
    propTypes: {
        file: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            type: React.PropTypes.string,
            href: React.PropTypes.string,
            onClick: React.PropTypes.func
        }).isRequired,
        modifier: React.PropTypes.string,
        classes: React.PropTypes.string
    },
    render: function(){
        var file = this.props.file;
        var title = <span className="ff_module-file__title">{file.title}</span>;

        var child = getChild(file);

        return (
            <div className={generateClass('ff_module-file', file)}>
                {child}
            </div>
        );
    }
});
