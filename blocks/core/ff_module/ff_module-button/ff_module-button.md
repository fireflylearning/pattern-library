---
data:
    text: "default button"
    icon: calendar
page: 
    title: FF Module Button
---

## React component

<div data-ff_module-buttons="" ></div>

## Usage

Call `ff_module-button` and pass-in the following XML:

```
<button id="uid" modifier="primary" icon="calendar" classes="ff_module-example__item" disabled="true" hide_text="true">
    <text>Click Me!</text>
    <data attr="data-ff-attr">value</data>
</button>
```

## Examples 

See [the buttons test page](/tests/buttons.html) for all variations.

### Example `yml`

```
data:
    text: "default button"
    modifier: primary
    icon: calendar
    icon_align: right
    classes "ff_module-example__item"
    disabled: true
    hide_text: true
    data:
      -
        attr: ff-data-attr
        value: value
```

## Required nodes and attributes

* `<text>`

## Optional nodes and attributes

* `id`
* `modifier` (singular modifier)
* `classes` (external classes required from other modules)
* `icon`
* `<data attr=""/>`
* `disabled` (disable this button)
* `hide_text` (hide the button text, for icon only type buttons) 

## Modifiers

### Standard Styling:

* `primary`
* `primary-large`
* `primary-compact`
* `tertiary`
* `tertiary-large`
* `tertiary-compact`
* `large`
* `link`
* `compact`
* `danger`

### "Block" styling, buttons fill their container:

* `block`
* `primary-block`
* `large-block`
* `primary-large-block`
* `tertiary-block`
* `tertiary-large-block`
* `compact-block`
* `primary-compact-block`
* `tertiary-compact-block`
* `link-block`
* `danger-block`



## React component 
Supports the same values as the xsl, aside from arbitray attributes.
