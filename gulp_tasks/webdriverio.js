const gulp = require('gulp');
const webdriver = require('gulp-webdriver');
const wdio = require('gulp-wdio');

gulp.task('test:e2e', wdioJasmine);

function wdioJasmine(done){
  //gulp.src('./conf/wdio.jasmine.conf.js').pipe(webdriver());
  gulp.src('./conf/wdio.jasmine.conf.js').pipe(wdio({wdio:{}}));
  done();
}
