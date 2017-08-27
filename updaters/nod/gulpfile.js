var GULP = require('gulp')
,LESS = require('gulp-less')
,FS = require('fs')
,MONGO = require('mongodb').MongoClient
// ,MONGO = require('mongo-async')
,__ = require('underscore')
,CONCAT = require('gulp-concat')
,UGLIFY = require('gulp-uglify')
,BROWSERSYNC = require('browser-sync')
,HANDLEBARS      = require('gulp-handlebars')
// ,HBC      = require('handlebars')
,PLUMBER     = require('gulp-plumber')
,HTMLMIN     = require('gulp-htmlmin')
,DEBUG     = require('gulp-debug')
,WRAP    = require('gulp-wrap')
,DECLARE    = require('gulp-declare')
,RENAME = require('gulp-rename')
,CLEANCSS = require('gulp-clean-css')
,SOLR = require('solr-client')
,DEL = require('del')
,IMAGEMIN    = require('gulp-imagemin')
,CP          = require('child_process')
,MOMENT = require('moment')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,ZLIB = require('zlib')
RP=require('request-promise')
;

var paths = {
  staging:"staging"
  ,interm:"interm"
  ,site:{
    src:"../../site/src"
    ,dist:"../../site/dist"
  }
  // ,backup:"backup"
  ,styles: {
    staging:"staging/css"
    ,dest: '../../site/dist/css/'
  }
  ,img: {
    src: 'src-img/**/*.{jpg,png,gif,svg}',
    dest: 'assets/img/'
  }
  ,jsons: {
    src: '../*.json',
    dest: 'staging/'
  }
  ,backup:'bu/'

};

var browsersync =()=>{
  BROWSERSYNC({
    files: [paths.site.src+"/js/*.js"]
    ,server: ['interm/']
  });
};

/* ------------------------- IMG ------------- */

