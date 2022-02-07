const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const cleanCSS  = require('gulp-clean-css')
const livereload = require('gulp-livereload')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()


const paths = { 
    common: {
        dest: "./dest/"
    },
    styles: {
        src: "src/**/*.css",
        sass: {
            src: "src/**/*.scss",
            layout: {
                src: "src/layout/layout.scss",
                dest: "./dest/layout/"
            }
        }
    },
    scripts: {
        src: "src/**/*.js"
    },
    utils: {
        src: "src/utils/**/*.js"
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

buildSass = () => {
    return gulp.src(paths.styles.sass.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.common.dest))
}

buildLayoutStyles = () => {
    return gulp.src(paths.styles.sass.layout.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.styles.sass.layout.dest))
}

minifyCSS = () => {
    return gulp.src(paths.styles.src)
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.common.dest))
}

minifyJS = () => {
    return gulp.src(paths.scripts.src)
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest(paths.common.dest))
}

bundleUtils = () => {
    return gulp.src(paths.utils.src)
        .pipe(concat('utils.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.common.dest))
}
 
gulp.task('default', () => {
    initBrowserSync()
    initLiveReload()

    gulp.watch(paths.scripts.src, minifyJS).on('change', () =>  { livereload.reload() })
    gulp.watch(paths.styles.sass.src, buildSass).on('change', () =>  { livereload.reload() })
    gulp.watch(paths.styles.src, minifyCSS).on('change', () =>  { livereload.reload() })
    gulp.watch(paths.utils.src, bundleUtils).on('change', () => { livereload.reload() })

    
    gulp.watch(paths.styles.sass.src, buildLayoutStyles).on('change', () => { livereload.reload() })
})
