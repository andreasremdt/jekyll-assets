'use strict';

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var purgecss = require('gulp-purgecss');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var del = require('del');
var webp = require('gulp-webp');
var imagemin = require('gulp-imagemin');
var child = require('child_process');
var util = require('util');
var config = require('./config.js');

gulp.task('css', function() {
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

gulp.task('js', function() {
  return gulp
    .src(path.join(__dirname, config.js.input.path, config.js.input.filename))
    .pipe(gulpif(config.js.options.sourcemap, sourcemaps.init()))
    .pipe(gulpif(config.js.options.babel, babel()))
    .pipe(gulpif(config.js.options.concat, concat(config.js.output.filename)))
    .pipe(gulpif(config.js.options.minify, uglify()))
    .pipe(gulpif(config.js.options.sourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest(path.join(__dirname, config.js.output.path)));
});

gulp.task('images', function() {
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

gulp.task('clean', function() {
  return del([
    path.join(__dirname, config.css.output.path),
    path.join(__dirname, config.images.output.path),
    path.join(__dirname, config.js.output.path),
    path.join(__dirname, config.jekyll.deployDir),
  ]);
});

gulp.task('jekyll-build', function(done) {
  var jekyll = child.spawn('jekyll', ['build', '--incremental'], { cwd: './' });

  var logger = function log(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(message => util.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', logger);
  jekyll.stderr.on('data', logger);

  done();
});

gulp.task('jekyll-serve', function(done) {
  var jekyll = child.spawn('jekyll', ['serve', '--incremental', '--watch', '--drafts'], { cwd: './' });

  var logger = function log(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(message => util.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', logger);
  jekyll.stderr.on('data', logger);

  done();
});

gulp.task('watch', function() {
  gulp.watch(path.join(__dirname, config.css.input.path, '**', '*.{css,scss,sass,less}'), gulp.parallel('css'));
  gulp.watch(path.join(__dirname, config.js.input.path, '**', '*.js'), gulp.parallel('js'));
  gulp.watch(path.join(__dirname, config.images.input.path, '**', '*'), gulp.parallel('images'));
});

gulp.task('develop', gulp.series('clean', 'css', 'js', 'images', 'jekyll-serve', 'watch'));
gulp.task('build', gulp.series('clean', 'css', 'js', 'images', 'jekyll-build'));