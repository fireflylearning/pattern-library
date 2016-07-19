<div data-ff_container-dialog=""></div>

## Props
- **`title`**: {String}, required
- **`body`**: {Node}, required
- **`controls`**: {Node}, required
- **`showCloseIcon`**: {Boolean}
- **`onCloseIconClick`**: {Function}
- **`modifier`**: {String} - current options are `arrow`

## Structure

### With no top close 
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span></h3>
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
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        <button/>
    </div>
</div>
```

### With arrow modifier
```
<div class="ff_container-dialog ff_container-dialog--arrow">
    <h3 class="ff_container-dialog__heading ff_container-dialog--arrow"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body ff_container-dialog--arrow">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls ff_container-dialog--arrow">
        <button/>
    </div>
</div>
```

## Raw Examples

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span></h3>
    <div class="ff_container-dialog__body">
        <div class="ff_container-dialog__notification">
            <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
        </div>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
        <button type="button" title="Button tertiary" class="ff_module-button ff_module-button--tertiary">
            <span class="ff_module-button__content">Cancel</span>
        </button>
    </div>
</div>

<br/>

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <div class="ff_container-dialog__notification">
            <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
        </div>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>

<br/>

<div class="ff_container-dialog ff_container-dialog--arrow">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text - Dialog with arrow modifier</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <div class="ff_container-dialog__notification">
            <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
        </div>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>

