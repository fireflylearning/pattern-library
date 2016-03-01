## React Button Component
<div data-ff_module-dropdown-button-component=""></div>

See [ff-module-dropdown-button](/blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button.html) for details on dropdown styling and mofiers.

This component just renders an html dropdown button, it doesn't include the dropdown functionality which already exists in the core dropdown file 'ff_module-dropdown.js'.

# Props 
- **text**: {String, required} The text rendered by the button
- **id**: {String, required} The -target and -trigger id used by the core dropdown js file.
- **modifier**: {String}: Add additional css styling for different effects.
- **list**: {Array, required} An Array of Objects with { text: {String}, href: {String} } properties
- **isDisabled**: {Boolean} Whether or not the dropdown can be clicked.
- **isOpen**: {Boolean} If true, the list will be rendered in the open state.


**Ensure the core dropdown file is included on a page, and activated on DOM ready or equivalent, to activate js functionality.**
