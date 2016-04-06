'use strict';

var React = require('react'),
    FormAddAttachment = require('../../ff_module-form-add-attachment/ff_module-form-add-attachment');

module.exports = React.createClass({
    displayName: 'EditorAddFile',
    render: function(){
        return <FormAddAttachment
                    fileSources={[
                        { text: 'From computer', onClick: function() { console.log('computer'); } },
                        { text: 'From existing file', onClick: function() { console.log('file'); } },
                        { text: 'From Google Drive', onClick: function() { console.log('google-drive'); } },
                        { text: 'From OneDrive', onClick: function() { console.log('one-drive'); } }
                    ]}
                    onFileDrop={this.props.onFileDrop}
                    files={this.props.event.files}
                />;
    }
});
