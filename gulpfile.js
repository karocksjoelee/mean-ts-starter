const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const del = require('del');
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
  serverTSCompiledDest: 'built',
  compiledFiles: [
    'built/**', 'dist/**'
  ]
};

gulp.task('compile:ts', compileTS());
gulp.task('default', gulp.parallel(watchServerTSFiles, nodemons));


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

function clean() {
  return del(['built']);
}

function compileTS() {
  console.log(dev('[ GULP ][ TS ] Compiling server files to typescript ...'));
  return gulp.parallel(compileExpressApp, compileBin,
    compileControlllers, compileRoutes, compileUtilities,
    compileMongoSchema
  );
}

function watchServerTSFiles() {
  gulp.watch(['bin/www.ts','controllers/**/*',
              'routes/**', 'utilities/**','utilities/*.ts',
              'app.ts','models/*', '!built/**'], gulp.series(clean, gulp.parallel(compileExpressApp, compileBin,
                compileControlllers, compileRoutes, compileUtilities,
                compileMongoSchema)));
}


function nodemons(done) {
  nodemon({
    script: './built/bin/www.js',
    watch: path.compiledFiles,
  });
  done();
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