var img = ()=>{
  return GULP.src(paths.site.src+"/images/**/*.{jpg,png,gif,svg}")
  .pipe(PLUMBER())
  .pipe(IMAGEMIN({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(DEBUG())
  .pipe(GULP.dest("interm/images/"));
 }//img

 /* ------------------------- STYLE ------------- */

//  var copystyle = ()=> {
//   return GULP.src(
//     [      './src-css/*.scss'
//     ,'src-css/lib/bootstrap-3.3.5-dist/css/bootstrap.css'
//     ,'src-css/lib/leaflet/leaflet.css' ]
//     )
//   .pipe(GULP.dest(paths.styles.dest))
// };
// 
var offline = ()=> {
  return GULP.src(paths.site.src+"/offline/*")
  .pipe(GULP.dest("interm/offline"))
};


var fonts = ()=> {
  return GULP.src(
    [
    paths.site.src+"/css/fonts/**/*.{otf,ttf}"
    ,paths.site.src+"/lib/icomoon/fonts/**/*.{eot,svg,ttf,woff}"
    ,paths.site.src+"/lib/components/bootstrap/fonts/**/*.{eot,svg,ttf,woff}"
    ,paths.site.src+"/lib/icomoon/fonts/*.{woff,ttf,svg,eot}"
    ]
    )
  .pipe(DEBUG())
  .pipe(GULP.dest("interm/fonts/"))
};

var stylecopy = ()=> {
  return GULP.src(
    [
    paths.site.src+"/lib/leaflet/leaflet.css"
    ,paths.site.src+"/lib/nprogress.css"
    ,paths.site.src+"/css/fonts/fonts-offline.css"
    ,paths.site.src+"/lib/components/off-canvas-menu/vendor/normalize.css"
    ,paths.site.src+"/lib/components/off-canvas-menu/off-canvas-menu.css"
    ,paths.site.src+"/lib/components/off-canvas-menu/general.css"
    ,paths.site.src+"/lib/components/off-canvas-menu/header.css"
    ,paths.site.src+"/lib/components/bootstrap/dist/css/bootstrap.min.css"
    // ,paths.site.src+"/lib/leaflet-history.css"
    ,paths.site.src+"/lib/icomoon/style.css"
    ]
    )
  .pipe(DEBUG())
  .pipe(GULP.dest("interm/css/"))
};




/* ------------------------- JS ------------- */


var views_y_models = ()=>{
  return GULP.src([
    paths.site.src+"/js/H-templates-compiled.js"
    ,paths.site.src+"/js/models.js"
    ,paths.site.src+"/js/views/BaseLayerMenuItemView.js"
    ,paths.site.src+"/js/views/ActivityView.js"
    ,paths.site.src+"/js/views/BaseLayersMenuView.js"
    ,paths.site.src+"/js/views/BaseLayersView.js"
    ,paths.site.src+"/js/views/BaseMapView.js"
    ,paths.site.src+"/js/views/CartoCollxCountView.js"
    ,paths.site.src+"/js/views/BitsView.js"
    ,paths.site.src+"/js/views/BitsCountView.js"
    ,paths.site.src+"/js/views/CartoCollxView.js"
    ,paths.site.src+"/js/views/CartoListView.js"
    ,paths.site.src+"/js/views/ConsoleView.js"
    ,paths.site.src+"/js/views/EpisodesView.js"
    ,paths.site.src+"/js/views/EpisodeView.js"
    ,paths.site.src+"/js/views/RecentsView.js"
    ,paths.site.src+"/js/views/FacetsView.js"
    ,paths.site.src+"/js/views/StatesView.js"
    ,paths.site.src+"/js/views/SharesView.js"
    ,paths.site.src+"/js/views/HuhView.js"
    ,paths.site.src+"/js/views/UpdateView.js"
    ,paths.site.src+"/js/views/HelpView.js"
    ,paths.site.src+"/js/views/MethodView.js"
    ,paths.site.src+"/js/views/PopupView.js"
    ,paths.site.src+"/js/views/QuerySubNavView.js"
    ,paths.site.src+"/js/views/QueryView.js"
    ,paths.site.src+"/js/views/SolrFieldzView.js"
    ,paths.site.src+"/js/app.js"
    ,paths.site.src+"/js/routes.js"
    ])
  .pipe(PLUMBER())
  .pipe(UGLIFY())
  .pipe(CONCAT('vm.min.js'))
  .pipe(GULP.dest("interm/js/"))
}


var lessen = ()=>{

  return GULP.src(
    paths.site.src+"/css/app.less"
    )
  // .pipe(LESS())
  .pipe(DEBUG())
  // .pipe(RENAME({
  //   basename: 'zzzz'
  // }))
  .pipe(GULP.dest("interm/css/"))
}

var lessenREAL = ()=>{

  return GULP.src(
    paths.site.src+"/css/app.less"
    )
  .pipe(LESS())
  .pipe(DEBUG())
  .pipe(RENAME({
    basename: 'zzzz'
  }))
  .pipe(GULP.dest(paths.styles.staging))
}

var styles = ()=>{
  // we wanna grab up some specific vendor css, cat em,
  return GULP.src(
    [
    // paths.styles.staging+'/*.css'
    paths.styles.staging+"/leaflet.css"
    ,paths.styles.staging+"/nprogress.css"
    ,paths.styles.staging+"/fonts-offline.css"
    ,paths.styles.staging+"/normalize.css"
    ,paths.styles.staging+"/off-canvas-menu.css"
    ,paths.styles.staging+"/general.css"
    ,paths.styles.staging+"/header.css"
    ,paths.styles.staging+"/bootstrap.min.css"
    // ,paths.styles.staging+"/leaflet-history.css"
    ,paths.styles.staging+"/style.css"
    ,paths.styles.staging+"/zzzz.css"
    ]
    )//src
  .pipe(CLEANCSS())
    // pass in options to the stream
    .pipe(RENAME({
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(GULP.dest(paths.styles.dest));
  }


// gulp.task('minify', function() {
//   return gulp.src('src/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });
// 
var htmlmin = ()=>{
  return GULP.src(paths.site.src+"/index-interm.html")
  .pipe(HTMLMIN({collapseWhitespace: true}))
  .pipe(RENAME({
    basename: 'index'
  }))
  .pipe(GULP.dest("interm/"))
}

var copyjs=  ()=>{
  return GULP.src([
    paths.site.src+"/lib/less-1.7.5.min.js"
    ,paths.site.src+"/lib/components/handlebars/handlebars.runtime.min.js"
    ,paths.site.src+"/lib/moment.min.js"
    ,paths.site.src+"/lib/octokat.min.js"
    ,paths.site.src+"/lib/components/throbber.js/throbber.js"
    ,paths.site.src+"/lib/leaflet/leaflet.js"
    ,paths.site.src+"/lib/tile.stamen.js"
    ,paths.site.src+"/js/H-templates-compiled.js"
    ,paths.site.src+"/lib/components/jquery/jquery.min.js"
    ,paths.site.src+"/lib/jquery.liveFilter.js"
    ,paths.site.src+"/lib/Wicket/wicket.js"
    // ,paths.site.src+"/lib/leaflet-history.js"
    ,paths.site.src+"/lib/Wicket/wicket-leaflet.js"
    ,paths.site.src+"/lib/nprogress.js"
    ,paths.site.src+"/lib/bootstrap.min.js"
    ,paths.site.src+"/lib/underscore-min.js"
    ,paths.site.src+"/lib/backbone-min.js"
    ,paths.site.src+"/js/globals.js"
    ])
  .pipe(GULP.dest("interm/js/"));
};
  // 
  var copycss=  ()=>{
    return GULP.src(
      [
      paths.site.src+"/css/*.*"
      ,paths.site.src+"/lib/leaflet/leaflet.css"
      ,paths.site.src+"/lib/nprogress.css"
      ,paths.site.src+"/css/fonts/fonts-offline.css"
      ,paths.site.src+"/lib/components/off-canvas-menu/vendor/normalize.css"
      ,paths.site.src+"/lib/components/off-canvas-menu/off-canvas-menu.css"
      ,paths.site.src+"/lib/components/off-canvas-menu/header.css"
      ,paths.site.src+"/lib/components/off-canvas-menu/general.css"
      ,paths.site.src+"/lib/components/bootstrap/docs/dist/css/bootstrap.min.css"
      // ,paths.site.src+"/lib/leaflet-history.css"
      ,paths.site.src+"/lib/icomoon/style.css"
      ]
      )
    .pipe(GULP.dest("interm/css/"));
  };



  /* ------------------------- TEMPLATES ------------- */

  var handlez = ()=>{
    return GULP.src(paths.site.src+'/js/templates/*.handlebars')
    .pipe(HANDLEBARS({handlebars:require('handlebars')}))
    .pipe(WRAP('Handlebars.template(<%= contents %>)'))
    .pipe(DECLARE({
      namespace: 'CBB.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(CONCAT('H-templates-compiled.js'))
    .pipe(GULP.dest(paths.staging+"/js"));
  }

  var handlez_dev = ()=>{
    return GULP.src(paths.site.src+'/js/templates/*.handlebars')
    .pipe(HANDLEBARS({handlebars:require('handlebars')}))
    .pipe(WRAP('Handlebars.template(<%= contents %>)'))
    .pipe(DECLARE({
      namespace: 'CBB.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(CONCAT('H-templates-compiled.js'))
    .pipe(GULP.dest(paths.site.src+'/js/'));
  }

  /* ------------------------- WATCHES ------------- */

  // var watch_style = ()=>{
  //   return GULP
  //   .watch(paths.styles.src, styles)
  // }

  // var watch_dev = ()=>{
  //   return GULP
  //   .watch('../site/src/js/templates/*.handlebars', handlez_dev)
  // }

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */


 exports.img = img;
 exports.offline = offline;
 exports.stylecopy = stylecopy;
 exports.fonts = fonts;
 exports.lessen = lessen;
 exports.styles = styles;
 exports.handlez = handlez;
 exports.handlez_dev = handlez_dev;
 exports.copycss = copycss;
 exports.copyjs = copyjs;
 // exports.scripts = scripts;
 exports.views_y_models = views_y_models;
 exports.htmlmin = htmlmin;
 exports.offline = offline;

/*
 * Specify if tasks run in series or parallel using `GULP.series` and `GULP.parallel`
 */

// test for UN-indexed dcarto records
// (if any) back up extant carto
// send unindexed carto records to both dev (localhost) and prod (openshift) Solrs
// optionally backup from mlab api
// get hot episodes from -live || -news
// pull an array of extant instances for those eps
// dupe test
// if dupes, error out, else...
// send -news || -lives to local && remote solrs
// build #updates template && globals.js queries from same

// run remaining (standard) gulp tasks to build site

var develop = GULP.series(
  handlez_dev
  ,htmlmin
  ,views_y_models
  ,copyjs
  ,img
  ,copycss
  ,fonts
  ,GULP.parallel(
    browsersync
    // ,watch_dev
    )
  );//develop


var build = GULP.series(
  GULP.parallel(
    img
    ,offline
    ,stylecopy
    ,fonts
    ,lessen
    ,htmlmin
    ,views_y_models
    // ,handlez
    ) //parallel
  // ,handlez
  ,GULP.parallel(
    // styles
    // ,scripts
    // ,
    browsersync
    )//parallel
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
 // GULP.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
 // GULP.task('default', build);
 GULP.task('default', develop);