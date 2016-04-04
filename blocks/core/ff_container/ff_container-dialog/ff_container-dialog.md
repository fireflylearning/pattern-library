## Props
- showTopClose
- headingText

## Structure

### With no top close 
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading">Heading text</h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        [<button/>,(<button/>)]
    </div>
</div>
```

### With top close 
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading">Heading text <span class="ff_container-dialog__close-top">Close</span></h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        <button/>
    </div>
</div>
```

## Raw Test

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading">Heading text <span class="ff_container-dialog__close-top">Close</span></h3>
    <div class="ff_container-dialog__body">
        `<form-line, etc.../>`
    </div>
    <div class="ff_container-dialog__controls">
        `<button/>`
    </div>
</div>
