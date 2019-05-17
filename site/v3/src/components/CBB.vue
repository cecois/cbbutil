<template>
  <div class="">
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
              <atom-spinner style="" v-if="(project.loading==true)" :animation-duration="1000" :size="20" :color="'#000'"></atom-spinner>
            </a>
          </p>
          <p class="control">
            <a class="button is-info">
              <i class="fa fa-search"></i>
            </a>
          </p>
          <p class="control">
            <a class="button is-info">
              <i class="fa fa-random"></i>
            </a>
          </p>
        </div>
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
    <div class="columns">
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
                  <p v-for="pane in page.panes" class="subtitle is-5 zCBB-nav-item" v-bind:class="[actives.pane==pane.slug ? 'is-active' : '']" @click="(actives.pane=pane.slug)">
                    {{pane.label}} <span v-if="bits.length>0 && pane.slug=='search'" class="has-badge-rounded" :data-badge="bits.length"></span>
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
        <p>default pane c1</p>
      </div>
      <div class="column">
        default pane c2
      </div>
    </div>
    <div class="zCBB-pane columns" v-if="actives.pane=='huh'">
      <div class="column">
        huh c1
      </div>
      <div class="column">
        <p>huh c2</p>
      </div>
    </div NB="/huh">
    <div class="zCBB-pane columns" v-if="actives.pane=='search'">
      <div class="column">
        facets
      </div>
      <div class="column is-three-quarters">
        <ul>
          <li v-for="bit in bits">
            <i v-if="bit._source.bit=='Location'" style="font-size:1.3em;" class="fa fa-map-marker" />
            <span class="bit-instance">{{bit._source.instance}}</span>
            <div class="columns">
              <div style="" class='column bit-data'>
                <span class='tooltip is-tooltip-left' :data-tooltip="bit._source.elucidation"><a href="#" class="">{{bit._source.bit}}</a></span> | <a class="tooltip is-tooltip-right " href="#">{{bit._source.episode_string}}</a> ~{{bit._source.tstart}} | <span @click="bit._is_meta_visible=!bit._is_meta_visible" class="cbb-bit-meta-bt icon" v-bind:class="bit._is_meta_visible?'is-visiblizing':''"><i class="fa fa-caret-right is-size-7"></i></span>
                <div style="" class='' v-bind:class="bit._is_meta_visible?'':'is-invisible'">
                  ( added: {{bit._source.created}} [updated {{bit._source.updated}}] | tagged: {{bit._source.tags}} | elucidation: {{bit._source.elucidation}})
                </div>
                <!-- /.bit-data-meta -->
              </div>
              <!-- /.bit-data -->
            </div>
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
      <div class="column">
        updates c1
      </div>
      <div class="column">
        <p>updates c2</p>
      </div>
    </div NB="/updates">
    <div class="zCBB-pane columns" v-if="actives.pane=='help'">
      <div class="column">
        help c1
      </div>
      <div class="column">
        <p>help c2</p>
      </div>
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
import { AtomSpinner } from 'epic-spinners'

export default {
  components: {
    AtomSpinner
  },
  name: "CBB-GUI",
  methods: {

    SS: function() {

    }

  },
  created: function() {
    this.CONFIG = CONFIG
    this.project.loading = true
    this.query = (this.$route.params.query) ? this.$route.params.query : null
    this.actives = {
      pane: (this.$route.params.pane) ? this.$route.params.pane : 'default',
      basemap: (this.$route.params.basemap) ? this.$route.params.basemap : null,
      update: (this.$route.params.update) ? this.$route.params.update : null
    }
    this.bootstrap()
    var mess = "CBB-GUI";
    if (!this.MAP) {
      this.MAP = new L.Map("map", {
        zoomControl: false,
        center: [51.505, -0.09],
        attributionControl: false,
        zoom: 2
      });
    }
    this.msg = mess.toUpperCase();
    setInterval(() => {
      this.wipeConsole()
    }, 30000)
  },
  mounted: function() {
    this.console.msgs.push({ m: "mounted", c: "" });
    this.getBits()

    // var baseLayer = new L.TileLayer( // "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ); // map.addLayer(new L.TileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ));
    let uri = (this.actives.basemap) ? this.actives.basemap.uri : this.$_.findWhere(this.basemaps, { default: true }).uri
    if (this.CONFIG.mode == 'T') { uri = 'http://localhost:8000/tile-T.png' }
    this.MAP.addLayer(new L.TileLayer(uri))

    this.project.loading = false

  },
  data() {
    return {
      query: null,
      bits: [],
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
        { "name": "hi im name", "handle": "hiiname", "uri": "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", default: true }
      ],
      actives: { basemap: null, pane: 'default', update: null }
    };
  },
  methods: {
    getBits: function() {
      console.log("querying...")

      // if (!this.query) { this.console.msgs.push({ m: "no query string supplied", c: "warning" }) } else {

      this.console.msgs.push({ m: "querying for " + this.query + "... ...", c: "" })
      this.project.loading = true
      let qs = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + this.query : this.CONFIG.dev.elastic_bits;
      axios
        .get(qs)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting bits w/ axios response..." : null
          );

          this.project.loading = false

          this.bits = this.$_.map(response.data.hits.hits, (h) => {
            let hi = h;
            hi._is_meta_visible = false;
            return hi;
          })

        }) //axios.then
        .catch(e => {
          this.project.loading = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch


      // } //else.this.query

    },
    wipeConsole: function() {
      console.log("wip9ing concolse...")
      this.console.msgs = [];
    },
    bootstrap: function() {
      console.log('bootstrapping in mode: ' + this.CONFIG.mode)
      let s0 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/axios.min.js' : 'https://AXIOS.js'
      let j0 = document.createElement('script');
      j0.src = s0;
      j0.async = false;
      j0.type = 'text/javascript';
      document.body.appendChild(j0)
      let s1 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/leaflet.js' : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.js'
      let j1 = document.createElement('script');
      j1.src = s1;
      j1.async = false;
      j1.type = 'text/javascript';
      document.body.appendChild(j1)
      let s2 = (this.CONFIG.mode == 'T') ? 'http://localhost:8000/all.js' : 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'
      let j2 = document.createElement('script');
      j2.src = s2;
      j2.async = false;
      j2.type = 'text/javascript';
      document.body.appendChild(j2)

      //HERE GOES HOME HERO PULL - FIRST DB BIT W/ HERO:TRUE

    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
