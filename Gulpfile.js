var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './public/css/**/*.scss';
var output = './public/css';

gulp.task('sass', function() {
  return gulp
    .src(input)
    .pipe(sass())
    .pipe(gulp.dest(output));
});
