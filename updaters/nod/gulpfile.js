var GULP = require('gulp')
,LESS = require('gulp-less')
,FS = require('fs')
// ,MONGOCLIENT = require('mongodb').MongoClient
// ,MONGO = require('mongo-async')
,__ = require('underscore')
,CONCAT = require('gulp-concat')
,UGLIFY = require('gulp-uglify')
,BROWSERSYNC = require('browser-sync')
,HANDLEBARS      = require('gulp-handlebars')
,HBC      = require('handlebars')
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
  ,backup:'bu/'

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

var send = async ()=>{

  return new Promise((resolve,reject)=>{

// we'll read incoming bits here
console.log("reading incoming...")

// we'll throw fresh bits to local solr here
console.log("sending locally...")

// then, pending success (failure might indicate a syntax issue), post to mlab
console.log("sending to mlab...")

// then resolve/reject
var nb= 99;

console.log("fake count:",nb)

if(nb>0){
  resolve();} else{
    reject("fewer than 0 bits made it to mlab")
  }

})//promise

}//send

var audit = async ()=>{


  return new Promise((resolve, reject) => {
    var filbu = paths.jsons.dest+"bu.json"
    FS.readFile(filbu,async (e,d)=>{
      if(e){reject(e)}
        else
        {
          var ext = __.map(JSON.parse(d),(b)=>{

            return {
              "episode":b.episode
              ,"finder":b.episode+b.instance+b.bit+b.tags
            }

          });


          try {

            FS.readFile('../cbb-news-json.json',async (e,d)=>{
              if(e){reject(e)}
                else
                {
                  var inc = __.map(JSON.parse(d),(b)=>{

                    return {
                      "episode":b.episode,
                      "show":b.show,
                      "tstart":b.tstart,
                      "tend":b.tend,
                      "instance":b.instance,
                      "bit":b.bit,
                      "elucidation":b.elucidation,
                      "tags":b.tags,
                      "location_type":b.location_type,
                      "location_id":b.location_id,
                      "updated_at":b.updated_at,
                      "url_soundcloud":b.url_soundcloud,
                      "created_at":b.created_at,
                      "slug_soundcloud":b.slug_soundcloud,
                      "slug_earwolf":b.slug_earwolf,
                      "episode_title":b.episode_title,
                      "episode_guests":b.episode_guests,
                      "id_wikia":b.id_wikia,
                      "holding":b.holding
                      ,"finder":b.episode+b.instance+b.bit+b.tags
                    }

          });//map

                  var du = __.intersection(__.pluck(inc,'finder'), __.pluck(ext,'finder'));

                  console.log("duplicate count:")
                  console.log(du.length)
                  if(du.length>0){
                    reject("duplicates found")
                  } else{
                    resolve();}
                  }

  })//readfile2

          }
          catch (error) {
            reject(error)
          }
        }

  })//readfile1
  });//promise


}//audit

var test = async()=>{

  return new Promise((resolve, reject) => {
    console.log("whats comin in ",filin)
    resolve(1);
  });

}//test

var render = async ()=>{


  return new Promise((resolve, reject) => {
    var filin = '../cbb-news-json.json'
    FS.readFile(filin,async (e,d)=>{
      if(e){reject(e)}
        else
        {

          var raw = JSON.parse(d);
          // var eps = __.unique(__.pluck(raw,'episode'))
          var eps = __.first(__.unique(__.pluck(raw,'episode')),10)

          var R = {}
          R.date = MOMENT().format('YYYY.MMM.DD')
          R.eps = []
          R.count = eps.length

          __.each(eps,(ep)=>{

            var er = {episode:ep}
            var bfe = __.filter(raw,(e)=>{return e.episode==ep});
            er.bits = __.countBy(bfe,'bit')

            R.eps.push(er)

          })//each.eps

          R.epstring = eps.join(", ")+":"

          var source = "<div class='pull-left col-sm-12'><h3>{{date}}</h3><div style='padding-bottom:10px;'>{{count}} from episodes {{epstring}}{{#each eps}}<ul><h4>from ep.{{this.episode}}:</h4>{{#each this.bits}}"
          +"<li><a href='#query/episode:{{../episode}} AND bit:%22{{@key}}%22'>{{this}} {{@key}}</a></li>"
          +"{{/each}}</ul>{{/each}}</div></div>";

          var template = HBC.compile(source);

          var result = template(R);

          // console.log(result)
          // console.log(JSON.stringify(R))

          resolve(R)
        }

  })//readfile1
  });//promise


}//globals

var write_extant_bits = async ()=>{

  var url = "https://api.mlab.com/api/1/databases/"+CONFIG.mongodb+"/collections/"+CONFIG.mongocollx+"?apiKey="+CONFIG.mongokey+"&l=2"

  const options = {method: 'GET',json: true,uri: url};

  try {
    const response = await RP(options);

// first  we reduce clutter
var cleand = __.map(response,(d)=>{

  return {"_id": d._id,
  "episode": d.episode,
  "show":d.show,
  "tstart":d.tstart,
  "tend":d.tend,
  "instance":d.instance,
  "bit":d.bit,
  "location_type":d.location_type,
  "location_id":d.location_id,
  "updated_at":d.updated_at,
  "elucidation":d.elucidation,
  "url_soundcloud":d.url_soundcloud,
  "tags": d.tags,
  "created_at":d.created_at,
  "slug_soundcloud":d.slug_soundcloud,
  "slug_earwolf":d.slug_earwolf,
  "episode_title":d.episode_title,
  "episode_guests":d.episode_guests,
  "id_wikia":d.id_wikia,
  "holding":d.holding
}

})//map

console.log("writing "+cleand.length+" extant bits...")

// then  write to a file we can compress and store
var fil = paths.jsons.dest+"bu.json"
FS.writeFile(fil,JSON.stringify(cleand),async (e)=>{
  if(e){throw e};
  return fil;
})

}
catch (error) {
  console.log(error);
  return false;
}

}//write_extant_bits

var backupf = async()=>{

  var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
  console.log("backing up runid:"+runid+"...");
  // var bud = paths.backup+"/"+runid;
  // var buf = "bu.json";
  // var but = bud+".tar";

  var options = {
    uri: 'https://api.mlab.com/api/1/databases/cbbbits/collections/bits',
    qs: {
      apiKey:CONFIG.mongokey
        // ,q: '{ $or: [ { "episode": 498 }, { "episode": 498 } ] }' // -> uri + '?access_token=xxxxx%20xxxxx'
        // ,q: '{ $or: '+JSON.stringify(eps)+' }' // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
    json: true // Automatically parses the JSON string in the response
  }

  try {
    const response = await RP(options);

    const gzip = ZLIB.createGzip();
    const inp = FS.createReadStream(response);
    const out = FS.createWriteStream(paths.backup+"/"+runid+".gz");

    inp.pipe(gzip).pipe(out);

    return Promise.resolve();
  }
  catch (error) {
    return Promise.reject(error);
  }

}//backup

var backup = async ()=>{

  var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
  console.log("backing up runid:"+runid+"...");
  var bud = paths.backup+runid;
  console.log("bud is ",bud);
  var buf = "bu.json";

  console.log("awaiting mongoset...");
  // var mongoset = await write_extant_bits();

  const gzip = ZLIB.createGzip();
  const inp = FS.createReadStream(paths.jsons.dest+"bu.json");
  const out = FS.createWriteStream(paths.backup+runid+".gz");
  inp.pipe(gzip).pipe(out);

}//backup

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
 exports.audit = audit;

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

var build = GULP.series(
// clean,
// write_extant_bits,
// backup
audit
,send
// ,render
// ,test
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