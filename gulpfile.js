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
const webp = require('gulp-webp');
const image = require('gulp-image');
const util = require('gulp-util');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const del = require('del');
const child = require('child_process');
const browserSync = require('browser-sync').create();

// Load local config
const config = require('./config.json');



/**
 * Compiles SASS into CSS using compression,
 * autoprefixr and other plugins.
 */
gulp.task('sass', () => {
  return gulp
    .src(path.join(__dirname, config.sass.inputDir, '**', '*.{scss,sass}'))
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(gulp.dest(path.join(__dirname, config.sass.outputDir)));
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
    .pipe(gulpif(config.js.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(config.js.babel, babel()))
    .pipe(gulpif(config.js.concat, concat(config.js.output.name)))
    .pipe(gulpif(config.js.minify, uglify()))
    .pipe(gulpif(config.js.sourcemaps, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.js.output.dir)));
});



/**
 * Converts JPG, PNG and GIF into the faster and
 * web-optimized WEBP format from Google.
 */
gulp.task('webp', () => {
  return gulp
    .src(path.join(__dirname, config.images.inputDir, '**', '*.{png,gif,jpg,jpeg}'))
    .pipe(webp(config.images.options.webp))
    .pipe(gulp.dest(path.join(__dirname, config.images.outputDir)));
});



/**
 * Compresses JPG and PNG images to save resources
 * and to speed up the page speed.
 */
gulp.task('images', () => {
  return gulp
    .src(path.join(__dirname, config.images.inputDir, '**', '*.{png,gif,jpg,jpeg}'))
    .pipe(image(config.images.options.others))
    .pipe(gulp.dest(path.join(__dirname, config.images.outputDir)));
});



/**
 * Deletes the generated files and folders and cleans
 * the assets.
 */
gulp.task('clean', () => {
  return del([
    path.join(__dirname, config.sass.outputDir),
    path.join(__dirname, config.images.outputDir),
    path.join(__dirname, config.js.output.dir),
    path.join(__dirname, config.jekyll.baseDir)
  ]);
});



/**
 * Runs the Jekyll build command with given commands and logs
 * the output (whether error or info) to the console.
 */
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build'].concat(config.jekyll.args));

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
    files: [`${config.jekyll.baseDir}/**`],
    port: config.jekyll.port,
    server: {
      baseDir: config.jekyll.baseDir
    }
  });
});

gulp.task('develop', ['jekyll', 'serve']);
gulp.task('default', ['sass', 'webp', 'images']);