var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("app/src/**", ['js', browserSync.reload]);
});
