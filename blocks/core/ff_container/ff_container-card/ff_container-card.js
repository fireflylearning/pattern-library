'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Card';
    }
    renderItems(props) {
        var items = props.items.map((item, index) => { return <li key={index} className="ff_container-card__item">{item}</li> });
        
        return <ul className="ff_container-card__items">{items}</ul>
    }
    render() {

        return (
            <div className={generateClasses("ff_container-card", this.props)}>

                <div className="ff_container-card__header">
                    <h3 className="ff_container-card__title">
                        {this.props.title}
                    </h3>
                </div>

                <div className="ff_container-card__content">
                    {this.renderItems(this.props)}
                </div>
            </div>);
    } 
}   

 