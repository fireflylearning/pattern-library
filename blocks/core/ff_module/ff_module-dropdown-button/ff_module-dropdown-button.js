'use strict';

var $ = require('jquery');
var core = require('../../_lib/ff-core/_ff-core.js');
var _ = require('lodash');

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


        var $triggers = $root.find(triggerSels).addBack(triggerSels),
            $targets = $root.find(targetSels).addBack(targetSels);

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
        addSuffix($root.find(triggerSel).addBack(triggerSel), options.enabledClassSuffix, defaultTriggerClass);
        addSuffix($root.find(targetSel).addBack(targetSel), options.enabledClassSuffix, defaultTargetClass);

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

var activated = [];
/**
 * Ensure exported method is called only once DOM is ready
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

module.exports = function(options) {
    options = $.extend({}, _options, options);

    var isActivatedForTheseOptions = _.some(activated, function(optionSet){
        return _.isEqual(optionSet, options);
    });

    if(!isActivatedForTheseOptions) {
        if (isBrowser()) console.log('ff_module-dropdown-button is being activated with options: \n',options);
        activateDropdowns(options);
        activated.push(options);
    } else {
        if (isBrowser()) console.log('ff_module-dropdown-button has already been activated with options: \n',options);
    }
};
