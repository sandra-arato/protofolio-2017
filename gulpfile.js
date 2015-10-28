var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jade = require('gulp-jade'),
	gzip = require('gulp-gzip'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	critical = require('critical');

gulp.task('process-styles', function(){
	return sass('src/styles/main.scss', { 
		style: 'expanded',
		loadPath: [
			'src/styles/_normalize.scss',
			'src/styles/_colors.scss',
			'src/styles/_icomoon.scss'
		]})
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dest/styles'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dest/styles'));
});

gulp.task('process-scripts', function(){
	return gulp.src('src/scripts/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dest/scripts/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dest/scripts/'));
});

gulp.task('templates', function(){
	return gulp.src('src/*.jade')
	.pipe(jade({pretty: true}))
	.pipe(gulp.dest('dest/'));
});

gulp.task('images', function() {
	return gulp.src('src/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dest/images'));
});

gulp.task('watch', function(){
	gulp.watch('src/scripts/*.js', ['process-scripts']);
	gulp.watch('src/*.jade', ['templates']);
	gulp.watch('src/includes/*.jade', ['templates']);
	gulp.watch('src/styles/*.scss', ['process-styles']);
});

gulp.task('critical', ['process-styles'], function () {
	critical.generateInline({
		base: 'dest/',
		src: 'index.html',
		styleTarget: 'dest/styles/main-critical.css',
		htmlTarget: 'dest/index.html',
		width: 420,
		height: 720,
		minify: true
	});
});

gulp.task('default', function(){
	gulp.run('process-scripts');
	gulp.run('templates');
	gulp.run('critical');
});