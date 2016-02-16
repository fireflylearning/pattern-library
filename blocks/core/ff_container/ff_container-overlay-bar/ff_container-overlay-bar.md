---
data:
  modifier: ""
  body: "<span class=\"crate_util-block\">The body of the page</span>"
  content:
        name: control-bar
        modifier: "split"
        sets:
            -
              title: "Section Heading"
              modules:
                - "<span class=\"crate_util-block\">Module A</span>"
            -
              modules:
                - "<span class=\"crate_util-block\">Module B</span>"
                - "<span class=\"crate_util-block\">Module C</span>"
requires:
    - ff_container-control-bar
---

Default display value is `block`.

TODO: Options for top, bottom modifiers.

## Modifiers

- **fixed**: positions fixed bottom fullwidth on page
- **absolute**: positions absolutely, bottom fullwidth, location dependent on closest parent with layout

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
