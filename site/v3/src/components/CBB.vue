<template>
  <div class="">
    <div id="map" style="width: 100%;height: 100%;position: fixed;top: 0;right: 0;bottom: 0;left: 0;"></div>
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <!-- <section class="section"> -->
    <div id="zCBB-header" class="columns">
      <div class="column is-one-quarter">
        <div class="header-buttons columns">
          <div v-for="litem in page.linkItems" class="column">
            <div class="header-button tooltip is-tooltip-right" :data-tooltip="litem.slug"><a :class="{ active: litem.active }" :href=" litem.uri"><i :class="litem.ico"></i></a></div>
          </div NB="/column.header-button">
        </div NB="/.header-buttons">
      </div NB="/.column">
      <div id="zCBB-inputContainer" class="column">
        <div id="zCBB-inputSearch" class="field has-addons">
          <p class="control">
            <input style="" v-model="query" class="input has-text-centered is-expanded" size="50%" type="text" :placeholder="(project.loading)?'loading...':'e.g. `(huell AND crowbot)` or just `heynong`'" />
          </p>
          <p class="control">
            <a class="button" style="width:46px;border-left:none;">
              <atom-spinner style="" v-if="project.loading==true" :animation-duration="1000" :size="20" :color="'#000'"></atom-spinner>
            </a>
          </p>
          <p class="control">
            <a @click="query=null" class="button has-text-light" style="width:22px;border-left:none;">
              <i class="fa fa-circle is-size-7"></i>
            </a>
          </p>
          <p class="control">
            <a @click="getBits" class="button is-info">
              <i class="fa fa-search"></i>
            </a>
          </p>
          <p class="control">
            <a class="button is-info">
              <i class="fa fa-random"></i>
            </a>
          </p>
        </div NB="">
        <!-- <div class="field has-addons has-addons-centered">
          <div class="control">
            <input style="" v-model="query" class="input is-large is-size-5 has-text-centered is-expanded" size="50%" type="text" :placeholder="(project.loading)?'loading...':'e.g. `(huell AND crowbot)` or just `heynong`'" />
          </div>
          <div id="inputContainer" class="control">
            <a id="cbb-bt-search" class="button is-info is-large">
              <i class="fa fa-search"></i>
            </a>
          </div NB="./#inputContainer">
          <div class="control">
            <a id="cbb-bt-random" class="button is-large">
              <span class="icon is-small">
        <i class="fa fa-random"></i>
      </span>
            </a>
          </div NB="/.control">
        </div NB="./field"> -->
        <!-- <div class="field has-addons" style=""> -->
        <!-- <div class="field has-addons level">
          <div class="control level-item">
            <input style="" v-model="query" class="input is-large is-size-5 has-text-centered is-expanded" size="50%" type="text" :placeholder="(project.loading)?'loading...':'e.g. `(huell AND crowbot)` or just `heynong`'" />
          </div>
          <div id="inputContainer" class="control">
            <a id="cbb-bt-search" class="button is-info is-large">
              <i class="fa fa-search"></i>
            </a>
          </div NB="./#inputContainer">
          <div class="control">
            <a id="cbb-bt-random" class="button is-large">
              <span class="icon is-small">
        <i class="fa fa-random"></i>
      </span>
            </a>
          </div NB="/.control">
        </div NB="/.field.has-addons.level"> -->
        <!-- </div NB="./field"> -->
      </div NB="/#inputsearch.column">
      <div class="app-title column is-one-quarter"><span style="text-align:right;">{{page.title}}</span></div>
    </div NB="/#header ">
    <!-- </section> -->
    <div class="columns" id="zCBB-app-nav">
      <div class="column"><i class="fas fa-plus-square"></i>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p v-for="pane in page.panes" class="subtitle is-5 zCBB-nav-item has-text-weight-light" v-bind:class="[actives.pane==pane.slug ? 'is-active has-text-weight-bold' : '']" @click="consolelog(pane.slug);actives.pane=pane.slug">
                    {{pane.label}}<span v-if="bits.length>0 && pane.slug=='search'" class="has-badge-rounded" :data-badge="bits.length"></span>
                  </p>
                </div>
              </div NB="/.level-left">
            </nav>
          </div>
        </div NB="/#inputsearch">
      </div NB="/.columns">
      <div class="column"><i class="fas fas fa-minus-square"></i></div>
    </div NB="/.columns">
    <div class="columns" id="zCBB-throb-container">
      <div class="column has-text-centered" style="padding:0 50% 0 50%">
        <!-- <atom-spinner style="" v-if="(project.loading==true)" :animation-duration="1000" :size="20" :color="black"></atom-spinner>
 -->
      </div>
    </div NB="/#zCBB-throb-container">
    <div class="zCBB-pane columns" v-if="actives.pane=='default'">
      <div class="column">
        <p>{{this.hero}}</p>
      </div>
    </div NB="/default/home">
    <div class="zCBB-pane columns" v-if="actives.pane=='huh'">

      <div class="column is-one-fifth"></div>
      <div class="column is-one-fifth">
  <h1 class="title">What's this, now?!
  <span class="bang-inline" style="">
