const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const chalk = require('chalk');

const err = chalk.red.bold;
const suc = chalk.green.bold;
const dev = chalk.magenta.bold;
const warn = chalk.yellow.bold;

const path = {
  serverTypescriptFiles: [
    'bin/**/*', 'routes/**/*', 'utilities/**/*', 'models/**/*', 'controllers/**/*' ,'./app.ts',
    '!node_modules/**', '!src/**/*', '!views/**', '!public/**/*', '!e2e/**/*', '!dist/**/*'
  ],
  compileFiles: [
    'built/local/**', 'dist/**'
  ]
};


gulp.task('default', ['message', 'typescript', 'watch', 'nodemon',]);

gulp.task('message', () => {
  return console.log(dev(`[ GULP ] is up and running ...`));
});

gulp.task('watch',() => {
  gulp.watch(path.serverTypescriptFiles, ['typescript'])
      .on('change', () => {
        console.log(warn('[ GULP ] Server Typescript Files Changed'));
      });
  gulp.watch(path.compileFiles)
      .on('change', () => {
        console.log(warn('[ GULP ] Compiled Files Changed ...'));
      });
});

gulp.task('nodemon', () => {
  nodemon({
      script: './built/bin/www.js',
      ignore: ['src'],
  }).on('restart', () => {
    console.log(warn('[ GULP ] Server Restarting ... '));
  });
});

gulp.task('typescript', ()  => {
  console.log(dev('[ GULP ] Typescript compiling ...'))
  return gulp.src(path.serverTypescriptFiles, {base: "."})
      .pipe(ts({
        noImplicitAny: true,
        removeComments: true,
      }))
      .pipe(gulp.dest('built/'));
});

