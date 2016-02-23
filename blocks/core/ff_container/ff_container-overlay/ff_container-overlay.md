---
data:
  modifier: "fixed"
  body:
    - "<span class=\"crate_util-block\">The body of the page</span>"
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

## About

A layout container for use with `ff_container-control-bar`. On the occasion when you wish to fix a control bar to the edge of the browser window, extra padding is needed for whatever else is shown on screen, lest you run the risk of things disappearing under the control-bar and becoming hidden.

## Modifiers

- **fixed-bottom**: positions fixed bottom fullwidth on page
- **absolute**: positions absolutely, bottom fullwidth, location dependent on closest parent with layout

## XML Schema

```
<overlay-bar modifier="{{ modifier }}">
  <body>
    <item>
      [node-set(s)]
    </item>
  </body>
  [ff_container-control-bar node-set]
</overlay-bar>
```