<span class="icom-bang" style=""></span>
  </span>
  </h1>
    <p style="">Come on, guys -- it's a searchable index of all the recurring bits from the <em><a href="http://www.earwolf.com/show/comedy-bang-bang/">Comedy Bang! Bang!</a></em> podcast.
    </p>
</div NB="/.column">

      
  <div class="column is-one-fifth">

  <h1 class="title" style="text-align:center;">
    <span class="bang-inline" style="">
  <span class="icom-bang" style=""></span>
    </span>
  Why?
  </h1>
  <p>Because <em><a href="http://www.earwolf.com/show/comedy-bang-bang/">CBB</a></em> is the best thing ever recorded. Or maybe the best thing to ever even happen at all.</p>

</div NB="/.column">

<div class="column is-one-fifth">
<h1 class="title" style="text-align:center;">Official thing?
  <span class="bang-inline" style="">
  <span class="icom-bang" style=""></span>
  </span>
</h1>
<p style="text-align:center;">Isn't, nope. Fansite.</p>
</div NB="/.column">


      
    </div NB="/huh">
    <div class="zCBB-pane columns" v-if="actives.pane=='search'">
      <div class="column">
        facets:

<div v-for="(facet, key) in this.facets.all_bits" class="tile">
  <h5 v-if="key=='doc_count'" class="is-size-7">{{facet}}</h5>
  <h5 v-if="key!=='doc_count'" class="is-size-5">{{key}}</h5>
</div NB="/.tile">

      </div NB="/.column (facets container)">
      <div class="column is-three-quarters">
        <ul>
          <li v-if="bits.length>1" v-for="bit in bits" class="box has-text-left">
            <i v-if="bit._source.bit=='Location'" style="font-size:1.1em;" class="fa fa-map-marker" />
            <span class="bit-instance">{{bit._source.instance}}</span>
            
            <div class="columns zCBB-bit-data">
              <div class="column is-1"></div>
     
<!-- Main container -->
<div class="level">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
      <p class="subtitle is-5">
      
<div style="" class='zCBB-bit-data'>
                                              <span class='tooltip is-tooltip-left' :data-tooltip="bit._source.elucidation"><a href="#" class="">{{bit._source.bit}}</a></span>
                              
                                              <span class="has-text-grey-light">({{bit._source.elucidation}})</span>
                                            </div NB="/..zCBB-bit-data">

      </p>
    </div NB="/.level-item">
    <div class="level-item">
      <div class="field has-addons">
        
      </div>
    </div>
  </div>

  <!-- Right side -->
  <div class="level-right">
    <p class="level-item"> 
                                <span style="margin-left:1em;" class="is-size-7 has-text-grey-lighter" v-if="bit._source.created_at">~{{bit._source.tstart}}&nbsp;|&nbsp;added: {{$MOMENT(bit._source.created_at).format('YYYY.MMM.Mo')}}</span> <span class="is-size-7 has-text-grey-lighter" v-if="bit._source.updated_at">&nbsp;|&nbsp;updated {{$MOMENT(bit._source.updated_at).format('YYYY.MMM.Mo')}}</span>
    </p NB="/.level-item">
  </div NB="/.level-right">
