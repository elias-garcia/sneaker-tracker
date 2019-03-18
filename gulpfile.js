const gulp = require('gulp');
const del = require('del');
const { exec } = require('child_process');

gulp.task('build', function() {
  const buildProcess = exec('"node" ./node_modules/typescript/bin/tsc -b tsproject.json');

  buildProcess.stdout.pipe(process.stdout);

  return buildProcess;
});

gulp.task('watch', gulp.series('build'), function() {
  gulp.watch('./*.ts', ['build']);
});

gulp.task('clean', () => {
  return del('dist');
});

