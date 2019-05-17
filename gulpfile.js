const del = require('del');
const gulp = require('gulp');
const path = require('path');
const argv = require('yargs').argv;
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const exorcist = require('exorcist');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

const keepFiles = false;
const isProduction = () => argv.production;

gulp.task('clean-build', () => {
    if (keepFiles === false) {
        del(['./build/**/*.*']);
    } else {
        keepFiles = false;
    }
});

gulp.task('copy-static', ['clean-build'], () => {
    return gulp.src(STATIC_PATH + '/**/*').pipe(gulp.dest('./build'));
});

const compileSCSS = () => {
    return gulp.src('./sass/*.scss').pipe(gulp.dest('./build/assets/css'));
};
gulp.task('compile-scss', ['copy-static'], compileSCSS);
gulp.task('fast-compile-scss', compileSCSS);

gulp.task('copy-phaser', ['compile-scss'], () => {
    let files = ['phaser.min.js'];
    if (isProduction() === false) {
        files.push('phaser.map', 'phaser.js');
    }
    return gulp.src(files.map(file => './node_modules/phaser/build/' + file)).pipe(gulp.dest('./build/assets/js'));
});

const build = () => {
    return browserify({
            paths: [path.join(__dirname, 'scripts')],
            entries: './scripts/game.js',
            debug: true,
            transform: [
                [
                    babelify, {
                        presets: ['es2015']
                    }
                ]
            ]
        })
        .transform(babelify)
        .bundle()
        .pipe(gulpif(isProduction() === false, exorcist(sourcemapPath)))
        .pipe(source('game.js'))
        .pipe(buffer())
        .pipe(gulpif(isProduction() === false, uglify()))
        .pipe(gulp.dest('./build/assets/js'));
};
gulp.task('build', ['copy-phaser'], build);
gulp.task('fast-build', build);

gulp.task('watch-scripts', ['fast-build'], browserSync.reload);
gulp.task('watch-static', ['copy-phaser'], browserSync.reload);
gulp.task('watch-scss', ['fast-compile-scss'], browserSync.reload);

gulp.task('serve', ['build'], () => {
    var options = {
        server: {
            baseDir: './build'
        },
        open: true
    };
    browserSync(options);
    gulp.watch('./source/**/*.js', ['watch-scripts']);
    gulp.watch('./static/**/*', ['watch-static']).on('change', () => (keepFiles = true));
    gulp.watch('./scss/*.scss', ['watch-scss']);
});

gulp.task('default', ['serve']);