</div>

<!--               <div class="level">
                <div class="level-left"></div>
              
<div class="level-right">                            <div style="" class="level-item is-size-7 is-paddingless">
                
              </div NB="/.level-item"></div>
            </div NB="/.level"> -->


            </div NB="columns">
                <!-- <a class="tooltip is-tooltip-right " href="#">{{bit._source.episode_string}}</a> -->
                <!-- <div style="" class="is-size-7 bit-data-meta"> -->

                  <!-- <span v-if="bit._source.created_at">added: {{$MOMENT(bit._source.created_at).format('YYYY.MMM.Mo')}}</span> <span v-if="bit._source.updated_at">(updated {{$MOMENT(bit._source.updated_at).format('YYYY.MMM.Mo')}})</span> -->
                <!-- </div NB="/.bit-data-meta"> -->
            <div class="columns zCBB-bit-data-meta">
                
              <div class="column is-1"></div>
              
<!-- <div style="" class="column is-size-7 is-paddingless">
  <span class="is-size-7 has-text-grey-lighter">~{{bit._source.tstart}}</span> 
                  <span class="is-size-7 has-text-grey-lighter" v-if="bit._source.created_at">added: {{$MOMENT(bit._source.created_at).format('YYYY.MMM.Mo')}}</span> <span class="is-size-7 has-text-grey-lighter" v-if="bit._source.updated_at">(updated {{$MOMENT(bit._source.updated_at).format('YYYY.MMM.Mo')}})</span>
</div NB="/.column"> -->

