'use strict';

import React from 'react';
import {generateStandardClass as generateClass} from '../../_lib/_ui/class-utils.js';

export default class TaskTodo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <dl id={this.props.id} className={generateClass('ff_module-task-todo', this.props)}>
			{this.props.has_checkbox ? <dd class="ff_module-task-todo__item ff_module-task-todo__item--checkbox"> chk</dd> : null}
			<dt className="ff_module-task-todo__item ff_module-task-todo__item--title">
				{this.props.to ? <p className="ff_module-task-todo__to">{this.props.to}</p> : null }
				{this.props.link_href ?
					<a href={this.props.link_href} className="ff_module-task-todo__link">{this.props.message}</a> : 
					<span>{this.props.message}</span> 
				}
				{this.props.from ? <span className='ff_module-task-todo__meta'>Set by {this.props.from}</span> : null}
			</dt>
			<dd className="ff_module-task-todo__item ff_module-task-todo__item--date">
				{(this.props.duedate && this.props.fuzzy_date) ? <div>Due {this.props.fuzzy_date}</div> : null }
				<time className="ff_util-prose__text--small-quiet">{this.props.duedate}</time>
			</dd>
		</dl>
	}
}