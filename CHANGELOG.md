
# 0.2.2 (16/02/2016)

## Breaking changes
- blocks/core/_shared/index.js and all references removed
- All modules now automatically include their required js files, which are looked for in the following order of preference:
    - `_[block-name]-renderer.js`
    - `[block-name].js`

## Features
- New swig filters added to `augmentedSwig.js` to support the above changes: 
    - `jsEntry` (the name of the entry file, to access properties on `ffBlocks`) 
    - `jsUrlPath` (the path to the entry file relative to `wwwroot`)

# 0.2.1 (15/02/2016)

## Breaking changes
- ff_module-profile-response-button 
    - `isSelected` prop renamed to `uiState`, with three defined css values: `is-selected`, `is-reviewed`, `is-updated` (default)
    - `status` prop added
    - `mark` prop added
