var sourceDirName = "./Src";
var outputDirName = "./Dist";
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber'); // error handling


// Static server
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: outputDirName
        }
    });
});


var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function() {
    return gulp.src(path.join(sourceDirName, '*.html'))
        .pipe(minifyHTML({
            empty: true
        }))
        .pipe(gulp.dest(outputDirName))
        .pipe(browserSync.reload({
            stream: true
        }));
});

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-clean-css');
gulp.task('sass', function() {
    return gulp.src([
            path.join(sourceDirName, 'Scss/**/*.scss'),
        ]).pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.join(outputDirName, 'css')))
        .pipe(browserSync.reload({
            stream: true
        }));
});


var tslint = require('gulp-tslint');
gulp.task('tslint', function() {
    return gulp.src([
            path.join(sourceDirName, 'ts/**/*.ts'),
        ]).pipe(plumber())
        .pipe(tslint())
        .pipe(tslint.report());
});


var typescript = require('gulp-typescript');
uglify = require('gulp-uglify');
gulp.task('ts', function() {
    return gulp.src([
            path.join(sourceDirName, 'ts/**/*.ts'),
        ]).pipe(typescript())
        .pipe(uglify())
        .pipe(gulp.dest(path.join(outputDirName, 'js')))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['./Src/ts/**/*.ts'], ['ts', 'tslint', 'browser-sync']);
    gulp.watch(['./Src/Scss/**/*.scss'], ['sass', 'browser-sync']);
    gulp.watch(['./Src/*.html'], ['minify-html', 'browser-sync']);
});

// Default Task
gulp.task('default', ['minify-html', 'sass', 'ts', 'tslint', 'browser-sync', 'watch']);