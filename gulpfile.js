var gulp = require('gulp');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('default', ['compile', 'concat-tsd']);

gulp.task('compile', function(){
  var tsResult = gulp.src('./src/**/*.ts')
      .pipe(ts({
        declaration: true, 
        noExternalResolve: true
      }));

    return merge([
      tsResult.dts.pipe(gulp.dest('out/tsd')),
      tsResult.js.pipe(gulp.dest('dist/'))
    ]);
});

gulp.task('concat-js', ['compile'], function(){
  return gulp.src('./out/js/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-tsd', ['compile'], function(){
  return gulp.src('./out/tsd/**/*.d.ts')
    .pipe(concat('index.d.ts'))
    .pipe(gulp.dest('./dist/'));
});
