var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    notify      = require('gulp-notify'),
    less        = require('gulp-less'),
    path        = require('path'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    concat      = require("gulp-concat"),
    gulpCopy    = require('gulp-copy');
///////////////////////////////
// npm i --save-dev gulp browser-sync gulp-notify gulp-less gulp-cssmin path gulp-rename gulp-uglify gulp-concat gulp-copy

    
gulp.task("start-server", () => {
  browserSync({
    server: {baseDir: "app"},
    notify: true});
});

gulp.task("reload", () => {
  browserSync.reload({stream: true});
});

gulp.task('less', () => {
  // return gulp.src('app/less/**/*.less')
  return gulp.src('app/less/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }).on("error", notify.onError()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task("default", ["less", "start-server"], () => {
  gulp.watch('app/css/**/*.css', ["reload"]);
  gulp.watch('app/less/**/*.less', ["less", "reload"]);
  gulp.watch('app/js/**/*.js', ["reload"]);
  gulp.watch('app/**/*.html', ["reload"]);
});

///build
gulp.task('build-html', function() {
  return gulp.src('app/index.html')
      .pipe(change((content) => {
        return content.replace(/type\=\"module\"/g, '');
        }))
      .pipe(gulp.dest('dist/'))
});

gulp.task('build-css', function() {
  return gulp.src([
    'app/css/**/*.css',  
  ])
  .pipe(concat('styles.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css/'))
});

gulp.task('build-libs', function() {
return gulp.src('app/libs/**/*')
    .pipe(gulpCopy('dist/', {prefix: 1}))
    .pipe(gulp.dest('dist/libs/'));
  });


gulp.task('build-all', ['build-libs', 'build-html', 'build-css'], () => {
  sleep(1);
});




// gulp.task('sass', () => {
//   return gulp.src('app/sass/**/*+(.sass|.scss)')
//       .pipe(sass().on("error", notify.onError()))
//       .pipe(gulp.dest('app/css'))
//       .pipe(browserSync.reload({stream: true}));
// });
