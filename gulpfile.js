const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCSS  = require('gulp-clean-css')
const livereload = require('gulp-livereload')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()


const paths = { 
    common: {
        dest: "./dest/"
    },
    styles: {
        src: "src/**/*.css"
    },
    scripts: {
        src: "src/**/*.js"
    }
}

/* serve local files */
initBrowserSync = () => {
    browserSync.init({
        open: false,
        server: {
            baseDir: paths.common.dest
        }
    })
}

/* reload page when any file is changed */
initLiveReload = () => {
    livereload.listen({ basePath: paths.common.dest })
}

minifyCSS = () => {
    return gulp.src(paths.styles.src)
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.common.dest))
}

minifyJS = () => {
    return gulp.src(paths.scripts.src)
            .pipe(babel({presets: ['@babel/preset-env']}))
            .pipe(uglify())
            .pipe(gulp.dest(paths.common.dest))
}
 
gulp.task('default', () => {
    initBrowserSync()
    initLiveReload()

    gulp.watch(paths.scripts.src, minifyJS).on('change', () => { livereload.reload() })
    gulp.watch(paths.styles.src, minifyCSS).on('change', () => { livereload.reload() })
})
