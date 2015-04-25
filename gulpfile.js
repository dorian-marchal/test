/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');


gulp.task('watch', function() {
    gulp.watch('src/css/*.css', ['copyCss']);
    gulp.watch('src/js/*.js', ['copyJs']);
});

gulp.task('copyJs', function() {
    gulp.src('src/js/*.js').pipe(gulp.dest('assets/js'));
});

gulp.task('copyCss', function() {
    gulp.src('src/css/*.css').pipe(gulp.dest('assets/css'));
