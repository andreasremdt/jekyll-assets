#  jekyll-boilerplate

> A modern and customizable asset pipeline for Jekyll projects. Processes your SASS/SCSS, JavaScript, images and makes your development workflow a lot easier.

*Experiencing any issues or do you have ideas what could be added / improved? Report an [issue](https://github.com/andreasremdt/jekyll-assets/issues).*

## Table of contents

* <a href="#introduction">Introduction</a>
* <a href="#features">Features</a>
* <a href="#installation">Installation</a>
* <a href="#usage">Usage</a>
	* <a href="#file-structure">File structure</a>
	* <a href="#css">CSS</a>
	* <a href="#javascript">JavaScript</a>
	* <a href="#images">Images</a>
	* <a href="#jekyll">Jekyll</a>
* <a href="#used-libraries">Used libraries</a>
* <a href="#license">License</a>

##  Introduction

Ever developed a website using [Jekyll](https://jekyllrb.com/) or any other [static site generator](https://www.staticgen.com/) and struggled because...

* ...you wanted to write the latest JavaScript using all these cool new features, but had problems configuring Babel or concatenating the files?
* ...you had a few unoptimized images which slowed down your site loading, so you had to compress them manually?
* ...you had to prefix your CSS to make it work in older browsers?
* ...you where just too lazy to properly configure your assets and ended up serving them as is?

This boilerplate project might be something for you then. Without any configuration, you can start building your Jekyll website and let it handle your JavaScript, CSS and images. Thanks to Gulp and a simple config file, setting up the development process is pretty much a piece of cake.

## Features

* Compiles SASS / SCSS into regular CSS.
* Minifies CSS and JS for a faster page loading.
* Removes unused CSS.
* Prefixes new CSS for older browsers (based on your preference).
* Generates sourcemaps for JavaScript and CSS.
* Compiles EcmaScript 6/7/8 and upwards into EcmaScript 5 using Babel.
* Concats different JS files into one (NOT JS modues).
* Optimizes images for a faster page loading.
* Converts images into WEBP.
* Handles the Jekyll `build` and `serve` commands.
* Let's you choose the output file names and paths.
* Sets a basic folder structure for Jekyll to get you started.

##  Installation

Download this repository as a ZIP using your browser.

##  Usage

###  File structure

* **config.js** - The global configuration file. In here you specify whether and how you want to compile your assets and in which directories they belong.
* **gulpfile.js** - This pipeline is using Gulp. In this file all of the Gulp tasks are specified.
* **package.json & package-lock.json** - Dependencies for the build scripts.
* **assets/** - In here you'll find the raw and unprocessed JavaScript, SASS and images. You'll be coding in here.
* **.babelrc** - Specifies the Babel environment.
* **_config.yml** - The default Jekyll configuration
* **Gemfile & Gemfile.lock** - Version and dependency management for Jekyll

###  CSS

```js
// config.js
// ---------------------------------
// CSS configuration

var  css  = {
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
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `input.path` | `String` | The path (without filename) to your SASS / SCSS. |
| `ìnput.filename` | `String` | The name of your main stylesheet (usually imports all the other files). You can use a wildcard like `*.scss`. |
| `output.path` | `String` | The path (without filename) for outputting the processed CSS. |
| `output.filename` | `String` | The final name of your processed CSS file. |
| `options.compressed` | `Boolean` | Whether to minify/compress the CSS or leave it as is. |
| `options.prefixed` | `Boolean` | Whether to prefix the CSS for older browsers or not. |
| `options.purge` | `Boolean` | If enabled, it will analyze your HTML files and remove all the CSS that is not used in any of these files. Takes a few seconds depending on your project size. |
| `options.sourcemap` | `Boolean` | Creates a sourcemap for your CSS if enabled. |
| `options.browserSupport` | `Array` | If you choose to prefix your CSS, this option is used to determine the browser support. Expects the same arguments as with [Browserslist](https://github.com/browserslist/browserslist). |

###  JavaScript

```js
// config.js
// ---------------------------------
// JavaScript configuration

var  js  = {
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
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `input.path` | `String` | The path (without filename) to your JS. |
| `ìnput.filename` | `String` | The name of your main JS file. If you write `*.js`, you can process as many files as you want. |
| `output.path` | `String` | The path (without filename) for outputting the processed CSS. |
| `output.filename` | `String` | The final name of your processed CSS file. |
| `options.minify` | `Boolean` | Whether to minify the JS or leave it as is. |
| `options.concat` | `Boolean` | Whether to concat the JS or not. |
| `options.babel` | `Boolean` | If enabled, compiles EcmaScript 6/7/8 or newer into EcmaScript 5. |
| `options.sourcemap` | `Boolean` | Creates a sourcemap for your JS if enabled. |

###  Images

```js
// config.js
// ---------------------------------
// Image configuration

var  images  = {
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
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `input.path` | `String` | The path (without filename) to your images. |
| `ìnput.filename` | `String` | The name of your image files. You can use a wildcard like in the default config. |
| `output.path` | `String` | The path (without filename) for outputting the processed images. |
| `options.compress` | `Boolean` | Whether to compress the images or leave them with their original file size. |
| `options.webp` | `Boolean` | Whether to convert all the images into WEBP or not. |
| `options.imagemin` | `Object` | Expects and object to configure the imagemin plugin. See [here](https://github.com/imagemin/imagemin) for further details. |

###  Jekyll

```js
// config.js
// ---------------------------------
// Jekyll configuration

var  jekyll  = {
  deployDir: '_site',
  port: 4000
};
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `input.deployDir` | `String` | The folder for the deployed site. |
| `ìnput.port` | `Number` | The port on which to serve the Jekyll development server. |

## Used libraries 

* [gulp](https://www.npmjs.com/package/gulp)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-purgecss](https://www.npmjs.com/package/gulp-purgecss)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [gulp-if](https://www.npmjs.com/package/gulp-if)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-uglify-es](https://www.npmjs.com/package/gulp-uglify-es)
* [gulp-webp](https://www.npmjs.com/package/gulp-webp)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [del](https://www.npmjs.com/package/del)

##  License

MIT © [Andreas Remdt](https://andreasremdt.com)