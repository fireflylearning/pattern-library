---
data:
    id: "input-id"
    value: "Form input"
    name: "input-name"
    data:
        -
            attr: data-ff-attr
            value: true
---

## Options

- modifier (String)
- type (String)(radio, checkbox, text, select)
- checked (Bool)
- disabled (Bool)

Data-attributes are set by attr:value pairs, eg
```
    id: "input-id"
    value: "Form input"
    name: "input-name"
    data:
        -
            attr: data-ff-attr
            value: true
```

Default type is text.
