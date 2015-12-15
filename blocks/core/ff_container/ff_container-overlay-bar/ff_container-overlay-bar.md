---
data:
  modifier: ""
  content: 
        name: control-bar
        modifiers: "ff_container-control-bar--split"
        sets:
            -
              title: "Section Heading"
              modules:
                - "Module A"
            -
              modules:
                - "Module B"
                - "Module C"
requires: 
    - ff_container-control-bar
---

## Modifiers

- **fixed**: positions fixed on page
- **absolute**: positions absolutely, location dependent on closest parent with layout

## Usage
```
<div class="ff_container-overlay-bar ff_container-overlay-bar--*modifier*">
    <div class="ff_container-overlay-bar__content">
        <!-- content, for instance: -->
        <div class="ff_container-control-bar ff_container-control-bar--split">
            <div class="ff_container-control-bar__group" mode="ff_container-control-bar">
                <h3 class="ff_util-prose__section-heading">Section Heading</h3><span class="crate_util-block">Module A</span></div>
            <div class="ff_container-control-bar__group" mode="ff_container-control-bar"><span class="crate_util-block">Module B</span><span class="crate_util-block">Module C</span></div>
        </div>
        <!-- / content -->
    </div>
</div>
```
