'use strict';

var $ = require('jquery');

module.exports = function() {
    $(function() {
        console.log('[ff_module-tabs] activating');
        $('[data-ff-tabs]').tabs();
    });
};
