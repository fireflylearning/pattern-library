'use strict';


require('../ff_module/ff_module-button/ff_module-button')();
require('../ff_module/ff_module-filter/ff_module-filter')();
require('../ff_module/ff_module-date-picker-jumpto/ff_module-date-picker-jumpto')();
require('../ff_module/ff_module-tabs-navigation/ff_module-tabs-navigation')();

require('../ff_module/ff_module-inline-help/_ff_module-inline-help-renderer')();


var helpFac = require('../ff_module/ff_module-inline-help/stubControl.js');
require('../ff_module/ff_module-inline-help/ff_module-inline-help')(helpFac);
