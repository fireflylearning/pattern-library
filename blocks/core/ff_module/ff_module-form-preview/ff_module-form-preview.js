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
	render: function() {
		return <div className='ff_module-form-preview'>
			<ul className='ff_module-form-preview__list'>
				{this.props.items.map((item)=>{
					var isInlineEdit = item.url ?  <span className='ff_module-form-preview__edit-link'><InlineEdit url={item.url} text='Edit'></InlineEdit></span> : '';
					var isAdditionalInfo = item.progress ?  'ff_module-form-preview__item--additional-info' : '';
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
							itemData = <div><div className="ff_module-form-preview__progress"><Progress {...item.progress}/></div> <div className='ff_module-form-preview__controls'>{!!item.markingControls ? this.props.controls : ''}</div></div>;
							break;
						default:
							itemData = item.value;

					}
					return <li className={'ff_module-form-preview__item ' + isAdditionalInfo}>
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