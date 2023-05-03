const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");
const imagemin = require("gulp-imagemin");

function compilaSass() {
    return gulp.src("./source/scripts/*.js")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./build/style"));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

exports.default = function() {
    gulp.watch('./source/style/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch("./source/scripts/*.js", { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch("./source/images/*", { ignoreInitial: false }, gulp.series(comprimeImagens));
}