/*
|-------------------------------------------------------------------------------
| CSS / SCSS / SASS
|-------------------------------------------------------------------------------
|
| Compiles the SCSS / SASS into regular CSS and outputs it into
| the ./css folder.
| 
| The following plugins are available by default:
|   1. gulp-autoprefixer - https://www.npmjs.com/package/gulp-autoprefixer
|   2. gulp-purgecss     - https://www.npmjs.com/package/gulp-purgecss
|   3. gulp-sourcemaps   - https://www.npmjs.com/package/gulp-sourcemaps
|
*/

const css = {
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
| Compiles the latest EcmaScript 6/7/8 into the widely supported ES5
| standard and performs a few optimizations.
| 
| The following plugins are available by default:
|   1. gulp-uglify-es  - https://www.npmjs.com/package/gulp-uglify-es
|   2. gulp-babel      - https://www.npmjs.com/package/gulp-babel
|   2. gulp-concat     - https://www.npmjs.com/package/gulp-concat
|   3. gulp-sourcemaps - https://www.npmjs.com/package/gulp-sourcemaps
|
*/

const js = {
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
    concat: true,
    babel: true,
    sourcemap: true,
  }
}



/*
|-------------------------------------------------------------------------------
| Images
|-------------------------------------------------------------------------------
|
| Compresses and converts images to webp.
| 
| The following plugins are available by default:
|   1. gulp-imagemin  - https://www.npmjs.com/package/gulp-imagemin
|   2. gulp-webp      - https://www.npmjs.com/package/gulp-webp
|
*/

const images = {
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
| A few arguments for the Jekyll task.
|
*/

const jekyll = {
  deployDir: '_site',
  port: 4000
};

module.exports = { css, js, images, jekyll };