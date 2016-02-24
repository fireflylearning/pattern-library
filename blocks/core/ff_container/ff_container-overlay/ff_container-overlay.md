---
data:
  modifier: ""
  body:
    - "<span class=\"crate_util-block\">The body of the page</span>"
  bar:
    - "<span class=\"crate_util-block\">The control bar for the page</span>"
---

## ff_container-overlay

A layout container to allow you to fix one or more items to the side of the browser window and have the body clear the fixed item.

## Modifiers

- **fixed-bottom**: positions fixed bottom fullwidth on page
- **fixed-top**: positions fixed bottom fullwidth on page
- **absolute-bottom**: positions absolutely, bottom fullwidth, location dependent on closest parent with layout
- **absolute-top**: positions absolutely, bottom fullwidth, location dependent on closest parent with layout

## XML Schema

```
<overlay modifier="{{ modifier }}">
  <body>
    <item>[node-set]</item>
    <item>[node-set]</item>
  </body>
  <bar>
    <item>[node-set]</item>
  </bar>
</overlay>
```
