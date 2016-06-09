'use strict';

var React = require('react');

var ResultButton = require('../../../ff_module-profile-picture-and-name/ff_module-profile-picture-and-name-button/ff_module-profile-picture-and-name-button');

module.exports = React.createClass({
    displayName: 'RecipientButtonList',
    propTypes: {
        results: React.PropTypes.array.isRequired,
        isSelected: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <ul className="ff_module-recipient-button-list">
                {this.props.results.map(result=>
                    <li className="ff_module-recipient-button-list__item"
                        key={result.guid}>
                        <ResultButton guid={result.guid}
                            label={result.label}
                            pic_href={result.pic_href}
                            isSelected={this.props.isSelected(result.guid)}
                            onSelect={()=>this.props.onSelect(result.guid)} />
                    </li>
                )}

            </ul>
        );
    }
});
