'use strict';

var $ = require('jquery');
var core = require('../ff-core/_ff-core.js');

var _options = {
    root: document,
    classFilter: passThrough,
    linkSelBase: 'data-ff-tabs-target',
    contentSelBase: 'data-ff-tabs-content',
    defaultLinkClass: 'ff_module-tabs-navigation__tab',
    defaultContentClass: 'ff_container-tabs-content',
    activeClassSuffix: '--is-active',
    completedClassSuffix: '--is-complete',
    visitedClassSuffix: '--is-visited',
    isComplete: isComplete,
    canAdvance: canAdvance
};

function isComplete($nextLink, $nextContent, $currentLink, $selectedContent) {
    if ($nextContent.length) return true;
    return false;
}

function canAdvance($nextLink, $nextContent, $currentLink, $selectedContent) {
    if ($nextContent.length) return true;
    return false;
}

function passThrough(name) {
    return true;
}

function getSwapStatesMethod($root, options) {
    var contentRep = '[' + options.contentSelBase + '="{val}"]',
        linkRep = '[' + options.linkSelBase + '="{val}"]',
        linkSel = '[' + options.linkSelBase + ']',
        contentSel = '[' + options.contentSelBase + ']',

        activeClassSuffix = options.activeClassSuffix,
        completedClassSuffix = options.completedClassSuffix,
        visitedClassSuffix = options.visitedClassSuffix,

        defaultLinkClass = options.defaultLinkClass,
        defaultContentClass = options.defaultContentClass,

        testIsComplete = options.isComplete,
        testCanAdvance = options.canAdvance;


    function removeActiveClasses($elements) {
        return $elements.each(function(index, el) {
            core.removeClassSuffix($(el), activeClassSuffix);
        });
    }


    function getActiveElements($root, selectors) {
        return core.getElementsBySuffix($root.find(selectors), activeClassSuffix);
    }

    function addClasses($links, $content, suffix) {
        $links.each(function(index, el) {
            core.addClassSuffix($(el), suffix, defaultLinkClass, options.classFilter);
        });
        $content.each(function(index, el) {
            core.addClassSuffix($(el), suffix, defaultContentClass, options.classFilter);
        });
    }

    function addActiveClasses($links, $content) {
        addClasses($links, $content, activeClassSuffix);
    }

    function addCompleteClasses($links, $content) {
        addClasses($links, $content, completedClassSuffix);
    }

    function addVisitedClasses($links, $content) {
        addClasses($links, $content, visitedClassSuffix);
    }

    return function swapStates(e) {
        e.preventDefault();

        var target = $(this).attr(options.linkSelBase),
            $selectedContent, $selectedLinks,
            $activeLinks, $activeContent,
            $lastLinks, $lastContent,
            selLinkTargets, selContentTargets,
            isComplete, canAdvance;

        if (!target) return;

        selLinkTargets = linkRep.replace(/{val}/, target);
        selContentTargets = contentRep.replace(/{val}/, target);

        $selectedLinks = $root.find(selLinkTargets);
        $selectedContent = $root.find(selContentTargets);

        $activeLinks = getActiveElements($root, linkSel);
        $activeContent = getActiveElements($root, contentSel);

        isComplete = testIsComplete($selectedLinks, $selectedContent, $activeLinks, $activeContent);
        canAdvance = testCanAdvance($selectedLinks, $selectedContent, $activeLinks, $activeContent);

        if (canAdvance) {
            $lastLinks = removeActiveClasses($activeLinks);
            $lastContent = removeActiveClasses($activeContent);
            addVisitedClasses($lastLinks, $lastContent);
            addActiveClasses($selectedLinks, $selectedContent);
            if (isComplete) {
                addCompleteClasses($lastLinks, $lastContent);
            }
        }

    };
}

function setClickHandler($root, options) {
    var linkSel = '[' + options.linkSelBase + ']';
    $root.on('click', linkSel, getSwapStatesMethod($root, options));
}

module.exports = {
    setClickHandler: setClickHandler,
    defaultOptions: _options
};
