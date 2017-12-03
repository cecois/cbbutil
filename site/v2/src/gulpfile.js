var GULP = require('gulp')
,LESS = require('gulp-less')
,FS = require('fs')
,MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,CONCAT = require('gulp-concat')
,UGLIFY = require('gulp-uglify')
,BROWSERSYNC = require('browser-sync')
,DEL = require('del')
,HANDLEBARS      = require('gulp-handlebars')
,PLUMBER     = require('gulp-plumber')
,HTMLREPLACE = require('gulp-html-replace')
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
,BABEL = require('gulp-babel')
RP=require('request-promise')
;

var paths = {
  staging:"staging"
  ,interm:"../interm"
  ,site:{
    src:"./"
    ,dist:"../dist"
  }
};

var browsersync =()=>{
  BROWSERSYNC({
    // files: [
    // paths.site.src+"/js/*.js"
    // ,paths.site.src+"/*.html"
    // ]
    files: [paths.site.dist+'/*']
    // ,
    ,server: [paths.site.dist+'/']
  });
};

/* ------------------------- IMG ------------- */

var img = ()=>{
  return GULP.src(paths.site.src+"/images/**/*.{jpg,png,gif,svg}")
  .pipe(PLUMBER())
  .pipe(IMAGEMIN({ optimizationLevel: 3, progressive: true, interlaced: true }))
  // .pipe(DEBUG())
  .pipe(GULP.dest(paths.site.dist+"/images/"));
 }//img


 /* ------------------------- FONTS ------------- */
 var fonts = ()=> {
  return GULP.src(
    [
    paths.site.src+"/css/fonts/**/*.{otf,ttf}"
    ,paths.site.src+"/lib/icomoon/fonts/**/*.{eot,svg,ttf,woff}"
    // ,paths.site.src+"/lib/components/bootstrap/fonts/**/*.{eot,svg,ttf,woff}"
    ,paths.site.src+"/lib/icomoon/fonts/*.{woff,ttf,svg,eot}"
    ,paths.site.src+"/node_modules/font-awesome/fonts/*.{woff,ttf,svg,eot,woff2,otf}"
    ]
    )
  // .pipe(DEBUG())
  .pipe(GULP.dest(paths.site.dist+"/fonts/"))
};

/* ------------------------- JS ------------- */

var js_lib=  ()=>{
  return GULP.src([
    paths.site.src+"/node_modules/handlebars/dist/handlebars.runtime.min.js"
    ,paths.site.src+"/node_modules/leaflet/dist/leaflet.js"
    ,paths.site.src+"/node_modules/jquery/dist/jquery.min.js"
    // ,paths.site.src+"/node_modules/nprogress/nprogress.js"
    ,paths.site.src+"/node_modules/moment/min/moment.min.js"
    ,paths.site.src+"/node_modules/underscore/underscore-min.js"
    ,paths.site.src+"/node_modules/backbone/backbone-min.js"
    ,paths.site.src+"/node_modules/backbone.stickit/backbone.stickit.js"
    ,paths.interm+"/js/H-templates-compiled.js"
    ])
  .pipe(PLUMBER())
  .pipe(UGLIFY())
  .pipe(CONCAT('lib.min.js'))
  .pipe(GULP.dest(paths.site.dist+"/js/"));
};

var cssify = ()=>{

  return GULP.src([
    // paths.interm+"/css/*.{css}"
    paths.interm+"/css/bulma.css"
    ,paths.interm+"/css/font-awesome.min.css"
    ,paths.interm+"/css/fonts-offline.css"
    ,paths.interm+"/css/googlefont.mandali.css"
    ,paths.interm+"/css/leaflet.css"
    ,paths.interm+"/css/style.css"
    ,paths.interm+"/css/app.css"
    ])
  // .pipe(DEBUG())
  .pipe(CONCAT('cbb.min.css'))
  .pipe(CLEANCSS())
  .pipe(GULP.dest(paths.site.dist+"/css/"));

}//cssify

var js_cbb=  ()=>{
  return GULP.src([
//
paths.site.src+"/js/Util-Model.js"
,paths.site.src+"/js/Query-Model.js"
,paths.site.src+"/js/Query-View.js"
,paths.site.src+"/js/Bit-Model.js"
,paths.site.src+"/js/Slug-Model.js"
,paths.site.src+"/js/Update-Model.js"
,paths.site.src+"/js/Updates-Collection.js"
,paths.site.src+"/js/Locations-Collection.js"
,paths.site.src+"/js/Locations-View.js"
,paths.site.src+"/js/Slugs-Collection.js"
,paths.site.src+"/js/Facets-Collection.js"
,paths.site.src+"/js/Query-Facets-Collection.js"
,paths.site.src+"/js/Bits-Collection.js"
,paths.site.src+"/js/Browse-Collection.js"
,paths.site.src+"/js/BaseLayer-Model.js"
,paths.site.src+"/js/BaseLayers-Collection.js"
,paths.site.src+"/js/BaseLayers-View.js"
,paths.site.src+"/js/BaseLayersMenuItem-View.js"
,paths.site.src+"/js/BaseLayersMenu-View.js"
,paths.site.src+"/js/Activity-Model.js"
,paths.site.src+"/js/Activity-View.js"
,paths.site.src+"/js/State-Model.js"
,paths.site.src+"/js/State-View-Down-Menu.js"
,paths.site.src+"/js/Slugs-View-Panes.js"
,paths.site.src+"/js/Slugs-View-Panes-Menu.js"
,paths.site.src+"/js/Bit-View.js"
,paths.site.src+"/js/Updates-View.js"
,paths.site.src+"/js/Browse-View.js"
,paths.site.src+"/js/Bits-View.js"
,paths.site.src+"/js/Facets-View.js"
,paths.site.src+"/js/App.js"
,paths.site.src+"/js/Routes.js"
])
  .pipe(PLUMBER())
  .pipe(BABEL({ presets: ['es2015'] }))
  .pipe(UGLIFY())
  .pipe(CONCAT('cbb.min.js'))
  .pipe(GULP.dest(paths.site.dist+"/js/"));
};


