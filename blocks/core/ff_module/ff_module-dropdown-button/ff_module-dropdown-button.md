---
data:
    text: "Dropdown Button"
    id: btn-id-1
    classes: "ff_module-other-module__owner" 
    list: 
        - 
            href: "#"
            text: "Item A"   
        - 
            href: "#"
            text: "Item B" 
        - 
            href: "#"
            text: "Item C"
page: 
    title: FF Module Dropdown Button
---

## Examples
See [the variations page](/tests/dropdown-buttons.html) for examples.

## Modifiers

- **block**: Button will take up full width of page
- **primary**: Button will take on standard primary button styling

## State

- **(default)**: Uncollapsed, content items are not hidden. 
- **--is-enabled**: Button is collapsed and can be clicked to expand list items
- **--is-open**: Button is expanded and can be click to collapse

By default, the dropdown js only adds `--is-enabled` state to dropdown buttons with the correct attribute `data-ff-dropdown-trigger`. If an `id` attribute is set in the xml, the data attribute and its related target attributes will be set automatically in the xsl. 
