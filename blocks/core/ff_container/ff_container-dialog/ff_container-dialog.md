<div data-ff_container-dialog=""></div>

## Props
- showCloseIcon: {Boolean}
- title: {String}, required
- body: {Node}, required
- controls: {Node}, required

## Structure

### With no top close 
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__title">Title text</h3>
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
    <h3 class="ff_container-dialog__title">Title text <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        <button/>
    </div>
</div>
```

## Raw Tests

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__title">Title text</h3>
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
    <h3 class="ff_container-dialog__title">Title text <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
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

