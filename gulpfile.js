const gulp = require("gulp"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  uglifycss = require("gulp-uglifycss"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  prettyError = require("gulp-prettyerror");

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

//Task to watch for changes to css files and do minify
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("scripts"));
  done();
});

//Load Browsersync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("build/css/*.css").on("change", browserSync.reload);
  done();
});

//Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));

gulp.task("lint", function() {
  return (
    gulp
      .src(["./js/*.js"])
      // Also need to use it here...
      .pipe(prettyError())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  );
});
gulp.task(
  "scripts",
  gulp.series("lint", function() {
    return gulp
      .src("./js/*.js")
      .pipe(terser())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest("./build/js"));
  })
);
