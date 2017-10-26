---
data:
    id: "input-id"
    value: "Form input"
    name: "input-name"
    maxlength: 15
    data:
        -
            attr: data-ff-attr
            value: true
---

## React component

<div data-ff_module-form-input="" ></div>

## A note on React and autofocus.

As far as I can tell, React now doesn't support `autofocus`. See [this thread](https://github.com/facebook/react/issues/3066) for more information. 

## Options

- modifier (String)
- type (String)(radio, checkbox, text, select)
- checked (Bool)
- disabled (Bool)
- maxlength (Number)
- readonly (Bool)
- autofocus (Bool)

## Modifiers

- invisible


Data-attributes are set by attr:value pairs, eg
```
    id: "input-id"
    value: "Form input"
    name: "input-name"
    maxlength: 15
    data:
        -
            attr: data-ff-attr
            value: true
```

Default type is text.
