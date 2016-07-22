---
data:
    items: 
      -
        content: "<label for=\"id01\">Input label</label>"
      -              
        modifier: fullwidth
        dataAnchor: my-data-anchor-value
        content: "<input id=\"id01\" type=\"text\" value=\"Input fullwidth\"/>"
---

## React component

<div data-ff_container-form-line="" ></div>

## Modifiers

### Label (or first item)

- `stacked` (applies 100% width to force following items onto newline)

### Inputs (or remaining items)

- `constrained` (sets max-width of `@ff_size_spacing_min * 20`)
- `fullwidth` (takes up remaining space, will take into account trailing buttons, etc)
- `mini` (set max-width of `@ff_size_spacing_min * 5.5`)

## Usage
### As HTML
```
<div class="ff_container-form-line">
    <label class="ff_container-form-line__item" for="input01">label</label>
    <input type="text" class="ff_container-form-line__item ff_container-form-line__item--fullwidth"/>
    <button class="ff_module-button ff_container-form-line__item">Date</button>
</div>
```

### In XSL
```
<xsl:call-template name="ff_container-form-line">
    <xsl:with-param name="data" select="msxsl:node-set($child-nodes)"/>
</xsl:call-template>
```

Where `$child-nodes` is a variable contianing calls to other patterns.
