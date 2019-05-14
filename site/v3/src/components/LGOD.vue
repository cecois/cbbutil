<template>
  <div class="">
    <vue-headful :title="page.title" description="fxsxxxrrrre" />
    <section class="section">
      <div id="header" class="columns">
        <div class="column is-one-quarter">
          <div class="header-buttons columns">
            <div v-for="litem in page.linkItems" class="column">
              <div class="header-button tooltip is-tooltip-right" :data-tooltip="litem.slug"><a :class="{ active: litem.active }" :href=" litem.uri"><i :class="litem.ico"></i></a></div>
            </div note="/column.header-button">
          </div note="/.header-buttons">
        </div note="/.column">
        <div class="column is-one-half">
          <div class="is-hidden" id="activityContainer"></div>
        </div>
        <div class="app-title column is-one-quarter"><span style="text-align:right;">ll.geodata.2</span></div>
      </div note="/#header ">
    </section>
    <!--     <nav class="level" id="lgod2-level-nav-out">
      <div v-for="litem in page.linkItems" class="level-item has-text-centered">
        <a :href="'#/'+litem.uri">{{litem.slug}}</a>
      </div>
    </nav> -->
    <div class="columns">
      <div class="column"><i class="fas fa-plus-square"></i></div>
      <div class="column">
        <div class="columns">
          
          <div id="inputSearch" class="column is-full">
                  <div class="field has-addons" style="">
                    <div id="inputContainer" class="control">
                      <input style="text-align:center;" class="input is-large" type="text" placeholder=""/>
                    </div>
                  </div note="./field">
                <div class="column">

<!-- Main container -->
<nav class="level">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
      <p class="subtitle is-5">
        level-item subtitle
      </p>
    </div>
    <div class="level-item">
      <div class="field has-addons">
        level-item field
      </div note="/.field">
    </div note="/.level-item">
  </div note="/.level-left">

  <!-- Right side -->
  <div class="level-right">
    <p class="level-item"><strong>All</strong></p>
    <p class="level-item"><a>Published</a></p>
    <p class="level-item"><a>Drafts</a></p>
    <p class="level-item"><a>Deleted</a></p>
    <p class="level-item"><a class="button is-success">New</a></p>
  </div>
</nav>

                </div>
                </div note="/#inputsearch">


              </div note="/.columns">

      </div note="./column">
      <div class="column"><i class="fas fas fa-minus-square"></i></div>

    </div note="/.columns">
    
    <footer class="footer">
      <div class="level">
        <div v-model="foot" class="level-item has-text-left">
          {{foot}}
        </div>
        <div v-model="foot" class="level-item has-text-right">
          {{foot}}
        </div>
      </div>
    </footer note="/.footer">
  </div>
</template>

<script>
export default {
  name: "LGOD-GUI",
  methods: {

    SS: function () {

    }

  },
  created: function () {
    var mess = "LGOD-GUI";
    this.MAP = new L.Map("map", {
      zoomControl: false,
      center: [51.505, -0.09],
      attributionControl: false,
      zoom: 2
    });
    this.msg = mess.toUpperCase();
  },
  mounted: function () {
    this.console.msgs.push("mounted");

    // var baseLayer = new L.TileLayer( // "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ); // map.addLayer(new L.TileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ));

    this.MAP.addLayer(new L.TileLayer((this.actives.basemap) ? this.actives.basemap.uri : this.$_.findWhere(this.basemaps, { default: true }).uri))

  },
  data () {
    return {
      foot: new Date,
      page: {
        title: "LL GeoData v2: <something goes here>",
        splayed: false,
        menuItems: [{
          active: true,
          slug: 'mi1'
        }, { active: false, slug: 'mi2' }, ],
        linkItems: [{
          uri: 'http://c3.llan.ll.mit.edu',
          ico:'fas fa-university',slug: 'Lab C3'
        }, { uri: 'http://libweb.llan.ll.mit.edu', ico:'fas fa-home',slug: 'Knowledge Services Home' }, { uri: 'https://c3.llan.ll.mit.edu/communities/service/html/communitystart?communityUuid=249650e6-9c85-498a-bd0d-59b7b602623a', ico:'fas fa-map',slug: 'LL GeoData C3 Community' } ]
      },
      project: { loading: false, shorthand: "CbBFiXR" },
      config: { mode: "33" },
      console: { msgs: [] },
      modalClass: false,
      incoming: null,
      MAP: null,
      basemaps: [
        { "name": "hi im name", "handle": "hiiname", "uri": "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", default: true }
      ],
      actives: [{ basemap: null }]
    };
  },
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
