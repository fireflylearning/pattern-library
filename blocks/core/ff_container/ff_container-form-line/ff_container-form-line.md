---
data:
    items: 
      - 
        text: "Line label"  
      -              
        modifier: fullwidth
        text: "Line input"
---

## Modifiers

### Label (or first item)

- `stacked` (applies 100% width to force following items onto newline)

### Inputs (or remaining items)

- `constrained` (sets max-width of 200px)
- `fullwidth` (takes up remaining space, will take into account trailing buttons, etc)

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
Pass the `-form-line__item` class to the `-label` and `-input` modules with the attribute `classes`.
