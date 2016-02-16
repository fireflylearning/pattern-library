'use strict';

var validationFactory = require('../../_lib/ff_form-validation/_ff-form-validation.js');

var $ = require('jquery');
module.exports = function() {
    $(function() {

        $('[data-ff-validation-error-input-id]').on('click',function(e) {
            var target = e.currentTarget;
            $(target).toggleClass('ff_container-form-line--has-error');
            validationFactory('test this please');
            
        });

    });
};

// ffBlocks.ffFormLineErrors();
