var GULP = require('gulp')
,LESS = require('gulp-less')
,FS = require('fs')
// ,MONGOCLIENT = require('mongodb').MongoClient
// ,MONGO = require('mongo-async')
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
,MOMENT = require('moment')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,ZLIB = require('zlib')
RP=require('request-promise')
;

// var url = 'mongodb://'+CONFIG.mongouser+':'+CONFIG.mongopsswd+'@'+CONFIG.mongohost+':'+CONFIG.mongoport+'/'+CONFIG.mongodb;


var paths = {
  staging:"staging"
  ,backup:"backup"
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
    files: ['../_site' + '/**']
    ,server: {
      baseDir: '../_site'
    }
  });
};

var clean = ()=>{
  console.log("cleaning "+paths.jsons.dest+"...");
  return DEL([
    paths.jsons.dest+"/*"
    ]);
}

/* ------------------------- BACKUP ------------- */

// var test = async function () {
//   return await MongoClient.connect(url);
// }

var write_extant_bits = async ()=>{


// https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey

// Optional parameters
// [q=<query>][&c=true][&f=<fields>][&fo=true][&s=<order>][&sk=<skip>][&l=<limit>]

var url = "https://api.mlab.com/api/1/databases/"+CONFIG.mongodb+"/collections/"+CONFIG.mongocollx+"?apiKey="+CONFIG.mongokey+"&l=2"

const options = {method: 'GET',json: true,uri: url};

try {
  const response = await RP(options);

  var fil = paths.jsons.dest+"bu.json"
  FS.writeFile(fil,JSON.stringify(response),async (e)=>{
    if(e){throw e};
  })

  return fil;
}
catch (error) {
  console.log(error);
  return false;
}


}//write_extant_bits


var backup = async (f)=>{

  var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
  console.log("backing up runid:"+runid+"...");
  var bud = paths.backup+"/"+runid;
  var buf = "bu.json";
  var but = bud+".tar";

  console.log("awaiting mongoset...");
  var mongoset = await write_extant_bits();


  FS.mkdir(bud, null, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("madedir "+bud+" - time to fill it with bits");

      const gzip = ZLIB.createGzip();
      const inp = FS.createReadStream(paths.jsons.dest+"bu.json");
      const out = FS.createWriteStream(bud+"/"+buf+".gz");

      inp.pipe(gzip).pipe(out);

}

}); //mkdir


}

/* ------------------------- IMG ------------- */

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
      namespace: 'CBB.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(CONCAT('H-templates-compiled.js'))
    .pipe(GULP.dest('src-scripts/'));
  }

  /* ------------------------- WATCHES ------------- */

  var watch_style = ()=>{
    return GULP
    .watch(paths.styles.src, styles)
  }

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
 exports.clean = clean;
 exports.backup = backup;
 exports.write_extant_bits = write_extant_bits;

/*
 * Specify if tasks run in series or parallel using `GULP.series` and `GULP.parallel`
 */

// test for UN-indexed dcarto records
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
// clean any leftover stuff
  clean,
// back up extant mongo
  backup
  ,clean
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