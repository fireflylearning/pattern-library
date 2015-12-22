'use strict';

function passThrough(className) {
    return true;
}

function filterNull(n){
    return !!n;
}

function getClassMatchSuffix(classSuffix) {
    return function(className) {
        return className.search(classSuffix) !== -1;
    };
}

function getClassNotSuffix(classSuffix) {
    return function(className) {
        // console.log('has no suffix '+className, classSuffix+'?: ', className.search(classSuffix) === -1);
        return className.search(classSuffix) === -1;
    };
}

function trimEndClasses(className) {
    // console.log('has no endClasses ' + className + '?: ', className.search(/--$/) === -1);
    return className.search(/--$/) === -1;
}

function removeClassSuffix($el, suffix) {
    if (!$el) return;
    $el.removeClass($el.attr('class').split(' ').filter(getClassMatchSuffix(suffix)).join(' '));
}

function addClassSuffix($el, suffix, rootFallback, customFilter, appendMethod) {
    appendMethod = appendMethod || function appendSuffix(className) {
        return className + suffix;
    };
    customFilter = customFilter || passThrough;

    var alreadyHasSuffix = getClassNotSuffix(suffix),
        currentClasses = $el.attr('class')
        .split(' ')
        .filter(filterNull),
        classes;

    // console.log(currentClasses);

    switch (currentClasses.length) {
        case 0:
            classes = rootFallback + suffix; // fallback default name
            break;
        default:
            classes = currentClasses
                .filter(alreadyHasSuffix)
                .filter(trimEndClasses)
                .filter(customFilter)
                .map(appendMethod)
                .join(' ');
    }
    $el.addClass(classes);
}

function getElementsBySuffix($elements, suffix) {
    var hasSuffix = getClassMatchSuffix(suffix);
    return $elements.filter(function(index, el) {
        return el.getAttribute('class').split(' ').filter(hasSuffix).length > 0;
    });
}

function getClassSuffixes($el) {
    return $el.attr('class').split(' ')
        .map(function(className) {
            var matches = className.match(/(--is-\w+)\b/g);
            return matches ? matches.join(' ') : '';
        })
        .filter(filterNull)
        .join(' ').split(' ') // flatten
        .filter(function(n, i, arr) {
            return i == arr.indexOf(n);
        });
}

module.exports = {
    addClassSuffix: addClassSuffix,
    removeClassSuffix: removeClassSuffix,
    getClassMatchSuffix: getClassMatchSuffix,
    getClassNotSuffix: getClassNotSuffix,
    getElementsBySuffix: getElementsBySuffix,
    getClassSuffixes: getClassSuffixes
};
