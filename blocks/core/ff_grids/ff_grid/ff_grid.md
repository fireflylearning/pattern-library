---
data:
  modifiers: "2-1"
  columns:
    - 
      name: "column A"
    - 
      name: "column B"
---

## React component:
<div data-ff_grid=""/>

Usage: 

```
<Grid modifier="2-1">
	<ChildComponent {...props} />
	<ChildComponent {...props} />
</Grid>
```
**Note:** There shouldn't be more children than the modifier allows for, as it will currently render any number of children. Weird things will happen to the layout.

# Firefly's grid system

| Property | Description | Required? |
|:--|:--|:--|
| `modifier` | Current values: `1-1`, `2-1`, `1-2`| yes |
| `name` | Not really used except for labelling purposes in pattern library  | no |
| `classes` | A string of external classes you wish to attach to this pattern | no |
| `data` | an array of `{attr: 'data-whatever', value: 'whatever'}` objects | no |