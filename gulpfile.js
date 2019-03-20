const { watch, parallel } = require('gulp');
const { join } = require('path');
const { exec } = require('child_process');
const del = require('del');

const API_PATH = join(__dirname, './api');
const SCRAPER_PATH = join(__dirname, './scraper');

// HELPER FUNCTIONS
const execCmd = (cmd) => {
  const execProcess = exec(cmd);

  execProcess.stdout.pipe(process.stdout);

  return execProcess;
}

const installDependencies = (path) => {
  return execCmd(`"npm" install --prefix ${path}`);
}

// gulp.task('watch', gulp.series('build'), function() {
//   gulp.watch('./*.ts', ['build']);
// });

// DEPENDENCIES TASKS
const installApiDeps = () => installDependencies(API_PATH);
const installScraperDeps = () => installDependencies(SCRAPER_PATH);
const installProjectDeps = (done) => {
  return parallel(installApiDeps, installScraperDeps)(done);
};

// CLEAN TASKS
const clean = () => del('dist');

// BUILD TASKS
const buildProject = () => execCmd('"node" ./node_modules/typescript/bin/tsc -b tsproject.json');
const watchProject = () => watch(['./**/*.ts', '!./**/node_modules/**'], buildProject);

module.exports = {
  buildProject,
  clean,
  installApiDeps,
  installScraperDeps,
  installProjectDeps,
  watchProject
}