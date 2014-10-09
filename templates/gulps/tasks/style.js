'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var es = require('event-stream');
var sass = $.sass;
var sourcemaps = $.sourcemaps;
var autoprefixer = $.autoprefixer;
var rename = $.rename;
var concat = $.concat;
var minifycss = require('gulp-minify-css');
var constants = require('../common/constants')();
var gutil = $.util;

gulp.task('sass', function() {

    var sassFiles = gulp.src(constants.style.sass.src)
    //.pipe(sourcemaps.init())
    .pipe(sass())
    //.pipe(sourcemaps.write())
    .on('error', function(err) {
        new gutil.PluginError('sass', err, {
            showStack: true
        });
    });

    var cssFiles = gulp.src(constants.style.css.src)
    //.pipe(sourcemaps.init())
    //.pipe(concat('all.css'))
    //.pipe(sourcemaps.write())
    .on('error', function(err) {
        new gutil.PluginError('css', err, {
            showStack: true
        });
    });

    return es.concat(cssFiles, sassFiles)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat(constants.style.destName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(constants.style.dest))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe($.size())
        .pipe(gulp.dest(constants.style.dest));

});