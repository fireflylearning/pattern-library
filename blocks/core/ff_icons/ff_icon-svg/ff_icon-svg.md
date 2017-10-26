---
data:
  name: 'page-down-open'
  base: '/icons/sprites.svg#ff_icon-'
  modifier: 'large'
  classes: 'external-class'
  data:
    -
      attr: 'attr-1'
      value: 'value-1'
---

## React Component
<div data-ff_icon-svg=""/>

This pattern will render out an inline svg icon, using the `<use>` tag. It can accept the following properties:

| Property | Description | Required? |
|:--|:--|:--|
| `name` | The name of the icon, excluding the `ff_icon-` prefix | yes |
| `base` | The base url to the sprites file. Use `/icons/sprites.svg#ff_icon-` in pattern library previews. Defaults to `/Templates/lib/core/patterns/icons/sprites.svg#ff_icon-` | no |
| `modifier` | A modifier string. Currently unused | no |
| `classes` | A string of external classes you wish to attach to this pattern | no |
| `data` | an array of `{attr: 'data-whatever', value: 'whatever'}` objects | no |
