---
data:
    text: "default button"
    url: "#"
page: 
    title: ff_module-link-button
---
## Usage
Call `ff_module-link-button` and pass-in the following XML:

```
<button id="uid" modifier="primary" icon="calendar" classes="ff_module-example__item" disabled="true" hide_text="true">
    <text>Click Me!</text>
    <data attr="data-ff-attr">value</data>
</button>
```

### Example `yml`

```
data:
    text: "default button"
    modifier: primary
    icon: calendar
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
* `<url>`

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

* `--primary`
* `--large`
* `--primary-large`
* `--tertiary`
* `--tertiary-large`

### "Block" styling, buttons fill their container:

* `--block`
* `--primary-block`
* `--large-block`
* `--primary-large-block`
* `--tertiary-block`
* `--tertiary-large-block`
