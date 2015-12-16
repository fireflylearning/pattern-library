'use strict';
var $ = require('jquery');

module.exports = function(controlFactory) {
    console.log('ff_module-inline-edit file is included');
    $(function() {

        var editControl = controlFactory.getControl();

        $('[data-ff-control="edit"]').on('click', function(event) {
            console.log('[data-ff-control="edit"] clicked');

            event.preventDefault();
            var $root = $(this),
                targetSel = $root.data('ff-edit-target'),
                target = $(targetSel).get(0);

            if (target) {
                editControl.startEdit(target);
            }

        });
    });
};