/* ------------------------- STYLE ------------- */
var lessen = ()=>{

  return GULP.src(
    paths.site.src+"/css/app.less"
    )
  .pipe(LESS())
  // .pipe(DEBUG())
  // .pipe(RENAME({
  //   basename: 'zzzz'
  // }))
  .pipe(GULP.dest(paths.interm+"/css/"))
}

var copycss=  ()=>{
  return GULP.src(
    [
      // paths.site.src+"/css/banner.css"
      // ,paths.site.src+"/css/debug.css"
      // ,paths.site.src+"/css/devmarkers.css"
      paths.site.src+"/css/googlefont.mandali.css"
      ,paths.site.src+"/node_modules/leaflet/dist/leaflet.css"
      // ,paths.site.src+"/node_modules/nprogress/nprogress.css"
      ,paths.site.src+"/css/fonts/fonts-offline.css"
      ,paths.site.src+"/node_modules/font-awesome/css/font-awesome.min.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/vendor/normalize.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/off-canvas-menu.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/header.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/general.css"
      // ,paths.site.src+"/lib/components/bootstrap/docs/dist/css/bootstrap.min.css"
      ,paths.site.src+"/lib/bulma/css/bulma.css"
      ,paths.site.src+"/lib/icomoon/style.css"
      ]
      )
  .pipe(GULP.dest(paths.interm+"/css/"));
};

var offline=  ()=>{
  return GULP.src(
    [
    paths.site.src+"/offline/**"
    ]
    )
  .pipe(GULP.dest(paths.site.dist+"/offline"));
};

/* ------------------------- HTML ------------- */

var html = ()=>{
  return GULP.src(paths.site.src+"/index.html")
  .pipe(HTMLREPLACE({
    'style': {
      src: null
      ,tpl:'<link rel="stylesheet" type="text/css" href="css/cbb.min.css" >'
    }
    ,'js': {
      src: null
      ,tpl:'<script src="js/lib.min.js" type="text/javascript"></script><script src="js/cbb.min.js" type="text/javascript"></script>'
    }
  }))
  .pipe(HTMLMIN({collapseWhitespace: true}))
  .pipe(RENAME({
    basename: 'index'
  }))
  .pipe(GULP.dest(paths.site.dist+"/"))
}

var clean = ()=>{
  return DEL([
    paths.site.dist+"/*"
    ,paths.interm+"/*"
    ]
    ,{force:true}
    )
}


/* ------------------------- TEMPLATES ------------- */

var handlez = ()=>{
  console.log("handlez at "+MOMENT().format("ddd hh:mm:ss..."))
  return GULP.src(paths.site.src+'/templates/*.handlebars')
  // .pipe(DEBUG({title:'handlez:'}))
  .pipe(HANDLEBARS({handlebars:require('handlebars')}))
  .pipe(WRAP('Handlebars.template(<%= contents %>)'))
  .pipe(DECLARE({
    namespace: 'CBB.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
  .pipe(CONCAT('H-templates-compiled.js'))
  .pipe(GULP.dest(paths.interm+"/js/"));
}


/* ------------------------- WATCHES ------------- */

var watch_handlez = ()=>{
  return GULP
  .watch([
    paths.site.src+'templates/*.handlebars'
    ],
    GULP.series(
      handlez
      ,GULP.parallel(
        js_lib
        ,js_cbb
        )
      )
    )
}

var watch_js = ()=>{
  return GULP
  .watch([
    paths.site.src+"js/*.js"
    ], GULP.parallel(
      js_cbb
      ))
}

var watch_style = ()=>{
  return GULP
  .watch([
    paths.site.src+"css/*.less"
    ], GULP.parallel(
      copycss
      ,lessen
      ))
}

var watch_html = ()=>{
  return GULP
  .watch([
    ,paths.site.src+"index.html"
    ], GULP.parallel(
      htmlmin
      ))
}

var watch_og = ()=>{
  return GULP
  .watch([
    paths.site.src+"js/*.js"
    ,paths.site.src+"js/templates/*.handlebars"
    ,paths.site.src+"index.html"
    ,paths.site.src+"css/*.less"
    ], GULP.parallel(
      handlez
      ,htmlmin
      ,copyjs
      ,img
      ,copycss
      ,lessen
      ))
}


exports.img = img;
exports.fonts = fonts;
exports.lessen = lessen;
exports.handlez = handlez;
exports.copycss = copycss;
exports.cssify = cssify;
exports.offline = offline;
exports.js_lib = js_lib;
exports.js_cbb = js_cbb;
exports.fonts = fonts;
exports.html = html;
exports.clean = clean;

var develop = GULP.series(
  clean
  ,GULP.parallel(
    html
    ,fonts
    ,offline
    ,img
    // follwing get further processing
    ,handlez
    ,copycss
    ,lessen
    )
  ,GULP.parallel(
    cssify
    ,js_lib
    ,js_cbb
    )
  ,GULP.parallel(
    browsersync
    ,watch_handlez
    ,watch_js
    // ,watch_style
    // ,watch_html
    )
  );//develop

GULP.task('default', develop);
