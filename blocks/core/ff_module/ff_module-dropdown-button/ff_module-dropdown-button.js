'use strict';

var $ = require('jquery');
var core = require('../../_lib/ff-core/_ff-core.js');

var _options = {
    root: document,
    triggerSelBase: 'data-ff-dropdown-trigger',
    targetSelBase: 'data-ff-dropdown-target',
    enabledClassSuffix: '--is-enabled',
    openClassSuffix: '--is-open',
    defaultTriggerClass: 'ff_module-dropdown-button__button',
    defaultTargetClass: 'ff_module-dropdown-button__dropdown-container'
};



function activateDropdowns(options) {
    options = $.extend({}, _options, options);

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
        enabledClassSuffix = options.enabledClassSuffix;

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


        var $triggers = $root.find(triggerSels),
            $targets = $root.find(targetSels);
            console.log(id, $triggers, $targets);

        removeSuffix($triggers, currentState);
        removeSuffix($targets, currentState);

        addSuffix($triggers, newState, defaultTriggerClass);
        addSuffix($targets, newState, defaultTargetClass);
    }

    function hideAll(){
        var $triggers = $(triggerSel);
        var $targets = $(targetSel);

        removeSuffix($triggers, openClassSuffix);
        removeSuffix($targets, openClassSuffix);

        addSuffix($triggers, enabledClassSuffix, defaultTriggerClass);
        addSuffix($targets, enabledClassSuffix, defaultTargetClass);
    }

    $(function() {
        addSuffix($root.find(triggerSel), options.enabledClassSuffix, defaultTriggerClass);
        addSuffix($root.find(targetSel), options.enabledClassSuffix, defaultTargetClass);

        $root.on('click', triggerSel, function(e) {
            e.preventDefault();
            toggleState(this);
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest(targetSel).length) {
                hideAll();
            }
        });

    });

}

/**
 * Ensure exported method is called only once DOM is ready
 */
module.exports = function(options) {
    console.log('ff_module-dropdownbutton file is included');
    activateDropdowns(options);
};
