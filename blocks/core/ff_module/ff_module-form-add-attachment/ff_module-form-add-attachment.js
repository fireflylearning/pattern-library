'use strict';

var React = require('react'),
    DropdownButton = require('../ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');

function renderFileList(props) {
    var option = renderNoFiles();

    if (props.files && props.files.length > 0) {
        option = renderWithFiles(props);
    }
    return option;
}

function renderNoFiles(){
    return <span className="ff_module-form-add-attachment__no-files-message">No files attached</span>
}

function renderWithFiles(props){
    // TODO: Integrate file list component once built
    return <span className="ff_module-form-add-attachment__no-files-message">No files attached</span>
}

function generateClass(base, props, state) {
    var classNames = [];
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (state.dragCounter > 0) classNames.push(base + '--is-active');
    return classNames.join(' ');
}

function incrementCounter(count){
    return count + 1;
}

function decrementCounter(count){
    count = (count - 1);
    if (count < 0) count = 0;
    return count;
}

module.exports = React.createClass({
    displayName: 'FormAddAttachment',
    propTypes: {
        fileSources: React.PropTypes.array.isRequired,
        onFileDrop: React.PropTypes.func.isRequired,
        files: React.PropTypes.array
    },
    getInitialState: function(){
        return {
            dragCounter: 0
        }
    },
    render: function() {
        var className = generateClass("ff_module-form-add-attachment", this.props, this.state);
        return <div>
                <div className={className}>
                    <div className="ff_module-form-add-attachment__dnd"
                        onDrop={this.onDrop}
                        onDragEnter={this.onDragEnter}
                        onDragLeave={this.onDragLeave}
                        onDragOver={this.onDragOver}>
                        <span className="ff_icon ff_icon-download-to-greyblue ff_module-form-add-attachment__icon"></span>
                        <span className="ff_module-form-add-attachment__dnd-text">Drag files here to attach them</span>
                    </div>
                    <div className="ff_module-form-add-attachment__buttons">
                        <DropdownButton
                            text="Attach file"
                            modifier="block"
                            list={this.props.fileSources}/>
                    </div>
                </div>
                <div className="ff_module-form-add-attachment__filelist">
                    {renderFileList(this.props)}
                </div>
            </div>;
    },
    onDragEnter: function(){
        this.setState({
            dragCounter: incrementCounter(this.state.dragCounter)
        });
    },
    onDragLeave: function(){
        this.setState({
            dragCounter: decrementCounter(this.state.dragCounter)
        });
    },
    onDragOver: function(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    onDrop: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dragCounter: decrementCounter(this.state.dragCounter)
        });
        this.props.onFileDrop(e);
    }

});
