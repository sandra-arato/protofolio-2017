var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jade = require('gulp-jade')
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

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
	gulp.watch('src/images/*', ['images']);
});

gulp.task('default', function(){
	console.log('hello world');
});