/**
 * Jekyll Assets
 * 
 * This is the main configuration file for the asset pipeline.
 * It configures all Gulp tasks and processes images, JavaScript
 * and SASS files into production-ready code.
 * 
 * Copyright (c) 2018 Andreas Remdt
 * MIT License
 */

'use strict';

// Load packages and dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const util = require('gulp-util');
const babel = require('gulp-babel');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const del = require('del');
const child = require('child_process');
const browserSync = require('browser-sync').create();

// Load local config
const config = require('./config.json');



/**
 * Processes the CSS. If specified in the config, can:
 * 
 * a) Generate sourcemaps
 * b) Minify the output
 * c) Prefix newer CSS properties
 * d) Compile SASS / SCSS into CSS
 */
gulp.task('css', () => {
  return gulp
    .src(path.join(__dirname, config.sass.src, filename))
    .pipe(gulpif(config.sass.sourcemap, sourcemaps.init()))
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(gulpif(config.sass.prefix, autoprefixer({ browsers: config.sass.browsers })))
    .pipe(rename(config.sass.output.name))
    .pipe(gulpif(config.sass.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.jekyll.baseDir, config.sass.output.dir)));
});



/**
 * Processes the JavaScript. If specified in the config, can:
 * 
 * a) Generate sourcemaps
 * b) Compile ES2015 or higher into ES5
 * c) Concat many JS files into a single file
 * d) Minify the output
 */
gulp.task('js', () => {
  return gulp
    .src(path.join(__dirname, config.js.src, '**', '*.js'))
    .pipe(gulpif(config.js.sourcemap, sourcemaps.init()))
    .pipe(gulpif(config.js.babel, babel()))
    .pipe(gulpif(config.js.concat, concat(config.js.output.name)))
    .pipe(gulpif(config.js.minify, uglify()))
    .pipe(gulpif(config.js.minify, rename({ suffix: '.min' })))
    .pipe(gulpif(config.js.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.jekyll.baseDir, config.js.output.dir)));
});



/**
 * Compresses JPG and PNG images to save resources
 * and to speed up the page speed.
 */
gulp.task('images', () => {
  del([
    path.join(__dirname, config.jekyll.baseDir, config.images.output)
  ]);

  return gulp
    .src(path.join(__dirname, config.images.src, '**', '*.{png,gif,jpg,jpeg}'))
    .pipe(imagemin(config.images.options))
    .pipe(gulp.dest(path.join(__dirname, config.jekyll.baseDir, config.images.output)))
    .pipe(gulpif(config.images.webp, webp()))
    .pipe(gulpif(config.images.webp, gulp.dest(path.join(__dirname, config.jekyll.baseDir, config.images.output))));
});



/**
 * Deletes the generated files and folders and cleans
 * the assets.
 */
gulp.task('clean', () => {
  return del([
    path.join(__dirname, config.jekyll.baseDir, config.sass.output.dir),
    path.join(__dirname, config.jekyll.baseDir, config.images.output),
    path.join(__dirname, config.jekyll.baseDir, config.js.output.dir),
    path.join(__dirname, config.jekyll.baseDir, config.jekyll.deployDir)
  ]);
});



/**
 * Runs the Jekyll build command with given commands and logs
 * the output (whether error or info) to the console.
 */
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build'].concat(config.jekyll.args), { cwd: config.jekyll.baseDir });

  const logger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => util.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', logger);
  jekyll.stderr.on('data', logger);
});



/**
 * Runs the BrowserSync server to serve the site directory
 * (usually _site). Reloads automatically.
 */
gulp.task('serve', () => {
  browserSync.init({
    files: [path.join(__dirname, config.jekyll.baseDir, config.jekyll.deployDir, '**')],
    port: config.jekyll.port,
    server: {
      baseDir: config.jekyll.baseDir
    }
  });
});



gulp.task('watch', () => {
  gulp.watch(path.join(__dirname, config.images.src, '**', '*.{png,gif,jpg,jpeg}'), ['images']);
  gulp.watch(path.join(__dirname, config.sass.src, '**', '*.{scss,sass,css}'), ['css']);
  gulp.watch(path.join(__dirname, config.js.src, '**', '*.js'), ['js']);
});


gulp.task('build', ['css', 'js', 'images', 'jekyll']);
gulp.task('develop', ['build', 'serve', 'watch']);