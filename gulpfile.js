var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jade = require('gulp-jade');

gulp.task('process-styles', function(){
	return sass('src/styles/main.scss', { style: 'expanded' })
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

gulp.task('watch', function(){
	gulp.watch('src/scripts/*.js', ['process-scripts']);
	gulp.watch('src/*.jade', ['templates']);
	gulp.watch('src/styles/*.scss', ['process-styles']);
});

gulp.task('default', function(){
	console.log('hello world');
});