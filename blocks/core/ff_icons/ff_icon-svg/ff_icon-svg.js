'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

export default class IconSVG extends React.Component {

  constructor(props) {
    super(props);
    this.base = props.base || "/Templates/lib/core/patterns/icons/sprites.svg#ff_icon-";
  };

  generateDataAttrs() {
    if (this.props.data) {
      var attributes = {};
      this.props.data.forEach(function(attribute) {
        attributes[attribute.attr] = attribute.value;
      });
      return attributes;
    }
  }

  render() {
    var iconURL = this.base + this.props.name;
    return <svg className={generateClasses("ff_icon-svg", this.props)} {...this.generateDataAttrs()}><use xlinkHref={iconURL}/></svg>;
  };

};
