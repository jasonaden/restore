var gulp = require('gulp');
var concat = require('gulp-concat');
var tsc = require('gulp-typescript');
var merge = require('merge2');
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('default', ['old-compile', 'concat-tsd']);

gulp.task('compile', function(){
  var tsAmd = gulp.src('./src/**/*.ts')
    .pipe(tsc(tsProject));
  tsAmd.js.pipe(gulp.dest('./dist'));
  
  var tsCommon = gulp.src('./src/**/*.ts')
    .pipe(tsc({
      "target": "es5",
      "module": "commonjs",
      "declaration": true,
      "outDir": "tsd"
    }));
  return tsCommon.dts.pipe(gulp.dest('./tsd'));
});

gulp.task('old-compile', function(){
  var tsAmd = gulp.src('./src/**/*.ts')
      .pipe(tsc({
        "target": "es5",
        "module": "amd",
        "outFile": "index.js"
      }));

  var tsCommon = gulp.src('./src/**/*.ts')
    .pipe(tsc({
      "target": "es5",
      "module": "commonjs",
      "declaration": true,
      "outDir": "out"
    }));
    
    return merge([
      tsCommon.dts.pipe(gulp.dest('out/tsd')),
      tsAmd.js.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('concat-js', ['compile'], function(){
  return gulp.src('./out/js/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-tsd', ['compile'], function(){
  return gulp.src('./tsd/**/*.d.ts')
    .pipe(concat('index.d.ts'))
    .pipe(gulp.dest('./dist/'));
});
