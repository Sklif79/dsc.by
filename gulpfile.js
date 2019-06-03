var gulp = require('gulp');

var autoprefixer = require('autoprefixer');
var postCSS = require('gulp-postcss');
var postCSSimport = require('postcss-easy-import');
var postCSSmqpacker = require('css-mqpacker');
var postCSSmixins = require('postcss-mixins');
var postCSSvariables = require('postcss-advanced-variables');
var postCSSconditionals = require('postcss-conditionals');
var postCSSfor = require('postcss-conditionals');
var postCSSclean = require('postcss-clean');
var browserSync = require('browser-sync');
var fileInclude = require('gulp-file-include');
var removeEmptyLines = require('gulp-remove-empty-lines');
var rename = require('gulp-rename');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rjs = require('gulp-requirejs');
var through = require('through2');
var gutil = require('gulp-util');
 
var  cssmin = require('gulp-minify-css');
 
var importGenerator = function (outname) {
	var paths = '';  // where we will push the path names with the @import

	var write = function (file, enc, cb) {
		if (file.path != "undefined") {
			paths = paths + '\n' + '@import "' + file.path + '";';
		}
		cb();
	};

	var flush = function (cb) {  // flush occurs at the end of the concating from write()

		var newFile = new gutil.File({// create a new file
			base: __dirname,
			cwd: __dirname,
			path: __dirname + '/' + outname,
			contents: new Buffer(paths)  // set the contents to the paths we created
		});

		this.push(newFile);  // push the new file to gulp's stream
		cb();
	};

	return through.obj(write, flush);  // return it
}


const paths = {
	jsComponents: {
		src: [
			'source/js-components/**/*.vue',
			'source/scripts/core-reactive.js'
		],
		dest: 'local/dist/scripts/'
	},
	styles: {
		mainSrc: [
			'source/styles/main.pcss'
		],
		componentsSrc: 'source/js-components/**/*.pcss',
		src: [
			'source/styles/variables.pcss',
			'source/styles/fonts.pcss',
			'source/styles/guideline.pcss',
			'source/styles/core.pcss',
			'source/styles/custom.pcss',
			'source/styles/main.pcss',
			'source/js-components/**/*.pcss'
		],
		dest: 'local/dist/styles/',
		includeDest: 'source/styles/'
	},
	scripts: {
		src: [
			'source/scripts/lib/underscore.js',
			'node_modules/vue/dist/vue.js',
			'source/scripts/lib/jquery.js',
			'source/scripts/lib/require.js',
			'source/scripts/lib/plugins/*.js',
			'source/scripts/core.js',
			'source/scripts/lib/scripts-alternative.js'
		],
		requireSrc: [
			'source/scripts/require/*.js'
		],
		dest: 'local/dist/scripts/',
		requireDest: 'local/dist/scripts/require/'
	},
	images: {
		src: 'source/images/**/*',
		dest: function (file) {
			return file.base.replace('source/', 'local/');
		}
	},
	pages: {
		src: 'source/markup/*.html',
		dest: 'local/markup/'
	}
};

gulp.task('compileJsComponents', function () {
	//return gulp.src(paths.jsComponents.src)
	return rjs({
		name: '../scripts/core-reactive',
		baseUrl: 'source/js-components',
		out: 'components.build.js',
		paths: {
			app: 'app',
			Model: 'Model',
			vue: '../../node_modules/requirejs-vue/requirejs-vue'
		},
		//stubModules: ['vue']
	})
	.pipe(gulp.dest(paths.jsComponents.dest))
	.pipe(uglify())
	.pipe(gulp.dest(paths.jsComponents.dest));
});

gulp.task('generateComponentStylesMap', function () {

	return gulp.src(paths.styles.componentsSrc)
			.pipe(importGenerator('component-style-inc.build.pcss'))
			.pipe(gulp.dest(paths.styles.includeDest));
});

gulp.task('compileStyles', function () {
	return gulp.src(paths.styles.mainSrc)
			.pipe(postCSS([

				postCSSimport,
				postCSSvariables,
				postCSSconditionals,
				postCSSfor,
				postCSSmixins,
                autoprefixer({
                    browsers: [
                        'last 2 version',
                        'last 17 Chrome versions',
                        'last 7 Firefox versions',
                        'last 2 Opera versions',
                        'last 4 Edge versions',
                        'last 2 Explorer versions',
                        'last 7 Safari versions',
                        'last 7 IOS versions'
                    ]
                }),
						//postCSSmqpacker,
						//postCSSclean({level: 0})
			]))
			.pipe(rename('styles.build.css'))
			.pipe(gulp.dest(paths.styles.dest))
			.pipe(cssmin())
			.pipe(gulp.dest(paths.styles.dest))
			.pipe(browserSync.stream());
});

gulp.task('compileScripts', function () {
	return gulp.src(paths.scripts.src)
			.pipe(concat('scripts.build.js'))
			.pipe(uglify())
			.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('compileRequireScripts', function () {
	return gulp.src(paths.scripts.requireSrc)
			.pipe(gulp.dest(paths.scripts.requireDest));
});

gulp.task('compileImages', function () {
	return gulp.src(paths.images.src)
			.pipe(gulp.dest(paths.images.dest));
});

gulp.task('compilePages', function () {
	return gulp.src(paths.pages.src)
			.pipe(fileInclude({
				basepath: '@root',
				indent: true
			}))
			.pipe(removeEmptyLines())
			.pipe(gulp.dest(paths.pages.dest));
});

gulp.task('browserSyncReload', function () {
	browserSync.reload();
});

gulp.task('clean', function () {
	return del([
		'local/markup/*',
		'local/dist/*'
	]);
});

gulp.task('default', function () {

	// run on startup
	gulp.series([
		'clean',
		'compileJsComponents',
		'generateComponentStylesMap',
		'compileStyles',
		'compileScripts',
		'compileRequireScripts',
		'compilePages'
	]);

	// browser sync
	/*browserSync.init({
	 server: {
	 baseDir: "./"
	 }
	 });*/

	// watch & compile
	gulp.watch(paths.jsComponents.src, gulp.series(['compileJsComponents']));
	gulp.watch(paths.styles.src, gulp.series(['generateComponentStylesMap', 'compileStyles']));
	gulp.watch(paths.scripts.src, gulp.series(['compileScripts']));
	gulp.watch(paths.scripts.requireSrc, gulp.series(['compileRequireScripts']));
	gulp.watch(paths.images.src, gulp.series(['compileImages']));
	gulp.watch(paths.pages.src, gulp.series(['compilePages']));
	//gulp.watch([paths.pages.dest, paths.scripts.dest]).on('change', browserSync.reload);
});