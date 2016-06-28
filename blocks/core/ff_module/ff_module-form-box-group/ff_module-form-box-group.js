'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'RecipientGroup',
    render: function(){
        return (
            <div className="ff_module-form-box-group ff_module-form-box-group--is-editable" id={this.props.guid}>

                <button className="ff_module-form-box-group__edit"
                    data-edit={this.props.guid}
                    onClick={this.props.onExpand}
                    type="button">
                    <span className="ff_icon ff_icon-add-open-blue"></span>
                </button>

                <span className="ff_module-form-box-group__label">{this.props.label}</span>

                <button className="ff_module-form-box-group__delete"
                    onClick={this.props.onDelete}
                    type="button">
                    <span className="ff_icon ff_icon-cancel-open-blue"></span>
                </button>
            </div>
        );

}
});
