var gulp = require("gulp");
var babel = require("gulp-babel");
// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');

// 启动 webserver
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      port:100,
      directoryListing: {
        enable: true,
        path: './index.html'
      },
      livereload: true,
    }))
});
// 编译css
var sass = require('gulp-sass');
gulp.task('sassmin', function(){
  return gulp.src('./css/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./bulid/css'))
});
gulp.task('cssmin', function(){
  return gulp.src('./css/*.css')
    .pipe(gulp.dest('./bulid/css'))
});
// 编译js
gulp.task("minjs", function () {
  return gulp.src(['./js/*.js','!./js/md5.js'])// ES6 源码存放的路径
    .pipe(babel())
    .pipe(gulp.dest("./bulid/js")); //转换成 ES5 存放的路径
});
// 侦测 文件变化， 执行相应任务
gulp.task('watch', function () {
  gulp.watch('./js/*.js', ['minjs']);
  gulp.watch('./css/*.css', ['cssmin']);
  gulp.watch('./css/*.scss', ['sassmin']);
});

// 配置 default 任务，执行任务队列
gulp.task('default', ['watch', 'minjs','webserver','sassmin','cssmin'], function () {
  console.log('任务队列执行完毕~');
});
