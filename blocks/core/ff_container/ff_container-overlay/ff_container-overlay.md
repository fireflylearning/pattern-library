---
data:
  modifier: ""
  body:
    - "<span class=\"crate_util-block\">The body of the page</span>"
  bar:
    - "<span class=\"crate_util-block\">The overlay bar for the page</span>"
---
## React Component 
<div data-ff_container-overlay="" ></div>

## ff_container-overlay

A layout container to allow you to fix one or more items to the side of the browser window and have the body clear the fixed item.

## Please note:

It is necessary to call **ALL** of your page contents within the `<body></body>` node. Otherwise objects could appear _underneath_ the fixed or absolute `<bar></bar>` items. This is bad.

**Also**

By default, the `absolute-*` modifiers don't apply any rules to the root container. This allows you to determine what the absolute parent should be and specify the required rules on that element (Usually, `position:relative` and `overflow:auto|hidden`). 

## Modifiers

- **fixed-bottom**: positions fixed bottom fullwidth on page
- **fixed-top**: positions fixed top fullwidth on page
- **absolute-bottom**: positions absolutely, bar on the bottom, relative location and dimensions dependent on closest parent with layout
- **absolute-top**: positions absolutely, bar on the top, relative location and dimensions dependent on closest parent with layout
- **absolute-contained-top**: positions absolutely, bar on the top, all relative to root container.
- **absolute-contained-bottom**: positions absolutely, bar on the bottom, all relative to root container.

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
