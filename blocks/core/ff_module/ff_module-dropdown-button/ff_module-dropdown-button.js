'use strict';

var $ = require('jquery'),
    core = require('../../_lib/ff-core/_ff-core.js'),
    _ = require('underscore'),
    docVal = (typeof window !== 'undefined' && window.document) ? window.document : 'document',
    storedDropdownID = '';

var _options = {
    root: docVal,
    triggerSelBase: 'data-ff-dropdown-trigger',
    targetSelBase: 'data-ff-dropdown-target',
    enabledClassSuffix: '--is-enabled',
    openClassSuffix: '--is-open',
    defaultTriggerClass: 'ff_module-dropdown-button__button',
    defaultTargetClass: 'ff_module-dropdown-button__dropdown-container',
    overflowLeftSuffix: '--has-overflow-left',
    overflowRightSuffix: '--has-overflow-right',
    overflowViewportSuffix: '--has-overflow-viewport'
};

function activateDropdowns(options) {

    var $root = $(options.root),
        triggerSelBase = options.triggerSelBase,
        targetSelBase = options.targetSelBase;

    var triggerSel = '[' + triggerSelBase + ']',
        targetSel = '[' + targetSelBase + ']',
        triggerRep = '[' + triggerSelBase + '="{val}"]',
        targetRep = '[' + targetSelBase + '="{val}"]';

    var defaultTriggerClass = options.defaultTriggerClass,
        defaultTargetClass = options.defaultTargetClass,
        openClassSuffix = options.openClassSuffix,
        enabledClassSuffix = options.enabledClassSuffix,
        overflowLeftSuffix = options.overflowLeftSuffix,
        overflowRightSuffix = options.overflowRightSuffix,
        overflowViewportSuffix = options.overflowViewportSuffix;

    function removeSuffix($elements, suffix) {
        return $elements.each(function(index, el) {
            core.removeClassSuffix($(el), suffix);
        });
    }

    function addSuffix($elements, suffix, defaultClass) {
        return $elements.each(function(index, el) {
            core.addClassSuffix($(el), suffix, defaultClass, options.classFilter);
        });
    }

    function getCurrentState(suffixes) {
        var currentState = '';

        switch (true) {
            case suffixes.indexOf(openClassSuffix) > -1:
                currentState = openClassSuffix;
                break;
            case suffixes.indexOf(enabledClassSuffix) > -1:
                currentState = enabledClassSuffix;
                break;
        }
        return currentState;
    }

    function getNewState(suffixes) {
        var toggleState = '';

        switch (true) {
            case suffixes.indexOf(openClassSuffix) > -1:
                toggleState = enabledClassSuffix;
                break;
            case suffixes.indexOf(enabledClassSuffix) > -1:
                toggleState = openClassSuffix;
                break;
        }

        return toggleState;
    }


    function toggleState(el) {
        var $trigger = $(el);

        var id = $trigger.attr(triggerSelBase),
            suffixes = core.getClassSuffixes($trigger),
            currentState = getCurrentState(suffixes),
            newState = getNewState(suffixes);

        var triggerSels = triggerRep.replace(/{val}/, id),
            targetSels = targetRep.replace(/{val}/, id);


        var $triggers = $root.find(triggerSels).addBack(triggerSels),
            $targets = $root.find(targetSels).addBack(targetSels);

        removeSuffix($triggers, currentState);
        removeSuffix($targets, currentState);
        removeSuffix($targets, overflowLeftSuffix);
        removeSuffix($targets, overflowRightSuffix);
        removeSuffix($targets, overflowViewportSuffix);

        addSuffix($triggers, newState, defaultTriggerClass);
        addSuffix($targets, newState, defaultTargetClass);

        var $overflowViewportTargets = $targets.filter(core.widerThanViewport);
        var $remainingTargets = $targets.not(core.widerThanViewport);
        var $overflowLeftTargets = $remainingTargets.filter(core.offViewportLeft);
        var $overflowRightTargets = $remainingTargets.filter(core.offViewportRight);

        addSuffix($overflowViewportTargets, overflowViewportSuffix, defaultTargetClass);
        addSuffix($overflowLeftTargets, overflowLeftSuffix, defaultTargetClass);
        addSuffix($overflowRightTargets, overflowRightSuffix, defaultTargetClass);
    }

    function resetPreviousDropdown() {
        var $triggers = $(triggerSel).filter('[' + triggerSelBase + '=' + storedDropdownID + ']');
        var $targets = $(targetSel).filter('[' + targetSelBase + '=' + storedDropdownID + ']');

        removeSuffix($triggers, openClassSuffix);
        removeSuffix($targets, openClassSuffix);
        addSuffix($triggers, enabledClassSuffix, defaultTriggerClass);
        addSuffix($targets, enabledClassSuffix, defaultTargetClass);
    }

    function updateStoredDropdown(el) {
        storedDropdownID = $(el).attr(triggerSelBase);
    }

    $(function() {
        addSuffix($root.find(triggerSel).addBack(triggerSel), options.enabledClassSuffix, defaultTriggerClass);
        addSuffix($root.find(targetSel).addBack(targetSel), options.enabledClassSuffix, defaultTargetClass);

        $root.on('click', triggerSel, function(e) {
            e.preventDefault();
            e.stopPropagation();

            if ( storedDropdownID !== $(this).attr(triggerSelBase) ) {
                resetPreviousDropdown();
                updateStoredDropdown(this);
            }
            
            toggleState(this);

        });

        $(document).off('.dropDown').on('click.dropDown', resetPreviousDropdown);

    });

}

var activated = [];
/**
 * Ensure exported method is called only once DOM is ready
 */

module.exports = function(options) {
    options = $.extend({}, _options, options);

    var isActivatedForTheseOptions = _.some(activated, function(optionSet) {
        return _.isEqual(optionSet, options);
    });

    if (!isActivatedForTheseOptions) {
        activateDropdowns(options);
        activated.push(options);
    }
};
