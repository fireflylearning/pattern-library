'use strict';

module.exports.generateStandardClass = function generateStandardClass(base, props) {
    var classNames = [base];
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    return classNames.join(' ');
};

module.exports.generateStandardSubClass = function generateStandardSubClass(base, props) {
    var classNames = [base];
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    return classNames.join(' ');
};

module.exports.generateIconClass = function generateIconClass(base, props, iconName) {
    iconName = iconName || '__icon';
    var classNames = [];
    if (props.icon) {
        classNames = ['ff_icon', 'ff_icon-' + props.icon, base + iconName]; // use config/icons.js to generate color-to-state matching
        if (props.hideText || props.hideArrow) {
            classNames.push(base + iconName + '--no-text');
        } else {
            if (props.iconAlign === 'right') classNames.push('ff_icon-right');
            else classNames.push('ff_icon-left');
        }
    }
    return classNames.join(' ');
};

module.exports.generateTextClass = function generateTextClass(base, props) {
    var classNames = [base];
    if (props.hideText || props.hideArrow) classNames.push(base+'--hidden');
    return classNames.join(' ');
};
