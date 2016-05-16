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
    canAdvance: canAdvance,
    visitedCallback: function() {},
    completeCallback: function() {},
    selectedIndex: 0
};

function isComplete($nextLink, $nextContent, $currentLink, $selectedContent) {
    console.log('$nextContent: ' + $nextContent);
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

function getTabHandler($root, options) {
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
        testCanAdvance = options.canAdvance,

        visitedCallback = options.visitedCallback,
        completeCallback = options.completeCallback,

        selectedIndex = options.selectedIndex || 0,
        main = {};


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

    function init() {
        $root.on('click', linkSel, handleClick);
        checkIfHash();

        /*jshint validthis:true */
        return main;
    }

    function checkIfHash() {
        var hash = window.location.hash.substring(1);
        getIndexOfTrigger(hash);
    }

    function getIndexOfTrigger(hash) {
        var $triggers = $root.find(linkSel);
        $('.ff_module-formstep__text', $triggers).each(function(i) {
            var txt = $(this).text().toLowerCase();
            if (txt === hash) selectedIndex = i;
        });

        console.log(selectedIndex)
        setActiveTab(selectedIndex);
    }

    function setHash(hash) {
        window.location.hash = hash;
    }

    function setState(target, index) {
        var targetId = $(target).attr(options.linkSelBase),
            $selectedContent, $selectedLinks,
            $activeLinks, $activeContent,
            $lastLinks, $lastContent,
            selLinkTargets, selContentTargets,
            isComplete, canAdvance;

        if (!targetId) return;

        selLinkTargets = linkRep.replace(/{val}/, targetId);
        selContentTargets = contentRep.replace(/{val}/, targetId);

        $selectedLinks = $root.find(selLinkTargets);
        $selectedContent = $root.find(selContentTargets);

        $activeLinks = getActiveElements($root, linkSel);
        $activeContent = getActiveElements($root, contentSel);

        isComplete = testIsComplete($selectedLinks, $selectedContent, $activeLinks, $activeContent);
        // isComplete = false;
        canAdvance = testCanAdvance($selectedLinks, $selectedContent, $activeLinks, $activeContent);

        if (canAdvance) {
            $lastLinks = removeActiveClasses($activeLinks);
            $lastContent = removeActiveClasses($activeContent);
            addVisitedClasses($lastLinks, $lastContent);
            addActiveClasses($selectedLinks, $selectedContent, index);
            visitedCallback($lastLinks, $lastContent, $selectedLinks, $selectedContent);
            console.log('isComplete: '+ isComplete);
            if (isComplete) {
                addCompleteClasses($lastLinks, $lastContent);
                completeCallback($lastLinks, $lastContent, $selectedLinks, $selectedContent);
            }
            return true;
        }
        return false;
    }

    function handleClick(e) {
        e.preventDefault();
        var $triggers = $root.find(linkSel);

        /*jshint validthis:true */
        var index = $triggers.index(this);
        setActiveTab(index);
        setHash($(this).data('label').toLowerCase());
    }

    function testBounds(value, length) {
        if (value < 0) {
            return length - 1;
        } else if (value >= length) {
            return 0;
        } else return value;
    }

    function setActiveTab(index) {
        var $triggers = $root.find(linkSel);
        var attemptIndex = testBounds(index, $triggers.length);
        var trigger = $triggers.get(attemptIndex);
        if (trigger) {
            var canAdvance = setState(trigger);
            if (canAdvance) selectedIndex = attemptIndex;
        }
        /*jshint validthis:true */
        return main;
    }

    function next() {
        return setActiveTab(selectedIndex + 1);
    }

    function previous() {
        return setActiveTab(selectedIndex - 1);
    }

    // main.handleClick = handleClick;
    // main.setActiveTab = setActiveTab;
    main.next = next;
    main.previous = previous;
    main.init = init;

    return main;
}


module.exports = {
    defaultOptions: _options,
    create: function(options) {
        options = $.extend({}, _options, options);
        var $root = $(options.root);

        return getTabHandler($root, options);
    }
};
