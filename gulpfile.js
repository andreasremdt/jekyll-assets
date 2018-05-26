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

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const imagemin      = require('gulp-imagemin');
const util          = require('gulp-util');
const babel         = require('gulp-babel');
const webp          = require('gulp-webp');
const concat        = require('gulp-concat');
const purgecss      = require('gulp-purgecss');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify-es').default;
const gulpif        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const path          = require('path');
const del           = require('del');
const child         = require('child_process');
const browserSync   = require('browser-sync').create();
const config        = require('./config.prod.js');



gulp.task('css', () => {
  return gulp
    .src(path.join(__dirname, config.css.input.path, config.css.input.filename))
    .pipe(gulpif(config.css.options.sourcemap, sourcemaps.init()))
    .pipe(sass({ outputStyle: config.css.options.compressed ? 'compressed' : 'nested' }).on('error', sass.logError))
    .pipe(gulpif(config.css.options.purge, purgecss({ content: ['**/*.html'] })))
    .pipe(gulpif(config.css.options.prefixed, autoprefixer({ browsers: config.css.options.browserSupport })))
    .pipe(rename(config.css.output.filename))
    .pipe(gulpif(config.css.options.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.css.output.path)));
});



gulp.task('js', () => {
  return gulp
    .src(path.join(__dirname, config.js.input.path, config.js.input.filename))
    .pipe(gulpif(config.js.options.sourcemap, sourcemaps.init()))
    .pipe(gulpif(config.js.options.babel, babel()))
    .pipe(gulpif(config.js.options.concat, concat(config.js.output.filename)))
    .pipe(gulpif(config.js.options.minify, uglify()))
    .pipe(gulpif(config.js.options.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.js.output.path)));
});



gulp.task('images', () => {
  del([
    path.join(__dirname, config.images.output.path)
  ]);

  return gulp
    .src(path.join(__dirname, config.images.input.path, config.images.input.filename))
    .pipe(gulpif(config.images.options.compress, imagemin(config.images.options.imagemin)))
    .pipe(gulp.dest(path.join(__dirname, config.images.output.path)))
    .pipe(gulpif(config.images.options.webp, webp()))
    .pipe(gulpif(config.images.options.webp, gulp.dest(path.join(__dirname, config.images.output.path))));
});



gulp.task('clean', () => {
  return del([
    path.join(__dirname, config.css.output.path),
    path.join(__dirname, config.images.output.path),
    path.join(__dirname, config.js.output.path),
    path.join(__dirname, config.jekyll.deployDir),
  ]);
});



gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build'].concat(config.jekyll.args), { cwd: './' });

  const logger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => util.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', logger);
  jekyll.stderr.on('data', logger);
});



gulp.task('serve', () => {
  browserSync.init({
    files: [path.join(__dirname, config.jekyll.deployDir, '**')],
    port: config.jekyll.port,
    server: {
      baseDir: path.join(__dirname, config.jekyll.deployDir)
    }
  });
});



gulp.task('watch', () => {
  gulp.watch(path.join(__dirname, config.images.input.path, config.images.input.filename), ['images']);
  gulp.watch(path.join(__dirname, config.css.input.path, '**', '*.{scss,sass,css}'), ['css']);
  gulp.watch(path.join(__dirname, config.js.input.path, '**', '*.js'), ['js']);
});


gulp.task('build', ['css', 'js', 'images', 'jekyll']);
gulp.task('develop', ['build', 'serve', 'watch']);