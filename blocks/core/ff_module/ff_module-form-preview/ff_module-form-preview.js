'use strict';

var React = require('react');
var InlineEdit = require('../ff_module-inline-edit/ff_module-inline-edit');
var Progress = require('../ff_module-progress/ff_module-progress');
var ModuleFileList = require('../ff_module-file-list/ff_module-file-list');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;
var dateUtils = require('../../_lib/_ui/date-utils');
var convertToDateObjectIfDateString = dateUtils.convertToDateObjectIfDateString;
var isDateObject = dateUtils.isDateObject;
var toDateString = require('../../_lib/_ui/dateFormatting')().toLongMonthDateString;

module.exports = React.createClass({
    displayName: 'FormPreview',
    propTypes: {
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                key: React.PropTypes.string,
                title: React.PropTypes.string.isRequired,
                url: React.PropTypes.string,
                value: React.PropTypes.string,
                modifier: React.PropTypes.string,
                previewFor: React.PropTypes.string,
                fileList: React.PropTypes.shape(ModuleFileList.propTypes),
                list: React.PropTypes.array,
                html: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.element
                ]),
                component: React.PropTypes.element
            })
        ).isRequired
    },

    componentDidMount: function() {
        if (window.ffEventHandler) {
            window.ffEventHandler.pushEvent("componentready");
        }
    },

    render: function() {
        return <div className={generateClass('ff_module-form-preview', this.props)}>
            <ul className='ff_module-form-preview__list'>
                {this.props.items.map((item, index)=>{
                    var isInlineEdit = item.url ?  <span className='ff_module-form-preview__edit-link'><InlineEdit url={item.url} text='Edit'></InlineEdit></span> : '';
                    var itemValueAsDate = convertToDateObjectIfDateString(item.value);
                    var itemData;

                    if (item.list) {
                        itemData = <dl className='ff_module-form-preview__sublist'>
                            {item.list.map((_item)=>{
                                var dateOb = convertToDateObjectIfDateString(_item.value);
                                var itemVal = isDateObject(dateOb) ? toDateString(dateOb) : _item.value;

                                return [
                                    <dt className='ff_module-form-preview__sublist__title' key='sublist-title'>{_item.title}</dt>,
                                    <dd className='ff_module-form-preview__sublist__data' data-ff-preview-for={_item.previewfor} key='sublist-data'>{itemVal}</dd>
                                ];
                            })}
                        </dl>;

                    } else if (item.html) {
                        var htmlNode;
                        if (typeof item.html === 'string') {
                            htmlNode = <div className='ff_module-form-preview__list__description' dangerouslySetInnerHTML={{__html: item.html}} />;
                        } else if (typeof item.html === 'object' && item.html.props !== null) {
                            htmlNode = <div className='ff_module-form-preview__list__description'>{item.html}</div>;
                        }
                        itemData = htmlNode;
                    } else if (item.progress) {
                        itemData = <div className="ff_module-form-preview__progress"><Progress {...item.progress}/></div>;
                    } else if (item.fileList) {
                        itemData = <ModuleFileList {...item.fileList}/>;
                    } else if (item.component) {
                        itemData = <div className='ff_module-form-preview__component'>{item.component}</div>;
                    } else if (isDateObject(itemValueAsDate)) {
                        itemData = toDateString(itemValueAsDate);
                    } else {
                        itemData = item.value;
                    }

                    return (
                        <li key={item.key !== undefined ? item.key : ''+index} className={generateClass('ff_module-form-preview__item', item) }>
                            <dl>
                                <dt className='ff_module-form-preview__list__title'><span className='ff_module-form-preview__list__title__text'>{item.title}</span>{isInlineEdit}</dt>
                                <dd className='ff_module-form-preview__list__data' data-ff-preview-for={item.previewfor}>{itemData}</dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        </div>;
    }
});
