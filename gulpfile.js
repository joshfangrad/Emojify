var gulp = require('gulp');
var exec = require('child_process').exec;
var install = require('gulp-install');
var replace = require('gulp-replace');
var del = require('del');

var indexReg = new RegExp(/^\//gm);

var paths = {
    app: 'src/Emojify-app/*.html',
    css: 'styles/*.css',
};
//gulpfile for building gh-pages branch
gulp.task('default', ['removeIgnore', 'install', 'changePath']);

//remove gitignore so dependencies and build end up on the gh-pages branch
gulp.task('removeIgnore', function() {
    del('.gitignore').then(console.log('Deleted .gitignore.'));
});

//make sure we have all dependencies installed
gulp.task('install', ['removeIgnore'] function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

//change to abs pathing so it can run on github pages
gulp.task('changePath', function() {
    gulp.src([paths.app])
        .pipe(replace('../../', '/Emojify/'))
        .pipe(gulp.dest('src/Emojify-app/'));
    gulp.src([paths.css])
        .pipe(replace('../../', '/Emojify/'))
        .pipe(gulp.dest('styles/'));
    gulp.src(['index.html'])
        .pipe(replace('"/', '"/Emojify/'))
        .pipe(gulp.dest('.'));
});
