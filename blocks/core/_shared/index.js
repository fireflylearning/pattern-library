'use strict';

require('../ff_module/ff_module-button/ff_module-button')();
require('../ff_module/ff_module-filter/ff_module-filter')();

var editFac = require('../ff_module/ff_module-inline-edit/stubControl.js');
require('../ff_module/ff_module-inline-edit/ff_module-inline-edit')(editFac);

var helpFac = require('../ff_module/ff_module-inline-help/stubControl.js');
require('../ff_module/ff_module-inline-help/ff_module-inline-help')(helpFac);

