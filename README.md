
# jekyll-assets

> A modern and customizable asset pipeline for Jekyll projects. Processes your SASS/SCSS, JavaScript, images and makes your development workflow easier.

*Do you experience any issues or have ideas what could be added / improved? Report an [issue](https://github.com/andreasremdt/jekyll-assets/issues).*

## Introducation

This project is an asset pipeline for Jekyll projects. If you have ever build a static website, you might have struggled with the optimization of your frontend assets, such as JavaScript or CSS. In today's age it's more important than ever to minify, compile and optimize your assets in order to give your website's visitor the best UX possible.

Instead of doing all this work by hand (which will consume lot of time) you are better off with an automated process. This will save you lots of time during development and make life as a developer so much easier.

## Install

Clone or download this repository using your browser or the GitHub application.

## Usage

### File structure

* **config.json** - The global configuration file. Here you specify whether and how you want to compile your assets and in which directories they belong.
*  **gulpfile.js** - This pipeline is using Gulp. In this file are all the Gulp tasks specified.
* **package.json** - The package's configuration, includes dependencies and build scripts.
* **assets/** - In here you'll find the raw and unprocessed JavaScript, SASS and images. You'll be coding in here.
* **jekyll/** - The Jekyll folder. Your pages, posts and layout will be in here.

### Basic

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);
```

### Custom plugin options

```js
…
.pipe(imagemin([
	imagemin.gifsicle({interlaced: true}),
	imagemin.jpegtran({progressive: true}),
	imagemin.optipng({optimizationLevel: 5}),
	imagemin.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
]))
…
```

Note that you may come across an older, implicit syntax. In versions < 3, the same was written like this:

```js
…
.pipe(imagemin({
	interlaced: true,
	progressive: true,
	optimizationLevel: 5,
	svgoPlugins: [{removeViewBox: true}]
}))
…
```

### Custom plugin options and custom `gulp-imagemin` options

```js
…
.pipe(imagemin([
	imagemin.svgo({plugins: [{removeViewBox: true}]})
], {
	verbose: true
}))
…
```


## API

Comes bundled with the following **lossless** optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*

These are bundled for convenience and most users will not need anything else.

### imagemin([plugins], [options])

Unsupported files are ignored.

#### plugins

Type: `Array`<br>
Default: `[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use. This will overwrite the default plugins. Note that the default plugins comes with good defaults and should be sufficient in most cases. See the individual plugins for supported options.

#### options

Type: `Object`

##### verbose

Type: `boolean`<br>
Default: `false`

Enabling this will log info on every image passed to `gulp-imagemin`:

```
gulp-imagemin: ✔ image1.png (already optimized)
gulp-imagemin: ✔ image2.png (saved 91 B - 0.4%)
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)# gulp-imagemin [![Build Status](https://travis-ci.org/sindresorhus/gulp-imagemin.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-imagemin) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

> Minify PNG, JPEG, GIF and SVG images with [imagemin](https://github.com/imagemin/imagemin)

*Issues with the output should be reported on the imagemin [issue tracker](https://github.com/imagemin/imagemin/issues).*

---

<p align="center"><sup>🦄 Support <a href="https://github.com/sindresorhus">my open-source work</a> by buying this awesome video course:</sup><br><b><a href="https://learnnode.com/friend/AWESOME">Learn to build apps and APIs with Node.js</a> by Wes Bos</b><br><sub>Try his free <a href="https://javascript30.com/friend/AWESOME">JavaScript 30</a> course for a taste of what to expect & check out his <a href="https://ES6.io/friend/AWESOME">ES6</a>, <a href="https://ReactForBeginners.com/friend/AWESOME">React</a>, <a href="https://SublimeTextBook.com/friend/AWESOME">Sublime</a> courses.</sub></p>

---


## Install

```
$ npm install --save-dev gulp-imagemin
```


## Usage

### Basic

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);
```

### Custom plugin options

```js
…
.pipe(imagemin([
	imagemin.gifsicle({interlaced: true}),
	imagemin.jpegtran({progressive: true}),
	imagemin.optipng({optimizationLevel: 5}),
	imagemin.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
]))
…
```

Note that you may come across an older, implicit syntax. In versions < 3, the same was written like this:

```js
…
.pipe(imagemin({
	interlaced: true,
	progressive: true,
	optimizationLevel: 5,
	svgoPlugins: [{removeViewBox: true}]
}))
…
```

### Custom plugin options and custom `gulp-imagemin` options

```js
…
.pipe(imagemin([
	imagemin.svgo({plugins: [{removeViewBox: true}]})
], {
	verbose: true
}))
…
```


## API

Comes bundled with the following **lossless** optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*

These are bundled for convenience and most users will not need anything else.

### imagemin([plugins], [options])

Unsupported files are ignored.

#### plugins

Type: `Array`<br>
Default: `[imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]`

[Plugins](https://www.npmjs.com/browse/keyword/imageminplugin) to use. This will overwrite the default plugins. Note that the default plugins comes with good defaults and should be sufficient in most cases. See the individual plugins for supported options.

#### options

Type: `Object`

##### verbose

Type: `boolean`<br>
Default: `false`

Enabling this will log info on every image passed to `gulp-imagemin`:

```
gulp-imagemin: ✔ image1.png (already optimized)
gulp-imagemin: ✔ image2.png (saved 91 B - 0.4%)
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)