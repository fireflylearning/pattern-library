'use strict';
var $ = require('jquery');

module.exports = function(controlFactory) {
    console.log('ff_module-inline-help file is included');
    $(function() {

        var helpControl = controlFactory.getControl();

        $('[data-ff-control="help"]').on('click', function(event) {
            console.log('[data-ff-control="help"] clicked');

            event.preventDefault();
            var $root = $(this),
                targetSel = $root.data('ff-help-target'),
                target = helpControl.getTarget(targetSel);

            if (target) {
                helpControl.openHelp(target);
            }

        });
    });
};
