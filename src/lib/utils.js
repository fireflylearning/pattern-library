'use strict';


var lazypipe = require('lazypipe');

module.exports = function(gulp, plugins, browserSync, config) {

    function getDebugPipe(isDebugging) {
        var debugPipe;
        if (isDebugging) {
            debugPipe = function(debugOpts) {
                return lazypipe()
                    .pipe(plugins.debug, debugOpts)
                    .pipe(plugins.size, debugOpts);
            };
        } else {
            debugPipe = function(debugOpts) {
                return lazypipe()
                    .pipe(plugins.util.noop);
            };
        }
        return debugPipe;
    }

    /** Unused due to cross-system unreliability */
    /*function getErrorPipe(isDebugging) {
        var errorHandler;

        if (isDebugging) {
            errorHandler = function(err) {
                plugins.util.beep();
                plugins.util.log(err);
            };
        } else {
            errorHandler = plugins.notify.onError({
                message: '<%= error.message %>',
                title: 'Error'
            });
        }

        return lazypipe()
            .pipe(plugins.plumber, {
                errorHandler: errorHandler
            });
    }*/

    function getSourceMapMethods(isProduction) {
        var sourcemaps = {
            start: lazypipe()
                .pipe(plugins.sourcemaps.init),
            end: lazypipe()
                .pipe(plugins.sourcemaps.write, './')
        };

        if (isProduction) {
            sourcemaps.start = sourcemaps.end = lazypipe()
                .pipe(plugins.util.noop);
        }
        return sourcemaps;
    }

    function changeEvent(name) {
        return function(evt) {
            plugins.util.log(name, 'file', '\'' + plugins.util.colors.cyan(evt.path) + '\'', 'was', plugins.util.colors.magenta(evt.type));
        };
    }

    function callbackAfterBuild(type) {
        return function(callback) {
            browserSync.reload(type);
            callback();
        }
    }

    // var fmPipe = lazypipe()
    //     .pipe(plugins.frontMatter, {
    //         property: 'data',
    //         remove: true
    //     });


    // var statsPipe = lazypipe()
    //     .pipe(plugins.tap, function(file) {
    //         console.log('%j', file);
    //     });

    return {
        debugPipe: getDebugPipe(config.isDebugging),
        sourcemaps: getSourceMapMethods(config.isProduction),
        changeEvent: changeEvent,
        callbackAfterBuild: callbackAfterBuild
    };
}
