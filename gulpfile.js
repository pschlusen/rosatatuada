var gulp = require('gulp')
var cleanCSS  = require('gulp-clean-css')
var livereload = require('gulp-livereload')
const autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create()
 
const paths = { 
    common: {
        dest: "./dest/css/"
    },
    styles: {
        src: "src/**/*.css",
        dest: "dest/css"
    },
    scripts: {
        src: "src/**/*.js",
        dest: "dest/js"
    }
}

/* serve local files */
initBrowserSync = () => {
    browserSync.init({
        server: {
            baseDir: paths.common.dest
        }
    })
}

/* reload page when any file is changed */
initLiveReload = () => {
    livereload.listen({ basePath: './dest' })
}

minifyCSS = () => {
    return gulp.src(paths.styles.src)
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.styles.dest))
}

 
gulp.task('default', () => {
    initBrowserSync()
    initLiveReload()
    gulp.watch(paths.styles.src, minifyCSS).on('change', () => {
        livereload.reload()
    })
});