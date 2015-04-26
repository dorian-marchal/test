/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');
var tinylr;


gulp.task('default', ['express', 'livereload']);

gulp.task('watch', function() {
    var cssFiles = 'src/css/*.css';
    var jsFiles = 'src/js/*.js';
    gulp.watch(cssFiles, ['copyCss']);
    gulp.watch(jsFiles, ['copyJs']);
    gulp.watch('assets/css/*.css', notifyLiveReload);
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({ port: 35729 }));
    app.use(express.static(__dirname));
    app.listen(4000);
});

function notifyLiveReload(event) {
    console.log('notifyLiveReload');
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
          files: [fileName]
        }
    });
}

gulp.task('livereload', ['watch'], function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

gulp.task('copyJs', function() {
    gulp.src('src/js/*.js').pipe(gulp.dest('assets/js'));
});

gulp.task('copyCss', function() {
    gulp.src('src/css/*.css').pipe(gulp.dest('assets/css'));
