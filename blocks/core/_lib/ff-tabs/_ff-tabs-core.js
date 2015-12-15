'use strict';

var $ = require('jquery');

var _options = {
    root: document,
    filter: identity,
    linkSelRaw: 'data-ff-tabs-target',
    contentSelRaw: 'data-ff-tabs-content',
    defaultLinkClass: 'ff_module-tabs-navigation__tab',
    activeClassSuffix: '--active',
};

function identity(name) {
    return true;
}

function getSwapStatesMethod($root, options) {
    var tabContentRep = '[' + options.contentSelRaw + '="{val}"]',
        tabLinkSel = '[' + options.linkSelRaw + ']',
        tabContentSel = '[' + options.contentSelRaw + ']',

        activeClassSuffix = options.activeClassSuffix,
        fallBackTabLinkClass = options.defaultLinkClass,
        filterMethod = options.filter;

    function removeActiveClasses($root) {
        var $links = $root.find(tabLinkSel);
        var $content = $root.find(tabContentSel);
        $links.each(removeActiveClass);
        $content.each(removeActiveClass);
    }

    function hasActiveClass(name) {
        return name.match(activeClassSuffix);
    }

    function appendActiveClass(name) {
        return name + activeClassSuffix;
    }

    function addActiveClass($el) {
        var currentClasses = $el.attr('class').split(' '),
            tabClasses,
            className = fallBackTabLinkClass + activeClassSuffix; // fallback default name

        switch (currentClasses.length) {
            case 0:
                $el.addClass(className);
                break;
            case 1:
                className = currentClasses[0] + activeClassSuffix;
                $el.addClass(className);
                break;
            default:
                tabClasses = currentClasses
                    .filter(filterMethod)
                    .map(appendActiveClass)
                    .join(' ');
                $el.addClass(tabClasses);

        }
    }

    function addActiveClasses($link, $content) {
        addActiveClass($link);
        addActiveClass($content);
    }

    function removeActiveClass(index, el) {
        var $el = $(el),
            activeClasses;
        if (!$el.length) return;
        activeClasses = $el.attr('class').split(' ').filter(hasActiveClass);
        $el.removeClass(activeClasses.join(' '));
    }

    return function swapStates(e) {
        e.preventDefault();

        var $tabLink = $(this),
            target = $tabLink.attr(options.linkSelRaw),
            $content, contentSel;

        if (target) {
            removeActiveClasses($root);
            contentSel = tabContentRep.replace(/{val}/, target);
            $content = $root.find(contentSel);
            if ($content) {
                addActiveClasses($tabLink, $content);
            }
        }
    };
}

function setClickHandler($root, options) {
    var tabLinkSel = '[' + options.linkSelRaw + ']';
    $root.on('click', tabLinkSel, getSwapStatesMethod($root, options));
}

module.exports = {
    setClickHandler: setClickHandler,
    defaultOptions: _options
};


