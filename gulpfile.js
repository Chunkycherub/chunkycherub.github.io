const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

const src = {
    scss: 'scss/**/*.scss',
    css: 'css',
    html: '*html',
    pages: 'pages/**/*.html',
    js: 'js/**/*.js'
};

// Finds all SCSS files and translates them to CSS, then reloads the site to display changes
function style(){
    return(
        gulp.src(src.scss)
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(gulp.dest(src.css))
            .pipe(browserSync.reload({stream: true}))
    );
}

// Tells BrowserSync to watch for changes in SCSS, HTML, and Javascript
function watch(){
    browserSync.init({
        server: './'
    });

    gulp.watch(src.scss, style);
    gulp.watch(src.html).on('change', browserSync.reload);
    gulp.watch(src.pages).on('change', browserSync.reload);
    gulp.watch(src.js).on('change', browserSync.reload);
}

// Overrides the default gulp function with our watch function
exports.default = watch;