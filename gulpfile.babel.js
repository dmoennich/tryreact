/**
 * Created by daniel on 04.11.15.
 */
let gulp = require("gulp");
let babelify = require("babelify");
let browserify = require("browserify");
let source = require("vinyl-source-stream");
let del = require("del");


gulp.task("clean", () => del(["dist"]));

gulp.task("default", ["clean"],() => {

    return browserify({
        entries: ["./browser/js/main.js"],
        debug: true // add source map
    }).transform(babelify, {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source("main-bundle.js"))
        .pipe(gulp.dest("./dist/js"));

});

gulp.task("watch", ["default"],() => {

    gulp.watch("./browser/js/**", ["default"])
    .on("change", (event) => console.log(`${event.path} was changed`));
});


