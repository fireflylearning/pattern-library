---
requires: 
    - ff_module-dropdown-button
---
<div data-ff_module-dropdown-filters=""/>


# Props

- **`text`**: {String} Required
- **`onAddFilter`**: { Func(`filterId`:{String}, `event`:{Event}) } Required
- **`onRemoveFilter`**: { Func(`filterId`:{String}, `event`:{Event}) } Required
- **`filters`**: {Array} Required
    
    Filters expects an array of filter objects with the following props:

    - **`name`**: {String} Required
    - **`id`**: {String} Required
    - **`isActive`**: {Bool}  
- **`isOpen`**: {Bool}
- **`isDisabled`**: {Bool}
- **`isRadioGrp`**: {Bool}