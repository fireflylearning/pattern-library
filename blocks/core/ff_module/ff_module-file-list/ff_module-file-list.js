'use strict';

var React = require('react'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass,
    ModuleFile = require('../ff_module-file/ff_module-file');

module.exports = React.createClass({
    displayName: 'ModuleFileList',
    propTypes: {
        files: React.PropTypes.arrayOf(React.PropTypes.shape(ModuleFile.propTypes.file)).isRequired,
        modifier: React.PropTypes.string,
        classes: React.PropTypes.string
    },
    render: function(){

        return <div className={generateClass('ff_module-file-list', this.props)}>
                    <ul className="ff_module-file-list__items">
                        {this.props.files.map((file, index)=>
                            <li className={generateClass('ff_module-file-list__item', this.props)} key={file.title + index}>
                                <ModuleFile modifier={this.props.modifier} file={file}/>
                            </li>
                        )}
                    </ul>
                </div>;
        }
});
