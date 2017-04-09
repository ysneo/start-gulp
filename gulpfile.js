const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');

const tsProject = ts.createProject('tsconfig.json');
const cssFiles = ['**/*.css', '!**/*min.css'];
const tsFiles = ['src/**/*.ts'];
const jsFiles = ['src/**/*.js']
const htmlFiles = ['*.html']
const webApp = ''; // localhost/jdzweb

var runBuildTypescript = function () {
    var result = gulp.src(tsFiles, {
            base: '.'
        })
        .pipe(tsProject());

    return result.js
        .pipe(gulp.dest('.'))
        .on('finish', function () {
            console.log('build typescript successfully');
            runCompressJS();
        });
};

var runCompressJS = function () {
    return gulp.src(jsFiles, {
            base: '.'
        })
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .on('finish', function () {
            console.log('output js successfully');
        });
};

var runCleanCss = function () {
    let result = gulp.src(cssFiles, {
            base: '.'
        })
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            debug: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream())
        .on('finish', function () {
            console.log('clean css successfully');
        });

    return result;
};

var initBrowserSync = function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: 'index.html'
        },
        port: 80,
        logLevel: 'info',
        logFileChanges: true, //TODO: can't see the log which file changed
        logConnections: true,
        ui: {
            port: 3001
        },
        logPrefix: "DHI DSS"
    });
};

var browserReload = function () {
    browserSync.reload({
        stream: true
    });
};

var watchFiles = function () {
    var watchOption = {
        readDelay: 200,
        awaitWriteFinish: {
            stabilityThreshold: 1000,
            pollInterval: 300
        }
    };
    // Watch .ts files
    watch(tsFiles, watchOption, function () {
        runBuildTypescript();
    });

    // Watch .css files
    watch(cssFiles, watchOption, function () {
        runCleanCss();
    });

    // Watch .html files
    watch(htmlFiles, watchOption, function () {
        browserReload();
    });
};

gulp.task('browser-sync', function () {
    initBrowserSync();
});

gulp.task('build-ts', runBuildTypescript);

gulp.task('clean-css', runCleanCss);

gulp.task('default', ['build-ts', 'clean-css'], function () {
    initBrowserSync();
    watchFiles();
});


gulp.task('clean', function () {
    //TODO: clean files which created by task-default;
    // rimraf();
});