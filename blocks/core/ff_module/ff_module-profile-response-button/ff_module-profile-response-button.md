<div data-ff_module-profile-response-button=""/>

# Profile response button

## Markup 
```
<div data-ff_module-profile-response-button=""/>
```
### Props

- `onSelect`: Function(): null
- `uiState`: String; css defined for `is-selected`, `is-updated` (default), `is-reviewed` in Melody
- `guid`: String; unique id
- `label`: String; Name of Recipient
- `status`: String; Response Status
- `markAndGrade`: Object; { mark: [Number], markMax: [Number], grade: [String]}
- `pic_href`: String; Link to image href

#### Eg:
```
{
    onSelect: function() {
        console.log("onSelect");
    },
    uiState: "is-selected",
    guid: "u42",
    label: "Sally Student",
    status: "Resubmission Requested",
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}
```
