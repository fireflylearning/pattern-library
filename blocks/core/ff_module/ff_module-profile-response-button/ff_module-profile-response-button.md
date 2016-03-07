<div data-ff_module-profile-response-button=""/>

# Profile response button

## Markup 
```
<div data-ff_module-profile-response-button=""/>
```
### Props

- `onSelect`: Function(): null
- `isSelected`: Boolean; Is the recipient currently selected?
- `isRead`: Boolean; Have the recipient's responses been read?
- `label`: String; Name of Recipient
- `event`: Object; { type: [String (corresponds to Event types)], sent: [Date ]}
- `markAndGrade`: Object; { mark: [Number], markMax: [Number], grade: [String]}
- `pic_href`: String; Link to image href

### CSS Modifiers 

Generated from state props.

- `is-selected`
- `is-read`


#### Eg:
```
{
    onSelect: function() {
        console.log("onSelect");
    },
    isSelected: false,
    isRead: true,
    label: "Sally Student",
    event: {
        type:"mark-and-grade",
        sent: new Date()
    },
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}
```
