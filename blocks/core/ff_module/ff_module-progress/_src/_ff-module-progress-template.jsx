'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Progress',

  getCompletedWidth: function() {
    return {width: Math.floor(((this.props.completedBy / this.props.sentTo) - (this.props.marked / this.props.sentTo)) * 100)+'%'};
  },

  getMarkedWidth: function() {
    return {width: Math.floor(this.props.marked / this.props.sentTo * 100)+'%'};
  },

  generateClass: function(base) {
    var classNames = [],
        props = this.props;
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    return classNames.join(' ');
  },

  generateBarClass: function(base,type) {
    var classNames = [],
        props = this.props;
    classNames.push(base);
    classNames.push(base + '--' + type);
    if(type === 'marked') {
      if(props.marked === props.completedBy || props.completedBy === 0) { classNames.push(base + '--lonely'); }
    } else {
      var calculatedMarkedValue = Math.floor(props.marked / props.sentTo * 100);
      if(calculatedMarkedValue === 0) { classNames.push(base + '--lonely'); }
    }
    return classNames.join(' ');
  },

  generateTitle: function(type,name) {
    return type + ' ' + name;
  },

  render: function() {

    var marked = this.props.marked,
        completed = this.props.completedBy,
        total = this.props.sentTo;

    return <div className={this.generateClass('ff_module-progress')}>
      <div className="ff_module-progress__stacked">
          <div className={this.generateBarClass('ff_module-progress__bar','marked')} style={this.getMarkedWidth()} title={marked+' Marked'}>
              <span className="ff_module-progress__meta">{this.generateTitle(marked,'Marked')}</span>
          </div>
          <div className={this.generateBarClass('ff_module-progress__bar','completed')} style={this.getCompletedWidth()} title={completed+' completed'}>
              <span className="ff_module-progress__meta">{this.generateTitle(completed,'Completed')}</span>
          </div>
      </div>
      <ul className="ff_module-progress__key">
          <li className="ff_module-progress__label ff_module-progress__label--marked"><span className="ff_module-progress__label-value">{marked}</span> Marked</li>
          <li className="ff_module-progress__label ff_module-progress__label--completed"><span className="ff_module-progress__label-value">{completed}</span> Completed</li>
          <li className="ff_module-progress__label ff_module-progress__label--total"><span className="ff_module-progress__label-value">{total}</span> Total</li>
      </ul>
    </div>
  }
});
