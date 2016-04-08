'use strict';

var React = require('react');
var InlineEdit = require('../ff_module-inline-edit/ff_module-inline-edit');

module.exports = React.createClass({
	displayName: 'FormPreview',
	propTypes: {
		items: React.PropTypes.array.isRequired,
		title: React.PropTypes.string,
		url: React.PropTypes.string,
		value: React.PropTypes.string,
		previewFor: React.PropTypes.string,
		list: React.PropTypes.array,
		html: React.PropTypes.element
	},
	render: function() {
		return <div className='ff_module-form-preview'>
			<dl className='ff_module-form-preview__list'>
				{this.props.items.map((item)=>{
					var isInlineEdit = item.url ?  <span className='ff_module-form-preview__edit-link'><InlineEdit url={item.url} text='Edit'></InlineEdit></span> : '';
					
					var listItemTitle = <dt className='ff_module-form-preview__list__title'>
					<span className='ff_module-form-preview__list__title__text'>{item.title}</span>{isInlineEdit}</dt>;
					
					var listItemData;
					
					if (item.list) {
						listItemData = <dl className='ff_module-form-preview__sublist'>
							{item.list.map((item)=>{
								return [<dt className='ff_module-form-preview__sublist__title'>{item.title}</dt>,
								<dd className='ff_module-form-preview__sublist__data' data-ff-preview-for={item.previewfor}>{item.value}</dd>]
							})}
						</dl>;
					} else if(item.html) {
						listItemData = <div className='ff_module-form-preview__list__description'>{item.html}</div>
					} else {
						listItemData = item.value;
					}
					return [ listItemTitle, <dd className='ff_module-form-preview__list__data' data-ff-preview-for={item.previewfor}>{listItemData}</dd> ];
				})}
			</dl>
		</div>;
	}
});