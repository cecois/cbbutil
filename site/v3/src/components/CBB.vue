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
      <div id="zCBB-inputSearch" class="column">
        <div class="field has-addons" style="">
          <div id="inputContainer" class="control">
            <input style="text-align:center;" v-model="query" class="input is-large" type="text" :placeholder="(project.loading)?'loading...':'e.g. `(huell AND crowbot)` or just `heynong`'" />
          </div>
        </div NB="./field">
      </div NB="/#inputsearch.column">
      <div class="app-title column is-one-quarter"><span style="text-align:right;">{{page.title}}</span></div>
    </div NB="/#header ">
    <!-- </section> -->
    <div class="columns">
      <div class="column"><i class="fas fa-plus-square"></i></div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p v-for="pane in page.panes" class="subtitle is-5 vCBB-nav-item" v-bind:class="[actives.pane==pane.slug ? 'is-active' : '']" v-on:click="(actives.pane=pane.slug)">
                    {{pane.label}}
                  </p>
                </div>
              </div NB="/.level-left">
            </nav>
          </div>
        </div NB="/#inputsearch">
      </div NB="/.columns">
      <div class="column"><i class="fas fas fa-minus-square"></i></div>
    </div NB="/.columns">
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
        search c1
      </div>
      <div class="column">
        <p>search c2</p>
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
export default {
  name: "CBB-GUI",
  methods: {

    SS: function() {

    }

  },
  beforeCreate: function() {
    this.project.loading = true
  },
  created: function() {
    this.CONFIG = CONFIG
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

    // var baseLayer = new L.TileLayer( // "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ); // map.addLayer(new L.TileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ));
    let uri = (this.actives.basemap) ? this.actives.basemap.uri : this.$_.findWhere(this.basemaps, { default: true }).uri
    if (this.CONFIG.mode == 'T') { uri = 'http://localhost:8000/tile-T.png' }
    this.MAP.addLayer(new L.TileLayer(uri))

    this.project.loading = false
    this.getBits()

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
      actives: { basemap: null, pane: 'default' }
    };
  },
  methods: {
    getBits: function() {
      console.log("querying...")

      if (!this.query) { this.console.msgs.push({ m: "no query string supplied", c: "warning" }) } else {

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
            console.log(response.data.hits.hits)
            this.bits = response.data.hits.hits

          }) //axios.then
          .catch(e => {
            this.project.loading = false
            this.console.msgs.push({ m: e, c: "error" })
            console.error(e);
          }); //axios.catch


      } //else.this.query

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
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
