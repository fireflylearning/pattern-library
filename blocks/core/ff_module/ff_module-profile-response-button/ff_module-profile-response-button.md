<div data-ff_module-profile-response-button=""/>

# Profile response button

## Markup 
```
<div data-ff_module-profile-response-button=""/>
```
### Props

- `onSelect`: Function
- `uiState`: String; css defined for `is-selected`, `is-updated` (default), `is-reviewed` in Melody
- `guid`: String; unique id
- `label`: String; Name of Recipient
- `status`: String; Response Status
- `mark`: String; Grade or Percentage
- `pic_href`: String; Link to image href

#### Eg:
```
{
    onSelect: function(e) {
        console.log("onSelect");
    },
    uiState: "is-selected",
    guid: "u42",
    label: "Sally Student",
    status: "Resubmission Requested",
    mark: "B, 76%",
    pic_href: "/images/default_picture.png"
}
```
