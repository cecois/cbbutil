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

/*
------------------------ TASKS
Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */

 var browsersync_dev =()=>{
  BROWSERSYNC({
    files: ['../site/src/js/models/**/*','../site/src/js/views/**/*','../site/src/js/*.js','!../site/src/js/H-templates-compiled.js']
    ,server: {
      baseDir: paths.site.src
    }
  });
};

var browsersync_dist =()=>{
  BROWSERSYNC({
    files: [paths.site.dist + '/**']
    ,server: {
      baseDir: paths.site.dist
    }
  });
};

var clean = ()=>{
  console.log("cleaning...");
  return DEL([
    paths.site.dist+"/*"
    ,paths.staging+"/*"
    ],{force:true});
}

var mongify = async ()=>{

  return new Promise((resolve,reject)=>{
    FS.readFile('../cbb-news-json.json',async (e,d)=>{
      if(e){reject(e)}
        else
        {


          var docs = __.first(JSON.parse(d),2);
          
          const url = 'mongodb://localhost/cbbbits'
          
          MONGO.connect(url, function(err, db) {
            var col = db.collection('bits');
            col.insertMany(docs).then((r)=>{
              db.close();
              resolve(r);
            });

          });


}//else

  })//readfile

})//promise

}//mongify

var solrfy = async ()=>{

  return new Promise((resolve,reject)=>{

// we'll read incoming bits here
console.log("reading incoming...")

var options = {
  host : "localhost",
  port : "8983",
  core : "cbb_bits",
  path : "/solr",
  solrVersion: "4.10.2"
};

var client = SOLR.createClient(options);

// Switch on "auto commit", by default `client.autoCommit = false`
client.autoCommit = true;

FS.readFile(paths.staging+"/bu.json",async (e,d)=>{
  if(e){reject(e)}
    else
    {


      var docs = __.first(JSON.parse(d),2);
// Add documents
client.add(docs,function(err,obj){
 if(err){
  console.log(err);
  reject(err)
}else{
  console.log(obj);
  resolve(obj)
}
});//add

}//else

  })//readfile

})//promise

}//solrfy

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
                      // "url_soundcloud":b.url_soundcloud,
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


var render_update_copy = async ()=>{


  return new Promise((resolve, reject) => {
    var filin = '../cbb-news-json.json'
    FS.readFile(filin,async (e,d)=>{
      if(e){reject(e)}
        else
        {

          var raw = JSON.parse(d);
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

          console.log(result)
          // console.log(JSON.stringify(R))
          FS.writeFile(paths.staging+"/update.html",result,async (e)=>{
            if(e){reject(e);}
            else{
              resolve(R)
        }//else
          });//writefile


        }

  })//readfile1
  });//promise


}//render_update_copy

