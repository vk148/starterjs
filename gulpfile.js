var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('css', function() {
    return sass('src/css/', { sourcemap: true })
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['css']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['js']);

    // Watch image files
    gulp.watch('src/img/**/*', ['img']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'js', 'img');
});
