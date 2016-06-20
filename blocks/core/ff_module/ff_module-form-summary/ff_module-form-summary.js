'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'FormSummary',
    render: function(){
        return (
            <div className="ff_module-form-summary">
                <div className="ff_module-form-summary__header">
                    <h3 className="ff_module-form-summary__title">
                        {this.props.title}
                    </h3>
                </div>

                <div className="ff_module-form-summary__content">
                    <dl className="ff_module-form-summary__list">
                    {this.props.items.map(item => {
                        return [
                            <dt key='title' className="ff_module-form-summary__list__title">
                                {item.title}
                            </dt>,
                            <dd key='data' className="ff_module-form-summary__list__data">

                                {item.url ?

                                    <a href={item.url} className="ff_module-form-summary__list__link">
                                        {item.data}
                                    </a> :

                                    item.data
                                }

                            </dd>
                        ];
                    })}
                    </dl>
                    {this.props.children}

                </div>
            </div>

        );
    }
})
