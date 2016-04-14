'use strict';

var React = require('react');
var InlineEdit = require('../ff_module-inline-edit/ff_module-inline-edit');
var Progress = require('../ff_module-progress/ff_module-progress');

module.exports = React.createClass({
	displayName: 'FormPreview',
	propTypes: {
		items: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				title: React.PropTypes.string.isRequired,
				url: React.PropTypes.string,
				value: React.PropTypes.string,
				previewFor: React.PropTypes.string,
				list: React.PropTypes.array,
				html: React.PropTypes.element
			})
		).isRequired
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
		return <div className='ff_module-form-preview'>
			<ul className='ff_module-form-preview__list'>
				{this.props.items.map((item)=>{
					var isInlineEdit = item.url ?  <span className='ff_module-form-preview__edit-link'><InlineEdit url={item.url} text='Edit'></InlineEdit></span> : '';
					var itemData;
					
					switch(true) {
						case !!item.list:
							itemData = <dl className='ff_module-form-preview__sublist'>
								{item.list.map((item)=>{
									return [<dt className='ff_module-form-preview__sublist__title'>{item.title}</dt>,
									<dd className='ff_module-form-preview__sublist__data' data-ff-preview-for={item.previewfor}>{item.value}</dd>];
								})}
							</dl>;
							break;
						case !!item.html:
							itemData = <div className='ff_module-form-preview__list__description'>{item.html}</div>;
							break;
						case !!item.progress:
							itemData = <div className="ff_module-form-preview__progress"><Progress {...item.progress}/></div>;
							break;
						case !!item.markingControls:
							itemData = <div className='ff_module-form-preview__controls'>{this.props.controls}</div>;
							break;
						default:
							itemData = item.value;

					}
					return <li className={this.generateClass('ff_module-form-preview__item', item) }>
						<dl>
							<dt className='ff_module-form-preview__list__title'><span className='ff_module-form-preview__list__title__text'>{item.title}</span>{isInlineEdit}</dt>
						<dd className='ff_module-form-preview__list__data' data-ff-preview-for={item.previewfor}>{itemData}</dd>
						</dl>
					</li>;
				})}
			</ul>
		</div>;
	}
});