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
                      <input style="text-align:center;" class="input is-large" type="text" placeholder=""/>
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
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
<p>        default pane c1</p>
      </div><div class="column">
        default pane c2
      </div>
    </div>

    <div class="zCBB-pane columns" v-if="actives.pane=='mi2'">
      <div class="column">
        mi2 c1
      </div><div class="column">
        <p>mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
<p>        mi2 c2</p>
      </div>
    </div>
    
    <footer class="footer">
      <div class="level">
        <div v-for="msg in console.msgs" class="level-item has-text-left">
          msg:{{msg}}
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

    SS: function () {

    }

  },
  created: function () {
    this.CONFIG = CONFIG
    this.bootstrap()
    var mess = "CBB-GUI";
    if(this.MAP==null){this.MAP = new L.Map("map", {
          zoomControl: false,
          center: [51.505, -0.09],
          attributionControl: false,
          zoom: 2
        });}
    this.msg = mess.toUpperCase();
    setInterval(() => {
    this.wipeConsole()
  }, 30000)
  },
  mounted: function () {
    this.console.msgs.push("mounted");

    // var baseLayer = new L.TileLayer( // "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ); // map.addLayer(new L.TileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ));
let uri = (this.actives.basemap) ? this.actives.basemap.uri : this.$_.findWhere(this.basemaps, { default: true }).uri
    if(this.CONFIG.mode=='T'){uri='http://localhost:8000/tile-T.png'}
    this.MAP.addLayer(new L.TileLayer(uri))

  },
  data () {
    return {
      page: {
        title: "CBB.BITMAP.v3: <something goes here>",
        splayed: false,
        panes: [{
          label:'la1',slug: 'default'
        }, { label:'la2',slug: 'mi2' }, ]
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
      actives: { basemap: null,pane:'default' }
    };
  },
  methods: {
    wipeConsole: function() {
      console.log("wip9ing concolse...")
      this.console.msgs=[];
    },
    bootstrap: function() {
console.log('bootstrapping in mode: '+this.CONFIG.mode)
let s1=(this.CONFIG.mode=='T')?'http://localhost:8000/leaflet.js':'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/leaflet.js'
let j1=document.createElement('script');j1.src=s1;j1.async=false;j1.type='text/javascript';document.body.appendChild(j1)
let s2=(this.CONFIG.mode=='T')?'http://localhost:8000/all.js':'https://use.fontawesome.com/releases/v5.0.4/js/all.js'
let j2=document.createElement('script');j2.src=s2;j2.async=false;j2.type='text/javascript';document.body.appendChild(j2)
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
