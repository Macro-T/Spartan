'use strict';
var gulp = require('gulp'),
      wiredep = require('wiredep').stream,
      $ = require('gulp-load-plugins')();
var sassConfig = { style: 'expanded', sourcemap: false, 'sourcemap=none': true };

//Compilations and Linting
gulp.task('styles', function(){
 return $.rubySass('./public/sass/', sassConfig)
      .on('error', function (err) { console.log(err.message); $.notify(err);})
      // .pipe($.autoprefixer({
      //           browsers: ['last 2 version'],
      //           cascade: false
      //       }))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('jshint', function(){
  return gulp.src('./public/js/**/*.js')
                .pipe($.jshint('.jshintrc'))
                .pipe($.jshint.reporter('jshint-stylish'))
                .pipe($.jshint.reporter('fail'));
});

//Injections
gulp.task('inject', function() {
  var target = gulp.src('./views/index.html');
  var sources = gulp.src(['./public/js/*.js', './public/css/*.css']);
  target.pipe($.inject(sources,{
              read: false,
              ignorePath: '../public',
              cwd: './public',
              relative: true
            }))
    .pipe(gulp.dest('./views'))
    .pipe($.notify({ message: 'Content Injected' }));
});

gulp.task('bowerInject', function() {
  gulp.src('./views/index.html')
        .pipe(wiredep({
          directory:'./public/vendor',
          ignorePath:'./public',
          onError: (function(err) {console.log(err); $.notify(err);})(),
        }))
        .pipe(gulp.dest('./views'));
});

//Watch
gulp.task('watch', function(){
  gulp.watch(['./public/sass/**/*.sass'], ['styles', 'inject']);
  gulp.watch(['./public/js/**/*.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['bowerInject']);
  console.log('Now Watching O.O your Files');
});
gulp.task('default', ['bowerInject', 'inject', 'watch']);
