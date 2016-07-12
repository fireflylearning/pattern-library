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

## Options

- modifier (String)
- type (String)(radio, checkbox, text, select)
- checked (Bool)
- disabled (Bool)
- maxlength (Number)

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
