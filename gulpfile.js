/**
 * Jekyll Assets
 * 
 * This is the main configuration file for the asset pipeline.
 * It configures all Gulp tasks and processes images, JavaScript
 * and SASS files into production-ready code.
 * 
 * Copyright (c) 2018 Andreas Remdt
 * Licensed under ISC
 */

'use strict';

// Load packages and dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const webp = require('gulp-webp');
const image = require('gulp-image');
const path = require('path');
const del = require('del');

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
    path.join(__dirname, config.images.outputDir)
  ]);
});



gulp.task('default', ['sass', 'webp', 'images']);