var GULP = require('gulp')
,LESS = require('gulp-less')
,CONCAT = require('gulp-concat')
,UGLIFY = require('gulp-uglify')
,BROWSERSYNC = require('browser-sync')
,HANDLEBARS      = require('gulp-handlebars')
,PLUMBER     = require('gulp-plumber')
,WRAP    = require('gulp-wrap')
,DECLARE    = require('gulp-declare')
,RENAME = require('gulp-rename')
,CLEANCSS = require('gulp-clean-css')
,DEL = require('del')
,IMAGEMIN    = require('gulp-imagemin')
,CP          = require('child_process')
;

var paths = {
  staging:"staging/"
  ,styles: {
    src: 'src-css/**/*.less'
    ,staging:"staging/"
    ,dest: 'css/'
  },
  scripts: {
    src: 'src-scripts/**/*.js',
    dest: 'scripts/'
  }
  ,img: {
    src: 'src-img/**/*.{jpg,png,gif,svg}',
    dest: 'assets/img/'
  }
  ,jsons: {
    src: '../*.json',
    dest: 'staging/'
  }
};

/*
------------------------ TASKS
Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */

 var browsersync =()=>{
  BROWSERSYNC({
    files: ['_site' + '/**']
    ,server: {
      baseDir: '_site'
    }
  });
};

var clean = ()=>{
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return DEL([
    paths.jsons.staging
    ]);
}

/* ------------------------- IMG ------------- */

 // gulp.task('imagemin', function() {
 //  return gulp.src('src/img/**/*.{jpg,png,gif}')
 //  .pipe(PLUMBER())
 //  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
 //  .pipe(gulp.dest('assets/img/'));
 // });

 var img = ()=>{
  return GULP.src(paths.img.src)
  .pipe(PLUMBER())
  .pipe(IMAGEMIN({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(GULP.dest(paths.img.dest));
 }//img

 /* ------------------------- STYLE ------------- */

 var copystyle = ()=> {
    // we gotta send main.scss to css so jekyll can pick it up as-is
    return GULP.src(
      [      './src-css/*.scss'
      ,'src-css/lib/bootstrap-3.3.5-dist/css/bootstrap.css'
      ,'src-css/lib/leaflet/leaflet.css' ]
      )
    .pipe(GULP.dest(paths.styles.dest))
  };

  var styles = ()=>{
  // we wanna grab up some specific vendor css, cat em,
  return GULP.src(
    [
    // 'src-css/lib/bootstrap-3.3.5-dist/css/bootstrap.css'
    // ,'src-css/lib/leaflet/leaflet.css'
    // ,
    'src-css/app.less'
    ]
    )//src
  .pipe(LESS())
  .pipe(CLEANCSS())
    // pass in options to the stream
    .pipe(RENAME({
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(GULP.dest(paths.styles.dest));
  }


  /* ------------------------- JS ------------- */
  function scriptsog() {
    return GULP.src(paths.scripts.src, { sourcemaps: true })
    // .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(GULP.dest(paths.scripts.dest));
  }


  var scripts = ()=>{
    return GULP.src([
      'src-scripts/components/jquery/jquery.js'
      ,'src-scripts/components/handlebars/handlebars.runtime.js'
      ,'src-scripts/lib/underscore-min.js'
      ,'src-scripts/lib/backbone-min.js'
      ,'src-scripts/lib/bootstrap-3.3.5-dist/js/bootstrap.js'
      ,'src-scripts/lib/leaflet.js'
      ,'src-scripts/lib/less-1.7.5.min.js'
      ,'src-scripts/lib/masonry.pkgd.min.js'
      ,'src-scripts/H-templates-compiled.js'
      ,'src-scripts/rrssb.min.js'
      ,'src-scripts/Masonry.js'
      ,'src-scripts/Models.js'
      ,'src-scripts/Collections.js'
      ,'src-scripts/Views.js'
      ])
    .pipe(PLUMBER())
    .pipe(UGLIFY())
    .pipe(CONCAT('app.min.js'))
    .pipe(GULP.dest(paths.scripts.dest))
  }

  var copyjs=  ()=>{
    return GULP.src([
      'src-scripts/App.js'
      ,'src-scripts/Routes.js'
      ])
    .pipe(GULP.dest(paths.scripts.dest));
  };

  var stage=  ()=>{
    return GULP.src(paths.jsons.src)
    .pipe(GULP.dest(paths.jsons.dest));
  };


  /* ------------------------- TEMPLATES ------------- */

  var handlez = ()=>{
    return GULP.src('templates/*.handlebars')
    .pipe(HANDLEBARS())
    .pipe(WRAP('Handlebars.template(<%= contents %>)'))
    .pipe(DECLARE({
      namespace: 'CVJEK.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(CONCAT('H-templates-compiled.js'))
    .pipe(GULP.dest('src-scripts/'));
  }

  /* ------------------------- JEKYLL ------------- */

  var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
  };


/**
 * Build the Jekyll Site
 */
 var jekyll = ()=>{
  // var jekyllCommand = 'jekyll';
  // browserSync.notify(messages.jekyllBuild);
  return CP.spawn('jekyll', ['build'], {stdio: 'inherit'})
  // .on('close', done);
}
 // gulp.task('jekyll-build', function (done) {
 //  browserSync.notify(messages.jekyllBuild);
 //  return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'})
 //  .on('close', done);
 // });

 /* ------------------------- TEMPLATES ------------- */

 var watch_style = ()=>{
  return GULP
  .watch(paths.styles.src, styles)
}
var watch_js = ()=>{
  return GULP
  .watch(paths.scripts.src, scripts);
}
var watch_handle = ()=>{
  return GULP
  .watch('templates/*', handlez);
}
var watch_img = ()=>{
  return GULP
  .watch('src-img/**', img);
}

var watch_jek = ()=>{
  return GULP
  .watch('_posts/*',jekyll)
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
 exports.clean = clean;
 exports.stage = stage;
 exports.styles = styles;
 exports.handlez = handlez;
 exports.scripts = scripts;
 exports.img = img;

/*
 * Specify if tasks run in series or parallel using `GULP.series` and `GULP.parallel`
 */

// clean any leftover stuff
// back up extant mongo
// test for UN-indexed carto records
// (if any) back up extant carto
// send unindexed carto records to both dev (localhost) and prod (openshift) Solrs
// get hot episodes from -live && -news (unless they're merged already)
// pull an array of extant instances for those eps
// each through the eps, testing for existence
// for nonexistent, insert to Mongo
// do fresh export of Mongo into dev and prod Solrs
// test
// build #updates template && globals.js queries from same
// 
var build = GULP.series(
  stage
  // clean //clean out stagin area
  // ,GULP.parallel(
  //   copystyle
  //   ,copyjs
  //   ,img
  //   ) //parallel
  // ,handlez
  // ,GULP.parallel(
  //   styles
  //   ,scripts
  //   )//parallel
  // ,jekyll
  // ,GULP.parallel(
  //   watch_style
  //   ,watch_js
  //   ,watch_handle
  //   ,watch_img
  //   ,watch_jek
  //   ,browsersync
  //   )//parallel
  );

/*
 * You can still use `GULP.task` to expose tasks
 */
 GULP.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
 GULP.task('default', build);