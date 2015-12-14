'use strict';

var $ = require('jquery');

var tabRootSel = '[data-ff-tabs]',
    tabLinkSelRaw = 'data-ff-tabs-target',
    tabContentRaw = 'data-ff-tabs-content',
    fallBackTabLinkClass = 'ff_module-tabs-navigation__tab',
    activeClassSuffix = '--active',
    tabsTest = '-tabs',
    tabLinkSel = '[' + tabLinkSelRaw + ']',
    tabContentSel = '[' + tabContentRaw + ']',
    tabContentRep = '[' + tabContentRaw + '="{val}"]';

function hasActiveClass(name) {
    return name.match(activeClassSuffix);
}

function hasTabsClass(name) {
    return name.match(tabsTest);
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
                .filter(hasTabsClass)
                .map(appendActiveClass)
                .split(' ');

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

function removeActiveClasses($root) {
    var $links = $root.find(tabLinkSel);
    var $content = $root.find(tabContentSel);
    $links.each(removeActiveClass);
    $content.each(removeActiveClass);
}

function getSwapStatesMethod($root) {
    return function swapStates(e) {
        // console.log(e, e.target, this);
        e.preventDefault();

        var $tabLink = $(this),
            target = $tabLink.attr(tabLinkSelRaw),
            $content, contentSel;

        if (target) {
            removeActiveClasses($root);
            contentSel = tabContentRep.replace(/{val}/, target);
            $content = $root.find(contentSel);
            if ($content) {
                // console.log(target, $content);
                addActiveClasses($tabLink, $content);
            }
        }
    };
}


module.exports = function() {
    $(function() {
        console.log(tabRootSel + ' activating');
        $(tabRootSel).each(function(index, tab) {
            var $root = $(tab);
            $root.on('click', tabLinkSel, getSwapStatesMethod($root));
        });

        // $('[data-ff-tabs]').tabs().removeClass('ui-widget ui-widget-content ui-corner-all');
    });
};


//data-ff-tab-target
