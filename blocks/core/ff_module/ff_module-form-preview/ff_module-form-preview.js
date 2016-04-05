'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormPreview',
	render: function() {
		return <div className='ff_module-form-preview'>
			<dl className='ff_module-form-preview__list'>
				{this.props.items.map((item)=>{
					var itemData;
					if (item.list) {
						itemData = <dl className='ff_module-form-preview__sublist'>
							{item.list.map((item)=>{
								return [<dt className='ff_module-form-preview__sublist__title'>{item.title}</dt>,
								<dd className='ff_module-form-preview__sublist__data' data-ff-preview-for={item.previewfor}>{item.value}</dd>]
							})}
						</dl>;
					} else if(item.html) {
						itemData = <div className='ff_module-form-preview__list__description'>{item.html}</div>
					} else {
						itemData = item.value;
					}
					return [<dt className='ff_module-form-preview__list__title'>
						<span className='ff_module-form-preview__list__title__text'>{item.title}</span>
					</dt>,
					<dd className='ff_module-form-preview__list__data' data-ff-preview-for={item.previewfor}>
						{itemData}
					</dd>];
				})}
			</dl>
		</div>;
	}
});