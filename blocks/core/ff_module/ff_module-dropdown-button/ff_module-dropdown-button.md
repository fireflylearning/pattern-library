---
data:
    text: "Dropdown Button"
    id: btn-id-1
    classes: "ff_module-other-module__owner" 
    list: 
        - 
            attr: "item-a"
            text: "Item A"   
        - 
            href: "#"
            text: "Item B" 
        - 
            text: "Item C"
page: 
    title: FF Module Dropdown Button
requires: 
    - ff_module-button
---

## Examples
See [the variations page](/tests/dropdown-buttons.html) for examples.

## Modifiers

- **block**: Button will take up full width of page.
- **primary**: Button will take on standard primary button styling.
- **right**: Button's children will align right.
- **compact**: Compact style
- **widelist**: Instead of taking the width of the button, the list will take on a set wide width.

- **primary-right**: Button will take on standard primary button styling and children will align right.

- **primary-compact**: Combines compact and primary (above)
- **primary-compact-right**: Combines compact, primary, and right (above)
- **primary-compact-right-widelist**
- **compact-widelist**
- **compact-right-widelist**

## State

- **(default)**: Uncollapsed, content items are not hidden. 
- **--is-enabled**: Button is collapsed and can be clicked to expand list items
- **--is-open**: Button is expanded and can be click to collapse
- 
By default, the dropdown js only adds `--is-enabled` state to dropdown buttons with the correct attribute `data-ff-dropdown-trigger`. If an `id` attribute is set in the xml, the data attribute and its related target attributes will be set automatically in the xsl. 

In order to prevent adding handlers twice, the main method will check the options passed to it, and will only activate if the options don't match any that have already been activated.

If a list item has no href attribute, it will be rendered as a button. A data-attribute value of `data-ff_module-dropdown-button__link` can be set with the `attr` property.