var write_extant_bits = async ()=>{

  var url = "https://api.mlab.com/api/1/databases/"+CONFIG.mongodb+"/collections/"+CONFIG.mongocollx+"?apiKey="+CONFIG.mongokey+"&l=2"

  const options = {method: 'GET',json: true,uri: url};

  try {
    const response = await RP(options);

// first  we reduce clutter
var cleand = __.map(response,(d)=>{

  return {"_id": d._id.$oid,
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
  // "url_soundcloud":d.url_soundcloud,
  "tags": d.tags,
  "created_at":d.created_at,
  "slug_soundcloud":d.slug_soundcloud,
  "slug_earwolf":d.slug_earwolf,
  "episode_title":d.episode_title,
  "guests":d.episode_guests,
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

// var backupf = async()=>{

//   var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
//   console.log("backing up runid:"+runid+"...");
//   // var bud = paths.backup+"/"+runid;
//   // var buf = "bu.json";
//   // var but = bud+".tar";

//   var options = {
//     uri: 'https://api.mlab.com/api/1/databases/cbbbits/collections/bits',
//     qs: {
//       apiKey:CONFIG.mongokey
//         // ,q: '{ $or: [ { "episode": 498 }, { "episode": 498 } ] }' // -> uri + '?access_token=xxxxx%20xxxxx'
//         // ,q: '{ $or: '+JSON.stringify(eps)+' }' // -> uri + '?access_token=xxxxx%20xxxxx'
//       },
//       headers: {
//         'User-Agent': 'Request-Promise'
//       },
//     json: true // Automatically parses the JSON string in the response
//   }

//   try {
//     const response = await RP(options);

//     const gzip = ZLIB.createGzip();
//     const inp = FS.createReadStream(response);
//     const out = FS.createWriteStream(paths.backup+"/"+runid+".gz");

//     inp.pipe(gzip).pipe(out);

//     return Promise.resolve();
//   }
//   catch (error) {
//     return Promise.reject(error);
//   }

//}//backup

var backup = async ()=>{

  var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
  console.log("backing up runid:"+runid+"...");
  var bud = paths.backup+runid;
  console.log("bud is ",bud);
  var buf = "bu.json";


  const gzip = ZLIB.createGzip();
  const inp = FS.createReadStream(paths.jsons.dest+"bu.json");
  const out = FS.createWriteStream(paths.backup+runid+".gz");
  inp.pipe(gzip).pipe(out);

}//backup

/* ------------------------- IMG ------------- */

var img = ()=>{
  return GULP.src(paths.site.src+"/images/**/*.{jpg,png,gif,svg}")
  .pipe(PLUMBER())
  .pipe(IMAGEMIN({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(DEBUG())
  .pipe(GULP.dest(paths.site.dist+"/images/"));
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
  .pipe(GULP.dest(paths.site.dist+"/offline"))
};


var stagestyle = ()=> {
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
    ,paths.site.src+"/lib/leaflet-history.css"
    ,paths.site.src+"/lib/icomoon/style.css"
    ]
    )
  .pipe(DEBUG())
  .pipe(GULP.dest(paths.styles.staging))
};

var stagejs = ()=> {
  return GULP.src(
    [
    paths.site.src+"/lib/components/handlebars/handlebars.runtime.min.js"
    ,paths.site.src+"/lib/moment.js"
    ,paths.site.src+"/lib/octokat.js"
    ,paths.site.src+"/lib/components/throbber.js/throbber.js"
    ,paths.site.src+"/lib/less-1.7.5.min.js"
    ,paths.site.src+"/js/globals-dist.js"
    ,paths.site.src+"/lib/leaflet/leaflet.js"
    ,paths.site.src+"/lib/tile.stamen.js"
    ,paths.site.src+"/lib/components/jquery/jquery.min.js"
    ,paths.site.src+"/lib/jquery.liveFilter.js"
    ,paths.site.src+"/lib/Wicket/wicket.js"
    ,paths.site.src+"/lib/leaflet-history.js"
    ,paths.site.src+"/lib/Wicket/wicket-leaflet.js"
    ,paths.site.src+"/lib/nprogress.js"
    ,paths.site.src+"/lib/bootstrap.min.js"
    ,paths.site.src+"/lib/underscore-min.js"
    ,paths.site.src+"/lib/backbone-min.js"
    ,paths.site.src+"/js/models.js"
    ,paths.site.src+"/js/views/ActivityView.js"
    ,paths.site.src+"/js/views/BaseLayerMenuItemView.js"
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
    ]
    )
  .pipe(DEBUG())
  .pipe(GULP.dest(paths.staging+"/js/"))
};


/* ------------------------- JS ------------- */


var scripts = ()=>{
  return GULP.src([
    paths.staging+"/js/handlebars.runtime.min.js"
    ,paths.staging+"/js/H-templates-compiled.js"
    ,paths.staging+"/js/moment.js"
    ,paths.staging+"/js/octokat.js"
    ,paths.staging+"/js/throbber.js"
    ,paths.staging+"/js/less-1.7.5.min.js"
    ,paths.staging+"/js/globals-dist.js"
    ,paths.staging+"/js/leaflet.js"
    ,paths.staging+"/js/tile.stamen.js"
    ,paths.staging+"/js/jquery.min.js"
    ,paths.staging+"/js/jquery.liveFilter.js"
    ,paths.staging+"/js/wicket.js"
    ,paths.staging+"/js/leaflet-history.js"
    ,paths.staging+"/js/wicket-leaflet.js"
    ,paths.staging+"/js/nprogress.js"
    ,paths.staging+"/js/bootstrap.min.js"
    ,paths.staging+"/js/underscore-min.js"
    ,paths.staging+"/js/backbone-min.js"
    ,paths.staging+"/js/models.js"
    ,paths.staging+"/js/ActivityView.js"
    ,paths.staging+"/js/BaseLayerMenuItemView.js"
    ,paths.staging+"/js/BaseLayersMenuView.js"
    ,paths.staging+"/js/BaseLayersView.js"
    ,paths.staging+"/js/BaseMapView.js"
    ,paths.staging+"/js/CartoCollxCountView.js"
    ,paths.staging+"/js/BitsView.js"
    ,paths.staging+"/js/BitsCountView.js"
    ,paths.staging+"/js/CartoCollxView.js"
    ,paths.staging+"/js/CartoListView.js"
    ,paths.staging+"/js/ConsoleView.js"
    ,paths.staging+"/js/EpisodesView.js"
    ,paths.staging+"/js/EpisodeView.js"
    ,paths.staging+"/js/RecentsView.js"
    ,paths.staging+"/js/FacetsView.js"
    ,paths.staging+"/js/StatesView.js"
    ,paths.staging+"/js/SharesView.js"
    ,paths.staging+"/js/HuhView.js"
    ,paths.staging+"/js/UpdateView.js"
    ,paths.staging+"/js/HelpView.js"
    ,paths.staging+"/js/MethodView.js"
    ,paths.staging+"/js/PopupView.js"
    ,paths.staging+"/js/QuerySubNavView.js"
    ,paths.staging+"/js/QueryView.js"
    ,paths.staging+"/js/SolrFieldzView.js"
    ,paths.staging+"/js/app.js"
    ,paths.staging+"/js/routes.js"
    ])
  .pipe(PLUMBER())
  .pipe(UGLIFY())
  .pipe(CONCAT('app.min.js'))
  .pipe(GULP.dest(paths.site.dist+"/js/"))
}


var lessen = ()=>{

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
    ,paths.styles.staging+"/leaflet-history.css"
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
  return GULP.src(paths.site.src+"/index-dist.html")
  .pipe(HTMLMIN({collapseWhitespace: true}))
  .pipe(RENAME({
    basename: 'index'
  }))
  .pipe(GULP.dest(paths.site.dist))
}

  // var copyjs=  ()=>{
  //   return GULP.src([
  //     'src-scripts/App.js'
  //     ,'src-scripts/Routes.js'
  //     ])
  //   .pipe(GULP.dest(paths.scripts.dest));
  // };

  var stage=  ()=>{
    return GULP.src(paths.jsons.src)
    .pipe(GULP.dest(paths.jsons.dest));
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

  var watch_style = ()=>{
    return GULP
    .watch(paths.styles.src, styles)
  }

  var watch_dev = ()=>{
    return GULP
    .watch('../site/src/js/templates/*.handlebars', handlez_dev)
  }

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
 exports.clean = clean;
 exports.write_extan
 t_bits = write_extant_bits;
 exports.backup = backup;
 exports.audit = audit;
 exports.mongify = mongify;
 exports.solrfy = solrfy;
 exports.lessen = lessen;
 exports.styles = styles;
 exports.handlez = handlez;
 exports.handlez_dev = handlez_dev;
 exports.stagejs = stagejs;
 exports.scripts = scripts;
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
  ,browsersync_dev
  ,watch_dev
  );//develop

var build = GULP.series(
  clean,
// write_extant_bits,
// backup
// audit,
// mongify
// write_extant_bits
// solrfy
// render_update_copy
// ,test
  // clean //clean out stagin area
  GULP.parallel(
    img,
    lessen
    ,offline
    ,stagestyle
    ,handlez
    ,stagejs
    ,htmlmin
    ) //parallel
  // ,handlez
  ,GULP.parallel(
    styles
    ,scripts
    ,browsersync_dist
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
 GULP.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
 // GULP.task('default', build);
 GULP.task('default', develop);