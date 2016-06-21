'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

function DefListTitle(props) {
    return (
        <dt className="ff_module-form-summary__list__title">
            {props.children}
        </dt>
    );
}

function DefListDatum(props) {
    return (
        <dd className="ff_module-form-summary__list__data">
            {props.children}
        </dd>
    )
}

function renderItem(item) {
    return (
        item.url ?

        <a href={item.url} className="ff_module-form-summary__list__link">
            {item.content}
        </a> :

        item.content
    );

}

function renderList(props) {
    if (props.list) {
        return (
            <dl className="ff_module-form-summary__list">
            {props.list.map(item => {
                return [
                    <DefListTitle key='title'>{item.title}</DefListTitle>,
                    <DefListDatum key='data'>{renderItem(item)}</DefListDatum>
                ];
            })}
            </dl>
        );
    }
    return null;
}

module.exports = React.createClass({
    displayName: 'FormSummary',
    props: {
        title: React.PropTypes.string.isRequired,
        list: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            content: React.PropTypes.node
        }))
    },
    render: function(){
        return (
            <div className={generateClasses("ff_module-form-summary", this.props)}>

                <div className="ff_module-form-summary__header">
                    <h3 className="ff_module-form-summary__title">
                        {this.props.title}
                    </h3>
                </div>

                <div className="ff_module-form-summary__content">
                    {renderList(this.props)}
                    {this.props.children}
                </div>
            </div>

        );
    }
})
