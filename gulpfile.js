var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    fileinclude = require('gulp-file-include');

var bases = {
    app: 'app/',
    dist: 'build/',
};

var paths = {
    html: ['index.html'],
    fonts: ['fonts/*']
};

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('js', function () {
    return gulp.src(['app/src/*', 'app/src/*/*'])
        .pipe(gulp.dest('build/src'));
});

gulp.task('copy', function(){
    gulp.src(paths.html, {cwd: bases.app})
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest(bases.dist));

    gulp.src(paths.fonts, {cwd: bases.app})
        .pipe(gulp.dest(bases.dist));
});

gulp.task('less', function(){
    return gulp.src('app/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', [
    'copy',
    'less',
    'js',
    'browser-sync'
], function () {
    gulp.watch(['app/*', 'app/**/*'], [
        'copy',
        'less',
        'js',
        browserSync.reload
    ]);
});
