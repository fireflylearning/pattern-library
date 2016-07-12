'use strict';

var React = require('react');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

module.exports = React.createClass({
    displayName: 'ItemRepeater',
    render: function(){
        return (
            <div className={generateClass('ff_container-item-repeater', this.props)}>
                <ol className="ff_container-item-repeater__items">
                    {React.Children.toArray(this.props.children).map(child =>
                        <li className={generateClass('ff_container-item-repeater__item', this.props)}
                            key={child.key}>
                            {child}
                        </li>
                    )}
                </ol>
            </div>
        );
    }
});
