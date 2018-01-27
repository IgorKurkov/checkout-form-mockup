var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    notify      = require('gulp-notify'),
    less        = require('gulp-less'),
    sass        = require('gulp-sass'),
    path        = require('path'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    concat      = require("gulp-concat"),
    gulpCopy    = require('gulp-copy'),
    del         = require('del');
///////////////////////////////
// npm i --save-dev gulp del browser-sync gulp-notify gulp-less gulp-cssmin path gulp-rename gulp-uglify gulp-concat gulp-copy

    
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
  return gulp.src('app/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }).on("error", notify.onError()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task("default", ["less", "start-server"], () => {
  gulp.watch('app/css/**/*.css', ["reload"]);
  // gulp.watch('app/sass/**/*.sass', ["sass", "reload"]);
  gulp.watch('app/less/**/*.less', ["less", "reload"]);
  gulp.watch('app/js/**/*.js', ["reload"]);
  gulp.watch('app/*.html', browserSync.reload);
});




///build
gulp.task('build-html', function() {
  return gulp.src('app/index.html')
      .pipe(gulp.dest('dist/'))
});

gulp.task('build-css', ["less"], function() {
  return gulp.src([
    'app/css/**/*.css',  
  ])
  .pipe(concat('main.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('dist/css/'))
});

gulp.task('build-img', function() {
return gulp.src('app/img/**/*')
    .pipe(gulpCopy('dist/', {prefix: 1}))
    .pipe(gulp.dest('dist/img/'));
  });

gulp.task('build-fonts', function() {
  return gulp.src('app/fonts/**/*')
      .pipe(gulpCopy('dist/', {prefix: 1}))
      .pipe(gulp.dest('dist/fonts/'));
    });

gulp.task('clean', function(){
      return del(['dist/**', '!dist'], {force:true});
 });

gulp.task('build-all', ['clean', 'build-fonts', 'build-img', 'build-html', 'build-css'], () => {
  
});




// gulp.task('sass', () => {
//   return gulp.src('app/sass/**/*+(.sass|.scss)')
//       .pipe(sass().on("error", notify.onError()))
//       .pipe(gulp.dest('app/css'))
//       .pipe(browserSync.reload({stream: true}));
// });
