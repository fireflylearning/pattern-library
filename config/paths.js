var basePaths = {
    blocks: 'blocks/',
    dest: 'build/',
    crate: 'crate/',
    assets: 'assets/'
};

var paths = {
    temp: '.tmp/',
    crate: {
        base : basePaths.crate,
        content: {
            src: basePaths.crate + '**/*.md',
            dest: basePaths.dest
        },
        layout: {
            src: basePaths.crate + '**/*.html',
            dest: basePaths.dest
        },
        styles: {
            src: basePaths.crate + '**/*.less',
            dest: basePaths.dest + 'css/'
        }
    },
    blocks: {
        base: basePaths.blocks,
        layout: {
            src: basePaths.blocks + '**/*.html',
            dest: basePaths.dest
        },
        styles: {
            src: basePaths.blocks + '**/*.less',
            dest: basePaths.dest + 'css/'
        },
        scripts:{
            src: basePaths.blocks + '**/*.js',
            dest: basePaths.dest + 'js/'
        }
    },
    dest: {
        base: basePaths.dest,
        layout: basePaths.dest + '**/*.html',
        styles: basePaths.dest + '**/*.css',
    },

    images: {
        src: basePaths.blocks + '**/*.{jpg, jpeg, png, svg, gif}',
        dest: basePaths.dest + 'images/'
    },
    scripts: {
        src: basePaths.blocks + '**/*.js',
        dest: basePaths.dest + 'js/'
    },

    assets: {
        src: basePaths.assets + '**/*',
        dest: basePaths.dest
    }
};

module.exports = paths;
