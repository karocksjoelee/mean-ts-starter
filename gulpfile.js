const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const helper = require('./utilities/helper');

gulp.task('default', ['message', 'nodemon', 'watch']);

gulp.task('message', () => {
  return helper.logDev(`[GULP] is up and running ...`);
});

// gulp.task('eslint', () => {
//   return gulp.src(
//     ['**/*.js', '!node_modules/**', '!dist/**', '!gulpfile.js', '!*.conf.js'])
//              .pipe(eslint())
//              .pipe(eslint.format())
//              .pipe(eslint.failAfterError());
// });

gulp.task('watch', () => {
  gulp.watch(
    ['**/*.js',
    '!node_modules/**', '!dist/**', '!gulpfile.js', '!*.conf.js', ['eslint']]
  );
  gulp.watch(
    ['**/*.js',
    '!node_modules/**', 'dist/**', '!gulpfile.js', '!*.conf.js']
  ).on('change', () => {
    helper.logWarn('[GULP] Back-end File Changed ...');
  });
});

gulp.task('nodemon', () => {
  nodemon({
      script: './bin/www',
      ignore: ['src'],
  }).on('restart', () => {
      helper.logWarn('[GULP] Server Restarting ... ');
  });
});

