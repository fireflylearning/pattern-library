'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

function DataListTitle(props) {
    return (
        <dt className="ff_module-form-summary__list__title">
            {props.children}
        </dt>
    );
}

function DataListDatum(props) {
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
                    <dl className="ff_module-form-summary__list">
                    {this.props.list.map(item => {
                        return [
                            <DataListTitle key='title'>{item.title}</DataListTitle>,
                            <DataListDatum key='data'>{renderItem(item)}</DataListDatum>
                        ];
                    })}
                    </dl>
                    {this.props.children}

                </div>
            </div>

        );
    }
})
