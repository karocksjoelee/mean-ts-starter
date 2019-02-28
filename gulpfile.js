const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const del = require('del');
const chalk = require('chalk');
const config = require('./config.json');

const dev = chalk.magenta.bold;

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
gulp.task('default', gulp.parallel(watchServerTSFiles, watchAngular, nodemons, browserSyncInit));


function compileBin() {
  return gulp.src(path.serverTypescriptFiles.bin)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/bin/`));
}

function compileControlllers() {
  return gulp.src(path.serverTypescriptFiles.controllers)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/controllers/`));
}

function compileRoutes() {
  return gulp.src(path.serverTypescriptFiles.routes)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/routes/`));
}

function compileUtilities() {
  return gulp.src(path.serverTypescriptFiles.utilities)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/utilities/`));
}

function compileExpressApp() {
  return gulp.src(path.serverTypescriptFiles.expressApp)
    .pipe(ts())
    .pipe(gulp.dest(`${path.serverTSCompiledDest}/`));
}

function compileMongoSchema() {
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

function watchAngular() {
  gulp.watch(['dist/**/*'], browserReload);
}

function nodemons(done) {
  nodemon({
    script: './built/bin/www.js',
    watch: path.compiledFiles,
  });
  done();
}

function browserSyncInit(done) {
  browserSync.init({
    proxy: `http://localhost:${config['dev-server-port']}`,
    ui: {
      port: 8080
    }
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}
