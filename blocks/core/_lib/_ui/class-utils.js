'use strict';

module.exports.generateStandardClass = function generateStandardClass(base, props) {
    var classNames = [];
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    return classNames.join(' ');
};
