# 0.2.5 (18/04/2016)

## Updates
- Added [grunticon customselector](https://github.com/filamentgroup/grunticon#optionscustomselectors) support for generating icon classes based on state/modifier rather than just color.
- Added per-theme icon color config support.
- Added eslintrc file and task in preparation for adding linting step before test command.

# 0.2.4 (31/03/2016)

## Breaking changes
Swapped the deprecated `minify-css` package for `clean-css`. Run `npm-install` to update package references.

# 0.2.3 (9/03/2016)

## Breaking changes
- JSX support added; webpack version downgraded from the beta-2 branch to support this. As a result, **it is necessary to remove and re-install node_modules directory.**


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
