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

gulp.task('compile:ts', compileTS());
gulp.task('default', gulp.parallel(watchServerFiles, server));


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

function watchServerFiles() {
  const allFiles = [];
  Object.keys(path.serverTypescriptFiles).map((objectKey, index) => {
    allFiles.push(path.serverTypescriptFiles[objectKey][0]);
  });
  console.log(allFiles);
  browserSync.init({
    open: 'external',
    proxy: 'localhost',
    port: 7000
  });
  gulp.watch(allFiles, gulp.series(compileTS));
  gulp.watch(path.compiledFiles).on('change', browserSync.reload, server);
}

function server() {
  const stream = nodemon({
    script: './output/bin/www.js',
    ignore: ['src']
  });
  return stream
    .on('start', () => {
      console.log(dev('[ GULP ] Starting server'));
      compileTS();
      browserSync.reload();
    })
    .on('restart', () => {
      console.log(dev('[ GULP ] Restaring server'));
    })
    .on('crash', () => {
      // TODO Log Crash timing
      console.log(err('[ GULP ] Server crashed, restart in 5 second'));
      stream.emit('restart', 5);
    });
}





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