<div v-if="bit._source.tags" v-bind:class="[(query && encodeURI(query.toLowerCase()).indexOf('tag%3A%22'+tag+'%22'.toLowerCase())>=0)?'is-info':'is-dark']" @click="triggerSingleFieldQuery('tag',tag)" class="zCBB-tag tag" v-for="tag in (bit._source.tags.split(','))">{{tag}}</div NB="tags">
            
            </div NB="/.columns  .zCBB-bit-data-meta">

          </li>
          <li v-else>
            big bit: {{bit._source.instance}}
          </li>
        </ul>
      </div>
    </div NB="/search">
    <div class="zCBB-pane columns" v-if="actives.pane=='browse'">
      <div class="column">
        browse c1
      </div>
      <div class="column">
        <p>browse c2</p>
      </div>
    </div NB="/browse">
    <div class="zCBB-pane columns" v-if="actives.pane=='updates'">
      <div v-for="update in updates" class="column has-text-centered">
        <div class="tile notification has-text-centered">
          <div class="columns" style="padding-left:10%;padding-right:10%;">
            <div class="column is-12">
              <h5 class="is-size-5 has-text-weight-bold">{{update.date}}</h5>
              <div class="column has-text-weight-light is-size-7">{{update.episodes_summary}}</div>
              <div v-for="report in update.reports" class="has-text-centered">
                <img :src="report.image" />
                <div class="column has-text-weight-light is-size-7"><a :href="report.ep_url">{{report.slug}}</a> ({{report.episode}})</div>
                <ul>
                  <li v-for="bit in report.bits_sum" class="is-size-6">
                    <span @click="triggerUpdateQuery(report.episode,bit.bit)" class="cbb-trigger has-badge-rounded" :data-badge="bit.count">{{bit.bit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div NB="/.columns">
        </div NB="/.tile">
        <div class="column is-1"></div>
      </div NB="/.column w tiles">
    </div NB="/updates">
    <div class="zCBB-pane columns" v-if="actives.pane=='help'">
      
<h2 class="title is-2">Help</h2>
<div>
  You need help? With this dumb, free thing?! Fine, here:
</div>

<div style="padding-top:5%;" class="tile content is-ancestor is-size-7">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">
          <h4 class="title is-4">Timestamps: <img class="" src="https://a-v2.sndcdn.com/assets/images/header/cloud@2x-e5fba46.png" style=""/> <small>v.</small> <img class="" src="http://v.fastcdn.co/t/fbd61fb6/9f77a6cf/1506364214-1020996-166x62-HOWLLogoHorizontalTeal.png" style=""/></h4>
          <p>Each record has <strong>tstart</strong> and <strong>tend</strong> timestamps - ostensibly these frame the specific instance within the episode. However, when CBB audio files were moved behind the Howl paywall, it rendered many of the timestamps incorrect - as paywalled episodes pass the edit points where commercials used to be, they're offset by however long the excised commercials were.</p><p>Timestamps can still be used to get close to the instance when listening, but they are no longer accurate enough to be used for, say, supercutting or something.</p>
        </article>

      </div NB="/.tile.is-parent">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title is-4">The Map <i class="fa fa-map-o"></i></h4>
          <p>There's a Leaflet instance under here that will display the geometries associated with any bits of type="location." Look for the <i class="fa fa-map-marker"></i> and click it to zoom the map to that location. More on that under "Locations."</p>
          <p>But a note or two about how to use said map: in an effort to reduce clutter, there are no map controls as you might find in other web maps. A zoom bar, +/-, maybe a panning control, too. None of that here - just grab the map to move it and trackpad|scroll to zoom in and out. Optionally you can shift-click+hold-drag-release in order to "select" an area of the map to which you'll immediately pan/scroll.</p>
        </article>
      </div NB="/.tile.is-parent">
    </div NB="/.tile">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h4 class="title is-4">Searching <i class="fa fa-search"></i></h4>
        <p>Basically you can just type into the box like a monkey might do it - "huell" or "fourvel" and so forth. Strictly speaking you never even have to press the search button - <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a> is fast enough to update pretty much with every character typed.</p>
        <p>But also know that whatever you type into the box gets POSTed as-is, and since Search hits against an <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a> (v5.6) index, (as with most search engines) there is <a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-query-string-query.html">some pretty advanced stuff</a> you can do if you like. To wit:</p>
      </article>
    </div NB="/.tile.is-parent">
  </div NB="/.tile">
  <!-- ******************************************** -->
  <div class="tile is-parent">
    <article class="">
      <h5 style="" class="title is-5 is-paddingless"><strong>Fields:</strong></h5>
      <dl class="content">
        <dt>find a specific bit using its full or partial value:</dt>
        <dd><a href="#" class="cbb-trigger" data-target="bit:location" data-type="">bit:location</a> or <a href="#" class="cbb-trigger" data-target="bit:topping" data-type="">bit:topping</a> <code>// for DSALW's Queen's english ("topping hat")</code></dd>

        <dt>find bits by date (added/updated):</dt>
        <dd><a href="#" class="cbb-trigger" data-target="updated_at:[2017-01-01T00:00:00Z TO 2017-01-31T23:59:59Z]" data-type="">updated_at:[2017-01-01T00:00:00Z TO 2017-01-31T23:59:59Z]</a></dd>
        <dd><small>Hint: updated_at is typically the same as created_at except when a record has been...updated. The implication is that you'll probably always want to use updated_at for any kind of date query.</small></dd>
      </dl>

    </article>


    <!-- ******************************************** -->

    <article class="">
      <h5 style="" class="title is-5 is-paddingless"><strong>Boolean stuff:</strong></h5>
      <div class="content">
        <dl>
          <dt>combine terms with either word or character operators:</dt>
          <dd><a href="#" class="cbb-trigger" data-type="" data-target="bit:location +dimello">bit:location +dimello</a></dd>
          <dd><a href="#" class="cbb-trigger" data-type="" data-target="mexico -adomian">mexico -adomian</a></dd>
          <dd><a href="#" class="cbb-trigger" data-type="" data-target='collins -bit:"Phil Collins"'>collins -bit:"Phil Collins"</a><code>//Phil Collins references beyond his Live Aid Concorde stunt</code></dd>
          <dd><a href="#" class="cbb-trigger" data-type="" data-target="where AND from AND dabney">where AND from AND dabney</a></dd>
          <dd><a href="#" class="cbb-trigger" data-type="" data-target="(wipe AND out) NOT hardcastle">(wipe AND out) NOT hardcastle</a></dd>
          <dd><small>Hint: otherwise-unqualified terms typed into the box are ANDed together by default.</small></dd>
        </dl>
      </div>
    </article>

  </div>
</div NB="/.tile.is-parent">
<div class="tile is-parent">
  <article class="tile is-child box">

   <h4 class="title is-4">Locations <i class="fa fa-map-marker"></i></h4>
   <p>One of the bits is special (and in fact the original impetus of this entire effort). For <a href='#' class='cbb-trigger' data-type='bit' data-target='Location'>bits="Location"</a> the results will appear in the picklist (indicated by a map pin icon) <em>and</em> on the map under what you're reading now (hidden behind the main content area by default).</p><p>The ctrl key will toggle the map's visibility (as will the <i class="fa fa-map-o"></i> button); the <i style="" class="fa fa-map-marker"></i> in the search results will zoom to that instance's referenced location. <a href="#" class='cbb-trigger' data-type="" data-target='bit:Location +tags:"huell howser"'>Huell Howser</a>, <a href="#" class='cbb-trigger' data-type="" data-target='bit:Location +tags:"gino lambardo"'>Gino Lambardo</a>, <a href="#" class='cbb-trigger' data-type="" data-target='bit:Location +tags:"merrill shindler"'>Merrill Shindler</a>, and <a href="#" class='cbb-trigger' data-type="" data-target='bit:Location +tags:"shelly driftwood"'>Shelly Driftwood</a> are all good for at least a few.</p>

   <p>Another thing to note about locations is that unless there's a clamor for it we do NOT spatially-index the geometries for retrieval. So while of course you can query for <em>bits</em> that reference locations (and those referenced geometries will appear on the map with minimal interaction), we're not bothering to offer the ability to, say, zoom/pan the map and query for locations <em>in that area</em>. Like, who cares?</p><p>If somebody really wants that (or the tangential ability to query for bits that reference, say, the Boston area or Marina del Rey, maybe <a class="twitter-share-button" href="https://twitter.com/share" data-size="large" data-text="custom share text" data-url="https://dev.twitter.com/web/tweet-button" data-hashtags="comedybangbang,zapstraighttoit" data-via="twitterdev"><i class="fa fa-twitter"></i> say something</a>. But really if you're <em>that interested</em> you could just query for everything (<a href="#" class="cbb-trigger" data-type="" data-target="bit:location">"bit:Location"</a>) and zoom to the spot about which you're curious.</p>

 </article>
</div NB="/.tile.is-parent">

    </div NB="/help">
    <footer class="footer">
      <div class="level">
        <div v-for="msg in console.msgs" class="level-item has-text-left">
          <span class="msg.c">{{msg.m}}</span>
        </div>
      </div>
    </footer NB="/.footer">
  </div>
</template>

<script>
import CONFIG from '../Config.json'
import updates from '../assets/updates.json'
import { AtomSpinner } from 'epic-spinners'

export default {
  components: {
    AtomSpinner
  },
  name: "CBB-GUI",
  created: function() {
    this.CONFIG = CONFIG
    // this.bootstrap()
    // this.project.loading = true
    this.query = (this.$route.params.query) ? this.$route.params.query : null
    this.actives = {
      pane: (this.$route.params.pane) ? this.$route.params.pane : 'default',
      basemap: (this.$route.params.basemap) ? this.$route.params.basemap : null,
      updatekey: (this.$route.params.updatekey) ? this.$route.params.updatekey : null
    }
    this.updates = (this.actives.updatekey) ? null : __.last(__.sortBy(__.map(updates, (u) => {
      let uo = u;
      uo.sorter = new Date(u.date)
      return uo
    }), 'sorter').reverse(), 3);
    
    var mess = "CBB-GUI";
    
    this.msg = mess.toUpperCase();
    setInterval(() => {
      this.wipeConsole()
    }, 30000)
  },
  mounted: function() {
    this.console.msgs.push({ m: "mounted", c: "" });
    this.getBits()
    this.getFacets()
    
      
      if (!this.MAP) {
      this.MAP = new L.Map("map", {
        zoomControl: false,
        center: [51.505, -0.09],
        attributionControl: false,
        zoom: 2
      });
    }

    let uri = (this.actives.basemap) ? this.actives.basemap.uri : this.$_.findWhere(this.basemaps, { handle: 'default' }).uri
    if (this.CONFIG.mode == 'T') { uri = 'http://localhost:8000/tile-T.png' }
    this.MAP.addLayer(new L.TileLayer(uri))

  },
  data() {
    return {
      hero: null,
      updates: null,
      query: null,
      bits: [],
      facets: [],
      page: {
        title: "CBB.BITMAP.v3: <something goes here>",
        splayed: false,
        panes: [{
          label: 'Home',
          slug: 'default'
        }, { label: 'Huh?', slug: 'huh' }, { label: 'Search', slug: 'search' }, { label: 'Browse', slug: 'browse' }, { label: 'Updates', slug: 'updates' }, { label: 'Help', slug: 'help' }]
      },
      project: { loading: false, shorthand: "CbBBtMp" },
      CONFIG: null,
      console: { msgs: [] },
      modalClass: false,
      incoming: null,
      MAP: null,
      basemaps: [
        { "name": "hi im name", "handle": "default", "uri": "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" }
      ],
      actives: { basemap: null, pane: 'default', updatekey: null }
    };
  },
  methods: {
    triggerUpdateQuery: function (ep,bt) {
this.query='(episode:'+ep+' AND bit:"'+bt+'")'
this.getBits()
    },
    triggerSingleFieldQuery: function (f,v) {
this.query=f+':"'+v+'"'
this.getBits()
    },
    consolelog: function (cl) {
console.log(cl)
    },
    TEST: function() {

      let Q = { "size": 10000, "query": { "query_string": { "default_operator": "AND", "query": "(episode:594) AND holding:false" } }, "aggregations": { "all_bits": { "global": {}, "aggregations": { "tags": { "filter": { "query_string": { "default_operator": "AND", "query": "(episode:594) AND holding:false" } }, "aggregations": { "filtered_tags": { "terms": { "size": 10000, "field": "tags.comma_del" } } } }, "bits": { "filter": { "query_string": { "default_operator": "AND", "query": "(episode:594) AND holding:false" } }, "aggregations": { "filtered_bits": { "terms": { "size": 10000, "field": "bit.keyword" } } } }, "episodes": { "filter": { "query_string": { "default_operator": "AND", "query": "(episode:594) AND holding:false" } }, "aggregations": { "filtered_episodes": { "terms": { "size": 10000, "field": "episode.keyword" } } } } } } } }

      this.project.loading = true
      axios
        .get(this.CONFIG.prod.elastic_bits, Q)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting bits w/ axios POST..." : null
          );

          this.project.loading = false

          console.log(response)

        }) //axios.then
        .catch(e => {
          this.project.loading = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch


      // } //else.this.query

    },
    getUpdates: function() {

      let u = (this.updatekey) ? this.updatekey : '';
      console.log("updatekey:", this.updatekey);
      let qs = (this.CONFIG.mode == '33') ? this.CONFIG.prod.atlas_updates + u : this.CONFIG.dev.atlas_updates;



    },
    getHero: function() {

let QS = null;

      QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + '["updated_at":"2019-01-01" TO "updated_at":"2019-05-05"]' : this.CONFIG.dev.elastic_bits;

      
      QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + this.query : this.CONFIG.dev.elastic_bits;
      axios
        .get(QS)
        .then(response => {
          this.project.loading = false
// console.log("hits:",response.data.hits.hits)
          this.hero = this.$_.first(response.data.hits.hits)

        }) //axios.then
        .catch(e => {
          this.project.loading = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch



    },getBits: function() {
      
      this.project.loading=true;

let QS = null;

      if (!this.query || this.query=='') { 
        // query is empty - we'll send out for just a sampling
      this.console.msgs.push({ m: "querying for default... ...", c: "" })

      QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + '["updated_at":"2019-01-01" TO "updated_at":"2019-05-05"]' : this.CONFIG.dev.elastic_bits;
      console.log("QS:",QS)
      } else {

      this.console.msgs.push({ m: "querying for " + this.query, c: "" })
      this.project.loading = true
      QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + this.query : this.CONFIG.dev.elastic_bits;
      } //else.this.query

      // console.log("QS:",QS)
      axios
        .get(QS)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting bits w/ axios response..." : null
          );

          
          // console.log("RESP:",response)

          this.bits = response.data.hits.hits

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.project.loading = false
        })


      

    },getFacets: function() {


      this.console.msgs.push({ m: "facetizing " + this.query, c: "" })
      this.project.loading = true
      let QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_facets + this.query : this.CONFIG.dev.elastic_facets;
      axios
        .get(QS)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting facets w/ axios response..." : null
          );

          this.project.loading = false

          this.facets = response.data.aggregations

        }) //axios.then
        .catch(e => {
          this.project.loading = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch

    },
    wipeConsole: function() {
      // console.log("wip9ing concolse...")
      this.console.msgs = [];
    },
    bootstrap: function() {
      console.log('bootstrapping in mode: ' + this.CONFIG.mode)
      // let s0 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/axios.min.js' : 'https://AXIOS.js'
      // let j0 = document.createElement('script');
      // j0.src = s0;
      // j0.async = false;
      // j0.type = 'text/javascript';
      // document.body.appendChild(j0)
      // let s1 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/leaflet.js' : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.js'
      // let j1 = document.createElement('script');
      // j1.src = s1;
      // j1.async = false;
      // j1.type = 'text/javascript';
      // document.body.appendChild(j1)
      // let s2 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/all.js' : 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'
      // let j2 = document.createElement('script');
      // j2.src = s2;
      // j2.async = false;
      // j2.type = 'text/javascript';
      // document.body.appendChild(j2)

      //HERE GOES HOME HERO PULL - FIRST DB BIT W/ HERO:TRUE
    },
    setRoute: function() {

        // /:pane?/:query?/:basemap?/:update?
        this.$router.push({
          params: {
            pane: this.actives.pane,
            query: (this.query!=='')?this.query:'*',
            basemap: this.actives.basemap,
            updatekey: this.actives.updatekey
          }
        }); //rejplace
      } //setRoute
      
  } //methods
  ,
  watch: {
    // 'active': { handler: function (vnew) { this.setActive(vnew) } } //active // ,
    "actives": {
      deep:true,
      handler: function(vnew, vold) {
        this.setRoute();
      }
    },"query": {
      handler: function(vnew, vold) {
        let s = 'tag:"bob ducca"'.toLowerCase()
        console.log('s:',s)
        console.log(indexOf(s))
        this.setRoute();
      }
    }
  } //watch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
