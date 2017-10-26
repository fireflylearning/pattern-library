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
    isClickable: true,
    canAdvance: canAdvance,
    visitedCallback: function () { },
    completeCallback: function () { },
    selectedIndex: 0,
    hashNavigation: false
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

function getTabHandler($root, options) {
    var contentRep = '[' + options.contentSelBase + '="{val}"]',
        linkRep = '[' + options.linkSelBase + '="{val}"]',
        linkSel = '[' + options.linkSelBase + ']',
        contentSel = '[' + options.contentSelBase + ']',

        activeClassSuffix = options.activeClassSuffix,
        completedClassSuffix = options.completedClassSuffix,
        visitedClassSuffix = options.visitedClassSuffix,

        isClickable = options.isClickable,
        hashNavigation = options.hashNavigation || false,

        defaultLinkClass = options.defaultLinkClass,
        defaultContentClass = options.defaultContentClass,

        testIsComplete = options.isComplete,
        testCanAdvance = options.canAdvance,

        visitedCallback = options.visitedCallback,
        completeCallback = options.completeCallback,

        selectedIndex = options.selectedIndex || 0,

        main = {};

    function removeActiveClasses($elements) {
        return $elements.each(function (index, el) {
            core.removeClassSuffix($(el), activeClassSuffix);
        });
    }

    function getActiveElements($root, selectors) {
        return core.getElementsBySuffix($root.find(selectors), activeClassSuffix);
    }

    function addClasses($links, $content, suffix) {
        $links.each(function (index, el) {
            core.addClassSuffix($(el), suffix, defaultLinkClass, options.classFilter);
        });
        $content.each(function (index, el) {
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

    function init(onTabChanged) {
        $root.on('click', linkSel, handleClick);
        //set the index to the #hash OR 0 if hashes aren't being used
        var index = getHashIndex() || 0;
        main.onTabChanged = onTabChanged;

        if(hashNavigation) {
            window.addEventListener("hashchange", handleHashChange, false);
        };
        setActiveTab(index, true);
        /*jshint validthis:true */
        return main;
    }

    function handleHashChange(e) {
        setActiveTab(getHashIndex());
    }

    function getHashIndex() {
        var hash = getHash();
        if (hash) return getIndexOfTrigger(hash);
        return null;
    }

    function getHash() {
      if(hashNavigation) {
        var hash = window.location.hash.substring(1);
        if (hash) return hash;
        return null;
      }
      return null;
    }

    function getIndexOfTrigger(hash) {
        var $triggers = $root.find(linkSel);
        var index = $triggers.filter(function(i) {
            if($(this).data('label')) {
                var txt = $(this).data('label');
                if (txt == hash) return this;
            }
        });
        return index.index() || 0;
    }

    function setHash(target) {
        if ($(target).data('label'))
            window.location.hash = $(target).data('label');
    }

    function setState(target, force) {

        var target = targetInfo(target),
            $lastLinks, $lastContent;

        if (target.canAdvance || force) {
            $lastLinks = removeActiveClasses(target.$activeLinks);
            $lastContent = removeActiveClasses(target.$activeContent);
            addVisitedClasses($lastLinks, $lastContent);
            addActiveClasses(target.$selectedLinks, target.$selectedContent);
            visitedCallback($lastLinks, $lastContent, target.$selectedLinks, target.$selectedContent);

            if (target.isComplete) {
                addCompleteClasses($lastLinks, $lastContent);
                completeCallback($lastLinks, $lastContent, target.selectedLinks, target.selectedContent);
            }

            return true;
        }

        return false;
    }
    
    function targetInfo(target) {

        var targetId = $(target).attr(options.linkSelBase),
            $selectedContent, $selectedLinks,
            $activeLinks, $activeContent,
            $lastLinks, $lastContent,
            selLinkTargets, selContentTargets,
            isComplete, canAdvance;

        if (!targetId) return;

        $activeLinks = getActiveElements($root, linkSel);
        $activeContent = getActiveElements($root, contentSel);

        selLinkTargets = linkRep.replace(/{val}/, targetId);
        selContentTargets = contentRep.replace(/{val}/, targetId);

        $selectedLinks = $root.find(selLinkTargets);
        $selectedContent = $root.find(selContentTargets);

        isComplete = testIsComplete($selectedLinks, $selectedContent, $activeLinks, $activeContent);
        canAdvance = testCanAdvance($selectedLinks, $selectedContent, $activeLinks, $activeContent, main);

        return {
            isComplete: isComplete, 
            canAdvance: canAdvance,
            $selectedLinks: $selectedLinks,
            $selectedContent: $selectedContent,
            $activeLinks: $activeLinks,
            $activeContent: $activeContent
        }
    }

    function handleClick(e) {
        e.preventDefault();
         if (isClickable == true) {
            var $triggers = $root.find(linkSel);
            var index = $triggers.index(this);
            setActiveTab(index);
        }
    }

    function testBounds(value, length) {
        if (value < 0) {
            return length - 1;
        } else if (value >= length) {
            return 0;
        } else return value;
    }

    function setPageTitle() {
        var pageTitle = document.title.split(" : ")[1] == undefined ? document.title : document.title.split(" : ")[1];
        var triggerText = $(".ff_module-formstep__text", getTrigger(getHashIndex() || 0).trigger).text();
        if (triggerText != "") {
            pageTitle = triggerText + ' : ' + pageTitle;
        }
        document.title = pageTitle;
    }

    function setActiveTab(index, force) {
        var trigObj = getTrigger(index),
            $trigger = trigObj.trigger;

        if ($trigger) {
            var canAdvance = setState($trigger, force);
            if (canAdvance) selectedIndex = trigObj.attemptIndex;
            
            if(main.onTabChanged) {
                main.onTabChanged(selectedIndex);
            }
        }

        if (hashNavigation) {
            setPageTitle();
        }

        /*jshint validthis:true */
        return main;
    }

    function getTrigger(index) {
        var $triggers = $root.find(linkSel);
        var attemptIndex = testBounds(index, $triggers.length);
        var $trigger = $triggers.get(attemptIndex);
        return {
            trigger: $trigger,
            attemptIndex: attemptIndex
        }
    }

    function next() {     
        var target = getTrigger(getHashIndex() + 1).trigger;
        if (targetInfo(target).canAdvance) 
            return setHash(target);
    }

    function back() {
        var target = getTrigger(getHashIndex() - 1).trigger;
        if (targetInfo(target).canAdvance) 
            return setHash(target);
    }

    main.handleClick = handleClick;
    main.getTrigger = getTrigger;
    main.getIndexOfTrigger = getIndexOfTrigger;
    main.setActiveTab = setHash;
    main.getHashIndex = getHashIndex;
    main.next = next;
    main.back = back;
    main.init = init;

    return main;
}

module.exports = {
    defaultOptions: _options,
    create: function (options) {
        options = $.extend({}, _options, options);
        var $root = $(options.root);

        return getTabHandler($root, options);
    }
};
