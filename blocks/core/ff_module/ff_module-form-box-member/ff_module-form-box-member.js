'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'RecipientMember',
    render: function(){
        return (
            <div className="ff_module-form-box-member" id={this.props.guid}>

                <span className="ff_module-form-box-member__label">{this.props.label}</span>

                <button className="ff_module-form-box-member__delete"
                    onClick={this.props.onDelete}
                    type="button">
                    <span className="ff_icon ff_icon-cancel-open-blue"></span>
                </button>
            </div>
        );
    }
});
