/*
jekyll-boilerplate

A small project by Andreas Remdt (https://andreasremdt.com)

This is main configuration file for the Gulp asset pipeline. It is basically
just a collection of objects with a set of properties. You can edit these
properties to archieve the desired outcome.

See the documentation for more details:
https://github.com/andreasremdt/jekyll-boilerplate



|-------------------------------------------------------------------------------
| CSS / SCSS / SASS
|-------------------------------------------------------------------------------
|
| Compiles the SCSS / SASS into regular CSS and outputs it into
| the `css` folder. By default, Gulp will also compress, prefix and clean the
| generated CSS. You can turn these extra processing steps off by setting
| the property values to false.
| 
| The following plugins are used:
|   1. gulp-sass          - https://www.npmjs.com/package/gulp-sass
|   2. gulp-autoprefixer  - https://www.npmjs.com/package/gulp-autoprefixer
|   3. gulp-purgecss      - https://www.npmjs.com/package/gulp-purgecss
|   4. gulp-sourcemaps    - https://www.npmjs.com/package/gulp-sourcemaps
|   5. gulp-purgecss      - https://www.npmjs.com/package/gulp-purgecss
|
*/

var css = {
  input: {
    path: 'assets/scss',
    filename: 'styles.scss'
  },
  output: {
    path: 'css',
    filename: 'styles.min.css'
  },
  options: {
    compressed: true,
    prefixed: true,
    purge: true,
    sourcemap: true,
    browserSupport: ['last 2 versions']
  }
};



/*
|-------------------------------------------------------------------------------
| JavaScript
|-------------------------------------------------------------------------------
|
| Compiles the latest EcmaScript 6/7/8 into the more supported ES5
| standard and performs a few optimizations if enabled. By default,
| the output will be minified and sourcemaps will be created.
| 
| The following plugins are used:
|   1. gulp-uglify-es   - https://www.npmjs.com/package/gulp-uglify-es
|   2. gulp-babel       - https://www.npmjs.com/package/gulp-babel
|   3. gulp-concat      - https://www.npmjs.com/package/gulp-concat
|   4. gulp-sourcemaps  - https://www.npmjs.com/package/gulp-sourcemaps
|
*/

var js = {
  input: {
    path: 'assets/js',
    filename: 'app.js'
  },
  output: {
    path: 'js',
    filename: 'app.min.js'
  },
  options: {
    minify: true,
    concat: false,
    babel: true,
    sourcemap: true,
  }
};



/*
|-------------------------------------------------------------------------------
| Images
|-------------------------------------------------------------------------------
|
| Compresses and converts images to webp if enabled. Imagemin is used to
| archieve the compression. You can change the imagemin options if you want to.
| 
| The following plugins are used:
|   1. gulp-imagemin  - https://www.npmjs.com/package/gulp-imagemin
|   2. gulp-webp      - https://www.npmjs.com/package/gulp-webp
|
*/

var images = {
  input: {
    path: 'assets/images',
    filename: '**/*.{png,gif,jpg,jpeg}'
  },
  output: {
    path: 'images'
  },
  options: {
    compress: true,
    webp: true,
    imagemin: {
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{ 'removeViewBox': true }]
    }
  }
};



/*
|-------------------------------------------------------------------------------
| Jekyll
|-------------------------------------------------------------------------------
|
| This object only provides the Jekyll output directory (by default `_site`)
| and sets the port for the development server.
|
*/

var jekyll = {
  deployDir: '_site',
  port: 4000
};

module.exports = { css, js, images, jekyll };