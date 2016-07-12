'use strict';

var React = require('react');
var FormInput = require('../ff_module-form-input/ff_module-form-input');
var FormLabel = require('../ff_module-form-label/ff_module-form-label');

var FormField = require('../../ff_module/ff_module-form-field/ff_module-form-field');

var track = require('react-redux-form').track;


module.exports = React.createClass({
	displayName: 'CheckableList',
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            label: React.PropTypes.string,
            id: React.PropTypes.string.isRequired
        }))
    },
	generateClass: function(base, props) {
		var classNames = [];
		props = props || {};
		classNames.push(base);
		if (!!props.modifier) classNames.push(base + '--' + props.modifier);
		if (!!props.classes) classNames.push(props.classes);
		if (!!props.className) classNames.push(props.className);
		return classNames.join(' ');
	},
	render: function() {
		return <ul className='ff_module-form-checkable-list'>
				{this.props.items.map((item, index)=>{
					var model = this.props.model || null;

					var formPair = <div className={this.generateClass('ff_module-form-pair' , this.props)}>
                    <FormInput checked={item.checked} id={item.id} value={item.value} onChange={this.props.onChange} onClick={this.props.onClick} onBlur={this.props.onBlur} onFocus={this.props.onFocus} modifier={this.props.modifier} name={item.name} type={item.type || 'radio'} />
                    <FormLabel id={item.id} required={item.required} modifier={this.props.modifier}>{item.label}</FormLabel>
                    </div>;

                    var field = model ? <FormField model={model}>{formPair}</FormField> : formPair;
                    var key = item.key || ( item.id ? 'cl'+item.id : 'cl'+index);
					return <li key={key} className={this.generateClass('ff_module-form-checkable-list__item', this.props)}>
                    {field}
                    </li>;
				})}
		</ul>;
	}
});
