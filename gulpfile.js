var gulp      = require('gulp');
var transform = require('vinyl-transform');
var pkg       = require('./package.json');

var config = {
  scripts:    ['*.js', 'js/*.js', 'js/lib/*.js', 'js/views/*.js', 'js/services/*.js', 'js/models/*.js']
, styles:     ['less/*.less', 'less/components/*.less']
, jshint:     { "laxcomma": true
              , "sub": true
              , "globals": {
                  "console": true
                , "module": true
                }
              }
, brwoserify: { debug: true }
};

gulp.task( 'popup-script', function(){
  return gulp.src('./js/app.js')
    .pipe( transform( function( filename ){
      return require('browserify')( config.browserify )
      .add( filename )
      .bundle();
    }))
    .pipe( gulp.dest('./dist') );
});


gulp.task( 'content-script', function(){
  return gulp.src('./js/trello-time.js')
    .pipe( transform( function( filename ){
      return require('browserify')( config.browserify )
      .add( filename )
      .transform( require('brfs') )
      .bundle();
    }))
    .pipe( gulp.dest('./dist') );
});

gulp.task( 'lint', function(){
  return gulp.src( config.scripts )
    .pipe( require('gulp-jshint')( config.jshint ) )
    .pipe( require('gulp-jshint').reporter('default') );
});

gulp.task( 'less', function(){
  return gulp.src('less/app.less')
    .pipe( require('gulp-less')() )
    .pipe( gulp.dest('dist') );
});

gulp.task( 'less-content-script', function(){
  return gulp.src('less/core-trello-time-cs.less')
    .pipe( require('gulp-less')() )
    .pipe( gulp.dest('dist') );
});

gulp.task( 'zip', function(){
  require('gulp-run')('zip -r ./dist/trello-time.zip dist/ manifest.json').exec();
});

gulp.task( 'watch', function(){
  gulp.watch( config.scripts, ['lint', 'scripts'] );
  gulp.watch( config.styles, ['less', 'less-content-script', 'content-script'] );
});

gulp.task( 'scripts', ['content-script', 'popup-script'] );
gulp.task( 'default', [ 'less', 'less-content-script', 'lint', 'scripts', 'watch'] );
gulp.task( 'build', [ 'less', 'less-content-script', 'lint', 'scripts', 'zip'] );