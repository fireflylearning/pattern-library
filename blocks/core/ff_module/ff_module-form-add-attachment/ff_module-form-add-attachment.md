<div data-ff_module-form-add-attachment=""></div>

## Props

- **`fileSources`**: {Array} Required
    
    Expects an array of items following DropdownButton `list` conventions

- **`onFileDrop`**: {Function(event)} Required
- **`files`**: {Array}
    
    Expects an array of items following FileList conventions (To be built)

## HTML
```
<div>
    <div class="ff_module-form-add-attachment">
        <div class="ff_module-form-add-attachment__dnd">
            <span class="ff_icon ff_icon-download-to-greyblue ff_module-form-add-attachment__icon"></span>
            <span class="ff_module-form-add-attachment__dnd-text">Drag files here to attach them</span>
        </div>
        <div class="ff_module-form-add-attachment__buttons">
            <div class="ff_module-dropdown-button ff_module-dropdown-button--block" data-ff_module-dropdown-button-rt-target="dd-2">
                <button type="button" class="ff_module-dropdown-button__button ff_module-dropdown-button__button--block" data-ff_module-dropdown-button-rt-trigger="dd-2"><span class="ff_module-dropdown-button__content">Attach file</span><span class="ff_module-dropdown-button__icon ff_module-dropdown-button__icon--block" data-ff_module-dropdown-button-rt-target="dd-2"></span></button>
                <div class="ff_module-dropdown-button__list-container ff_module-dropdown-button__list-container--block" data-ff_module-dropdown-button-rt-target="dd-2">
                    <ul class="ff_module-dropdown-button__list">
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From computer" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From computer</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From existing file" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From existing file</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From Google Drive" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From Google Drive</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From OneDrive" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From OneDrive</span></button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="ff_module-form-add-attachment__filelist">
        <span class="ff_module-form-add-attachment__no-files-message">No files attached</span>
    </div>
</div>
```

## HTML Example

<div id="add-attachment-example">
    <div class="ff_module-form-add-attachment">
        <div class="ff_module-form-add-attachment__dnd">
            <span class="ff_icon ff_icon-download-to-greyblue ff_module-form-add-attachment__icon"></span>
            <span class="ff_module-form-add-attachment__dnd-text">Drag files here to attach them</span>
        </div>
        <div class="ff_module-form-add-attachment__buttons">
            <div class="ff_module-dropdown-button ff_module-dropdown-button--block" data-ff_module-dropdown-button-rt-target="dd-2">
                <button type="button" class="ff_module-dropdown-button__button ff_module-dropdown-button__button--block" data-ff_module-dropdown-button-rt-trigger="dd-2"><span class="ff_module-dropdown-button__content">Attach file</span><span class="ff_module-dropdown-button__icon ff_module-dropdown-button__icon--block" data-ff_module-dropdown-button-rt-target="dd-2"></span></button>
                <div class="ff_module-dropdown-button__list-container ff_module-dropdown-button__list-container--block" data-ff_module-dropdown-button-rt-target="dd-2">
                    <ul class="ff_module-dropdown-button__list">
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From computer" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From computer</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From existing file" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From existing file</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From Google Drive" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From Google Drive</span></button></li>
                        <li class="ff_module-dropdown-button__list-item">
                            <button type="button" title="From OneDrive" class="ff_module-button ff_module-button--link"><span class="ff_module-button__content">From OneDrive</span></button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="ff_module-form-add-attachment__filelist">
        <span class="ff_module-form-add-attachment__no-files-message">No files attached</span>
    </div>
</div>
