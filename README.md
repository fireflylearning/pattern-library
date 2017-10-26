# Firefly Pattern Library

## Contents

- [Overview](#overview)
- [API](#api)
- [Installation and Build](#installation-and-build)
- [Dependencies](#dependencies)
- [Technologies used](#technologies-used)
- [Testing](#testing)
- [Structure](#structure)
    + [Blocks](#blocks)
        * [Styles](#styles)
        * [Templates](#templates)
        * [XSLT](#xslt)
        * [Scripts](#scripts)
        * [React](#react)
    + [Pages](#pages)
- [SVG Icons](#svg-icons)
    + [Adding new icons](#adding-new-icons)
    + [Using the icons](#using-the-icons)
- [Icons](#icons)
    + [Adding new colours](#adding-new-colours)
    + [Generating icon svg files](#generating-icon-svg-files)
- [Task Processes](#task-processes)
    + [Task Source](#task-source)
- [Common Issues](#common-issues)


## Overview

This repo contains the source files for Firefly front-end development patterns.

The primary goal of this pattern library is to enable us to build and test solid html, css, and js/React components.

It provides us with a separate environment to build and test patterns and their respective css in **isolated units**, with data we have control over so that we can test multiple variations of patterns, their groupings, and how they react to varying things (e.g. differing text lengths, languages, etc). Having each block isolated encourages separation of responsiblities (e.g. containers vs modules) and a modular approach.

### API
Contains common gulp commands, and their yarn alternatives if you don't have `gulp` installed globally.

- `gulp`

    alias `yarn start`

    builds, serves and watches for changes


- `gulp clean`

    alias `yarn run clean`

    cleans the temporary and output directories.

    `gulp clean:cache`: also removes everything in `/.icons`

- `gulp export`

    alias `yarn run export`

    - build and exports the xsl and css files to `export` directory.
    - export js modules to `export-js`.
    - The locations can be overriden in `config/options.local.js`.
    - Alternatively, paths can be set via command-line: `--export-path` and `--export-js-path`; eg: `gulp export --export-path www/files --export-js-path www/files/js`

- `gulp build`

    alias `yarn run build`

    build all resources without serving files.

- `gulp icons`

    alias `yarn run icons`

    builds and exports the icons. Is a separate command due to the intensive nature of the operation.

## Installation and build
Ensure all dependencies are met, then:

Run the command `yarn start` to automatically install, build, serve, and watch development files.

After initial install, the command `gulp` will perform the build, serve, and watching operations.


## Dependencies
- **Node** (Version **4.4.x** or greater required)
- **yarn** (Version **0.20.3** or greater required. Use latest version to ensure correct dependency resolution)

    A number of packages use node-gyp for running cross-platform code that requires binary compilation. See [the Readme for node-gyp](https://github.com/nodejs/node-gyp) for more info on enviroment support and dependencies. For a summary:

    - On Mac: Xcode Command Line Tools
    - On Windows: See [Common Issues](#common-issues) below for common requirements and errors that occur with the node-gyp library on Windows



## Technologies used
- Swig for template compilation
- BrowserSync for hot-reloading and syncing
- Webpack for bundling javascript modules
- Less with gulp-less for less > css transpiling
- Babel for jsx transpiling `.jsx` templates files and `<tag/>` syntax to `.js`
- gulp-jshint for js linting
- css-lint for css linting
- Karma, Mocha, Chai and Sinon for testing
- x for regression testing // TODO (1)

## Testing
Any files within the directory `/tests` and with the suffix `*.test.js` will be run through the test runner when the command `yarn test` is run.

## Structure

### Blocks
The file structure is based on the BEM (Block Element Modifier) convention.
The `/blocks` directory contains all the patterns(blocks) used within the site, each within their own folder. Inside this folder live all the files relevant to that pattern, such as .html/.xslt/.xml, .less, .js, and any metadata.

    +-- blocks/    
        +-- pattern_name/
            +-- pattern_name.html
            +-- pattern_name.js
            +-- pattern_name.less

#### Styles
In this setup the styles are written in Less, though any css pre-processor could be used.

#### Templates
The templating language here is [Swig](http://paularmstrong.github.io/swig/); each block is written as an xsl file fragment and uses a `.xsl` extension. Areas of variable content are marked by `{{` and `}}` tags and control tags are marked by `{%` and `%}`. See the above link for more documentation.

#### XSLT
##### Conventions

Every component should have the following:

- Modifier names: A single train-case `modifier` attribute to allow css class modifiers to be added
- External class names: A train-case `classnames` attribute to allow specifying another component's ownership of the current component.

#### Scripts
Here the scripts are in plain javascript; ideally the component script styles are written in a module format (such as CommonJS) with all dependencies clearly defined and a single export source.

Typically, the core functionality -- whatever will be used directly by Firefly -- is created in a file that matches the directory/module name, eg. `ff_module.js`.

Any script prefixed with an underscore, eg. `_ff_module-*.js` won't be `export`ed.

If the core file requires other services or controls, we can mock them with an underscore prefixed file (`_ff_module-control.js`) to use within the library, and then call each file within a renderer file (`_ff_module-renderer.js`) file that combines required sources, without needlessly being exported to Firefly.

Some modules use React; see below for more information.

#### React

##### Presentation only Components

React Components included in the pattern library should be purely presentational. This is similar to thinking of them as being read-only. This will mean that in most cases React versions of patterns will have no state, they will be entirely driven by props given to them.

The most direct observation of this principal is that without a wrapping Container Component, inputs like text boxes should appear to be non-interactive. Going so far that if typed into they will refuse to update (or more accurately, immediately be redrawn with their pre-typed content). Changes in input values should fire events rather than modifying the DOM directly as they would in traditional usage. For an example of this, see `ff_module-form-input`.

##### JSX

JSX syntax is available, and should be used whenever practical to replace calls to React.createElement() due to the transparency of the DOM structure it offers.

##### Separate Template Files

If a component involves rendering decisions or complex dynamic aspects, you may separate things into template files where it makes sense to do so, and do include the flat HTML in the .md file.

In most cases these templates should naturally grow from raw HTML files used to plan the pattern.

**JSX Files**

Moving dom rendering into a `.jsx` file is a convenient way to separate DOM structure from pattern set up. Id's, classes and data attributes being set on DOM elements should be as clear as is practical to be (try not to hide attribute values inside props if it can be avoided in the pattern usage).

##### Notes about the renderer files
For testing purposes there are special renderer files e.g. `_ff_module-renderer.js` that only exist for testing; they are not exported.

To summarise briefly, the renderer file looks for a stub element, that is declared in the associated markdown file e.g. `<div data-ff_module-buttons=""></div>`, and the React.DOM method renders the component into that. There is a small limitation, in that the test page renders the React component in a reduced width container, so that the view is less than optimal.

Some recent changes have been made to improve the display of React components, in other words, enable them to render in a full width container. The process to do this is somewhat simplified: you no longer have to create the stub in the `.md` file. All that is required is to supply `data-ff-crate-block-react-item` as a selector to `document.querySelectorAll()` method. There is also a helper function `createHeading()` to insert the 'React Component' heading.

See `_ff_module-task-render.js` for an example.

### Pages
A collection of layout files located in `/pages` for presenting these patterns in a variety of ways and with a variety of content. For instance, the developer can view the pattern in the context of all other patterns for comparison purposes; in isolation for development and testing; with a variety of text in different lengths and languages.

## SVG Icons
> Added December 2016

SVG Icons are compiled into one `sprites.svg` file using [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite). This is done as part of the `gulp` build process, **there is no need to run a separate process to generate icons**. It's also performed when running `gulp export`, all icons are packaged in the file `/Templates/lib/core/patterns/icons/sprites.svg`.

It is assumed that all icons are available for each theme. Different themes cannot have different versions of the same icon. If this is required, this build process will need some refactoring.

### Adding new icons
Simply drop new icons into the `/icons` folder. The build process will minify and strip away any random tags that are output when exporting from your favorite image-editing software.

### Using the icons
The pattern `ff_icon-svg` is available in both `XSLT` and `React` versions, and can be called by other patterns, or directly. See the documentation in the pattern folder for more information.

See [this excellent post](https://fvsch.com/code/svg-icons/how-to/) for more information on using SVG icons inline.


## Icons

> **This method of creating icons has been retired in favor of creating SVG sprites (see [SVG Icons](#svg-icons) above.)**

Icons are built using [gulp/(grunt)icon](http://www.grunticon.com/) . See [the grunticon docs for full details](https://github.com/filamentgroup/grunticon) of options and methodology.

The `icons` task should (currently) be run separately, and will need to be run after each clean. To optimise the `.svg` icons and build the CSS for each of those icons run:

`gulp icons`

### Adding new colours
SVG files are stored in `blocks/[theme]/_icons/original_svgs`. To add another colour to an existing icon files, add a suffix to the file: `filename`**`.colors-[colorname].svg`** where **colorname** is either a hex value or a name defined in `config/icons.js`. Then run the `gulp icons` command to build and output the new svg & fallback files.

### Generating icon svg files
To export icons images to `.svg` format in an optimal way use this script: [svg_exporter](https://github.com/fireflylearning/pattern-library/wiki/svg_exporter)

Save the script as a `.jsx` file. The script is executed in Adobe Illustrator and strips away all the extra code that the default Illustrator export adds to the file.

To run the script:

1. Open Illustrator
2. Select File > Scripts > Other Scripts
3. Select your script
4. Select the folder which contains the files that you want to export as `.svg`
5. Enter the extension of the files that you want to export (e.g. *.ai)
6. Select a folder where you want to save the generated svgs

## Task Processes
The gulp task will run and traverse the `/blocks` and `/pages` directories, performing the following tasks:

- A web server is started to host and serve all files, enabling accurate representations of cross domain security and file paths, and allowing us to test various load cases with throttling tools.
- Templates are combined with default metadata to create HTML pages to display the patterns for development and testing.
- Images and svgs are optimised and output.
- SVG icons are processed, and icon css stylesheets are be built with all required classnames and colour variations.
- Style files will be:
    - compiled,
    - auto-prefixed,
    - concatenated, with vendor sources where required,
    - minified,
    - and output to (a) pre-defined destination(s) if desired.
- Javascript files will be:
    - unit-tested,
    - compiled (where necessary, if using module format or ES6),
    - linted,
    - concatenated, with vendor sources where required,
    - minified,
    - and output to (a) pre-defined destination(s) if desired.
- A headless browser session will be started, in order to:
    - perform accessibility testing,
    - test colour contrast ratio,
    - perform regression tests,
    - and perform end-to-end tests.
- Any additional assets such as pre-existing source files are copied to the build folder.

### Task Source

Source files for the various gulp tasks are located in `/src`. In general, these are just wrappers for standard gulp tasks that isolate common config settings from polluting the gulpfile itself. They live in `/src/gulp-tasks`.

The core task is the gulp 'info' task, which traverses the blocks directory, building up file system information in order to create a representation of each 'block'. Currently, a block is defined as the collection of files within a directory that contains a .md folder, and any files inside directories below that, that that aren't themselves blocks.

Once a block is defined, its default data is added, so that it can be rendered with or without separate data contexts.

Then, once a block is defined, it can be rendered in whatever circumstance is needed, depending on the context. For instance, within the xslt templates, a swig rendering pass outputs required `js` entry point information so that the block js can be included on its preview page.

#### Task Templates
As each block only contains the information relevant to itself, in order to render each item on a page, a number of templates are required to 'wrap' the content. These live at `/src/templates`. Each template is first run through the swig template engine so that different data can be passed to a block in different contexts. Finally, the generated xsl and xml are passed to the gulp xslt task, which is a proper gulp plugin living at `src/gulp-plugins` and which renders the final html output.

## Common Issues

- ### Node-gyp rebuild errors:

    ```
    > node-gyp rebuild

    SOLINK_MODULE(target) Release/.node
    ld: library not found for -lgcc_s.10.5
    clang: error: linker command failed with exit code 1 (use -v to see invocation)
    make: *** [Release/.node] Error 1
    gyp ERR! build error
    ```

    **Resolution:** Usually there is an issue with resolving paths to required `C/C++` libraries. See [this stackoverflow page for an example of the error and solution](http://stackoverflow.com/questions/31936170/npm-the-ld-library-not-found-for-lgcc-s-10-5-on-on-os-x-el-capitain)

    ### On Windows :(

    #### Summary of common fixes:

    Note: *Either* installing the Windows 8.1 SDK *and* the C++ Build tools, *or* installing Visual Studio with just the C++ language options should theoretically work, but the greatest success rate has been with installing the dependencies via Visual Studio.

    Using the Add/Remove Program setting in Control Panel will show you which of the Microsoft dependencies, if any, you have available. The dependencies should all be compatible with each other.

    1. Check that **python** is in your path by writting `python -v` in the console. If not:
        - Download and install python *2.7*
        - Make sure to choose the option to add python to your `PATH`
    - Ensure you have a **`.NET Framework SDK`** installed (4.5, 4.5.1, and 4.6 seem to work). If not:
        - It can be installed as an option in Visual Studio (currently, Community 2015) *or*
        - It can be installed as part of the [`Microsoft Visual C++ Build Tools`](http://landinghub.visualstudio.com/visual-cpp-build-tools) installation under the **Custom/Advanced** option *or*        
        - If you get an error requesting a specific version, you can [install individual versions from this page](https://msdn.microsoft.com/en-us/library/w0x726c2(v=vs.110).aspx)
    - Ensure you have a version of a **`Microsoft Visual C++`** compiler installed; if not,         
        - It can be installed as part of Visual Studio (currently, Community 2015) under **Custom/Advanced** options *or*
        - Download [`Microsoft Visual C++ Build Tools`](http://landinghub.visualstudio.com/visual-cpp-build-tools) and select **Custom Download** to add this option
    - Ensure you have **`Windows 8.1 SDK`** installed, if not, it can installed as part of Visual Studio or Visual C++ Build tools, as above.
    - You may need to run the following command to repair damaged references: run `set VCTargetsPath="C:\Program Files (x86)\MSBuild\Microsoft.Cpp\v4.0\V140"` where V140 can be V110/V120, etc, depending on the version of


    #### Error Examples:

    ```
    CL.exe could not be found
    ```

    C++ libraries/compiler not installed, see 3.

    ```
    The reference assemblies for framework ".NETFramework, Version=4.x" were not found
    ```

    .NET Framework SDK is missing, see 2.

    ```
    error MSB4019: The imported project "C:\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
    ```

    Either install Visual Studio, if the `C:\Program Files (x86)\MSBuild\Microsoft.Cpp\` folder doen't exist, or use the VCTargetsPath command to point to the correct directory if it does.

    **Some common errors and solutions can be found on these pages:**

    + [Using Visual C++ Build Tools 2015 – standalone C++ tools](https://github.com/nodejs/node-gyp/issues/802)
    + [Windows users are not happy](https://github.com/nodejs/node-gyp/issues/629)
    + [Node packages not building on Windows 8.1 - Missing Microsoft.Cpp.Default.props](http://stackoverflow.com/questions/21069699/node-packages-not-building-on-windows-8-1-missing-microsoft-cpp-default-props)



- ### Babel dependency/Cannot resolve module errors:

    ```
    ERROR in ./blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/_src/templates/list.jsx
    Module not found: Error: Cannot resolve module 'babel-runtime/helpers/possibleConstructorReturn' in C:\Git-repos\pattern-library\blocks\core\ff_module\ff_module-dropdown-button\ff_module-dropdown-button-component\_src\templates
    ```

- ### Path errors
    Node-gyp is unable to correctly parse paths with spaces in them, so you may get errors relating to this.
    **Resolution** Ensure the repo is located at a path without spaces.

- ### Sharing VM folders
    Attempting to run the patternlib on both systems from a shared folder may cause issues as binaries are built on a per-system basis.
    **Resolution** Have distinct locations for each system version of webapp.
