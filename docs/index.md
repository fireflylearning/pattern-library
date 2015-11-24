# Front end build process

// TODO
### API 
gulp
    - builds, serves and watches for changes
gulp clean
    - cleans the temporary and output directories
gulp export 
    - build and exports the xsl and css files to `export` directory. The location can be overriden in `config/options.local.js`.

## Rationale

- For large, complex systems, front-end development requires many steps such as less to css processing, image and file minification, build output, unit- and end-to-end testing, etc. 
- Automated build processes allow the developer to meet those requirements quickly and perfectly each time without needing to manually perform each step of the operation.
- The build chain is complex and needs frequently change and evolve; as browsers change, so do the tools. As such, it is important for a front-end developer to have control over this build chain.
- Automation makes well considered conventions and standards easier to follow, develop and maintain, makes code change and reuse much easier. 
- Having a central, canonical version of a pattern ensures that unconsidered variations don't creep in, bloating the codebase, increasing complexity, and potentially introducing errors. 

## Setup

### Blocks
The file structure is based on the BEM (Block Element Modifier) convention.
A directory contains all the patterns(blocks) used within the site, each within their own folder. Inside this folder live all the files relevant to that pattern, such as .html/.xslt/.xml, .less, .js, and any metadata.

    +-- blocks/    
        +-- pattern_name/
            +-- pattern_name.html
            +-- pattern_name.js
            +-- pattern_name.less

#### Styles
In this setup the styles are written in Less, though any css pre-processor could be used.

#### Templates
The templating language here is Swig; each block is written primarily as an `xsl` file and uses a `.xsl` extension. Areas of variable content are marked by `{{` and `}}` tags as defined by the templating language used.

#### Scripts
Here the scripts are in plain javascript; ideally the component script styles are written in a module format (such as CommonJS) with all dependencies clearly defined and a single export source.


### Crate
A collection of layout files for presenting these patterns in a variety of ways and with a variety of content. For instance, the developer can view the pattern in the context of all other patterns for comparison purposes; in isolation for development and testing; with a variety of text in different lengths and languages.

## Process
The gulp task will run and traverse the directory, performing the following tasks:

- A web server is started to host and serve all files, enabling accurate representations of cross domain security and file paths, and allowing us to test various load cases with throttling tools.
- Templates are combined with metadata to create HTML pages to display the patterns for development and testing.
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
 



