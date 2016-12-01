const gulp = require('gulp');
const path = require('path');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();
const plugins = require('gulp-load-plugins')();


const srcDir = './src/';
const assetsDir = srcDir + 'assets/';
const publicImg = srcDir + 'public/images/';
const dataDir = srcDir + 'data/';
const distDir = './dist/';

gulp.task('view', function() {
	return gulp.src(srcDir + '*.jade')
		.pipe(plugins.data(function(file) {
			return require(dataDir + path.basename(file.path) + '.json');
		}))
		.pipe(plugins.jade({
			pretty: true
		}))
		.pipe(gulp.dest(distDir))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('stylus', function() {
	return gulp.src(assetsDir + 'style/december.styl')
		.pipe(plugins.stylus())
		.pipe(plugins.autoprefixer(
			'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
		))
		.pipe(plugins.cleanCss({
			compatibility: 'ie8'
		}))
		.pipe(gulp.dest(distDir))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('miniJs', function() {
	return gulp.src(assetsDir + 'js/*.js')
		// .pipe(plugins.uglify())
		.pipe(gulp.dest(distDir))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('library', function () {
	return gulp.src(srcDir + 'public/library/**')
	.pipe(gulp.dest(distDir + 'library/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('image', function() {
	return gulp.src(publicImg + '*.png')
	// .pipe(plugins.imagemin())
	.pipe(gulp.dest(distDir + 'images/'))
});

gulp.task('clean', function() {
	return gulp.src(
		['!./dist/images', '!./dist/images/**', './dist/**/*'],
		{
			read: false
		})
		.pipe(plugins.clean())
});

gulp.task('compile', plugins.sequence('clean', ['view', 'stylus', 'miniJs', 'image', 'library']));


gulp.task('default', ['compile'], function() {
	browserSync.init({
		server: {
			baseDir: distDir
		},
		port: 9527,
		ghostMode: { // 关闭所有设备同步
			clicks: false,
			forms: false,
			scroll: false
		},
		logPrefix: '爸爸告诉你'
	});
	gulp.watch([srcDir + '*.jade', assetsDir + 'template/**'], ['view']);
	gulp.watch(assetsDir + 'style/**/*', ['stylus']);
	gulp.watch(assetsDir + 'js/*.js', ['miniJs']);
});
