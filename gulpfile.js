const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const changed = require('gulp-changed');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const chalk = require('chalk');

const err = chalk.red.bold;
const suc = chalk.green.bold;
const dev = chalk.magenta.bold;
const warn = chalk.yellow.bold;

const path = {
  serverTypescriptFiles: {
    bin: ['bin/www.ts'],
    controllers: ['controllers/**/*'],
    routes: ['routes/**'],
    utilities: ['utilities/**'],
    expressApp: ['app.ts'],
    mongoModels: ['models/*']
  },
  // * Change this, if you want your own folder name .
  serverTSCompiledDest: 'output',
  compiledFiles: [
    'built/**', 'dist/**'
  ]
};

function copy() {
  return gulp.src(path.compiledFiles)
    .pipe(gulp.dest('output/'));
}

function compileBin() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling bin/www.ts'));
  }
  return gulp.src(path.serverTypescriptFiles.bin)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/bin/`));
}

function compileControlllers() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling controller/**/*.ts'));
  }
  return gulp.src(path.serverTypescriptFiles.controllers)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/controllers/`));
}

function compileRoutes() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling routes/**.ts'));
  }
  return gulp.src(path.serverTypescriptFiles.routes)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/routes/`));
}

function compileUtilities() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling routes/**.ts'));
  }
  return gulp.src(path.serverTypescriptFiles.utilities)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/utilities/`));
}

function compileExpressApp() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling app.ts'));
  }
  return gulp.src(path.serverTypescriptFiles.expressApp)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/`));
}

function compileMongoSchema() {
  if (false) {
    console.log(dev('[ GULP ] [ TS ] Compiling models/**'));
  }
  return gulp.src(path.serverTypescriptFiles.mongoModels)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/models/`));
}

function compileTS() {
  console.log(dev('[ GULP ][ TS ] Compiling server files to typescript ...'));
  return gulp.parallel(compileExpressApp, compileBin,
    compileControlllers, compileRoutes, compileUtilities,
    compileMongoSchema
  );
}




gulp.task('copy', copy);
gulp.task('compile:ts', compileTS());



// gulp.task('default', ['message', 'typescript', 'watch', 'nodemon',]);

// gulp.task('message', () => {
//   return console.log(dev(`[ GULP ] is up and running ...`));
// });

// gulp.task('watch',() => {
//   gulp.watch(path.serverTypescriptFiles, ['typescript'])
//       .on('change', () => {
//         console.log(warn('[ GULP ] Server Typescript Files Changed'));
//       });
//   gulp.watch(path.compiledFiles)
//       .on('change', () => {
//         console.log(warn('[ GULP ] Compiled Files Changed ...'));
//       });
// });

// gulp.task('nodemon', () => {
//   nodemon({
//       script: './built/bin/www.js',
//       ignore: ['src'],
//   }).on('restart', () => {
//     console.log(warn('[ GULP ] Server Restarting ... '));
//   });
// });


