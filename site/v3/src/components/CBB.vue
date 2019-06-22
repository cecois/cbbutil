<template>
  <div>
    <div id="map"></div>
    <vue-headful :title="getPageTitle()" description="fxsxxxrrrre" />

    <div id="zCBB-modal-settings" :class="['modal',modals.settings?'is-active':'']">
  <div class="modal-background"></div>
  <div class="modal-content">
    <!-- Any other Bulma elements you want -->
    modals-settings
  </div>
  <button @click="modals.settings=false" class="modal-close is-large" aria-label="close"></button>
</div>

    <!-- <section class="section"> -->
    <div id="zCBB-header" class="columns">
      <div class="column is-one-quarter has-text-left zCBB-primary has-text-weight-bold">
        
        <!-- <div class="header-buttons columns">
          <div v-for="litem in page.linkItems" class="column">
            <div class="header-button tooltip is-tooltip-right" :data-tooltip="litem.slug"><a :class="{ active: litem.active }" :href=" litem.uri"><i :class="litem.ico"></i></a></div>
          </div NB="/column.header-button">
        </div NB="/.header-buttons"> -->
      </div NB="/.column">
      <div id="zCBB-inputContainer" class="column" style="padding-top:2em;">
        <div id="zCBB-inputSearch" class="field has-addons">
          <p class="control">
            <a class="button" style="width:46px;">
              <atom-spinner  v-if="loadings.app || loadings.geometries || loadings.details || loadings.maplayer" :animation-duration="1000" :size="20" :color="'#000'"></atom-spinner>
            </a>
          </p>
          <p class="control">
            <input  v-model="query.string" class="input has-text-centered is-expanded" size="50%" type="text" :placeholder="(loadings.app)?'loading...':'e.g. `(huell AND crowbot)` or just `heynong`'" />
          </p>
          
          
          <p class="control">
            <!-- click on search switches pane and clears facets (ie new query - watcher on facets does the getbits part) -->
            <a @click="clearFacets();actives.pane='search';" class="button is-cbb">
              <i class="fa fa-search"></i>
            </a>
          </p>
          <p class="control">
            <a @click="setRandomQuery" class="button is-cbb">
              <i class="fa fa-random"></i>
            </a>
          </p><p class="control">
            <a @click="query.string=null" class="button has-text-grey-light" style="width:22px;border-left:none;">
              <i class="fa fa-slash is-size-7"></i>
            </a>
          </p>
        </div NB="">
        
      </div NB="/#inputsearch.column">
      <div id="zCBB-app-title" style="padding:1em 1em 0 0;" class="is-hidden-touch app-title column is-one-quarter has-text-right">
        <!-- <span :class="['zCBB-trigger-modal',modals.settings?'is-active':'']" @click="modals.settings=true"><i class="fas fa-sliders-h"></i></span> -->
        <!-- <span class="has-text-left zCBB-primary" style="padding-top:1em;font-size:2em;">{{page.title}}</span> -->
        <span class="has-text-left zCBB-primary" style="padding-top:1em;font-size:1.5em;">
cb<i class="fas fa-exclamation" style="font-size:3.5em;top:-4px;position:relative;"></i>b<i class="fas fa-exclamation has-text-grey-lighter" style="font-size:3.5em;top:-4px;position:relative;"></i>BMv3
        </span>
      </div>
    </div NB="/#header ">
    <!-- </section> -->
    <div class="columns" id="zCBB-app-nav">
      <div class="column is-2"></div>
      <div class="column">
        <!-- <div class="columns"> -->
          <div class="column">
            <!-- Main container -->
            <nav class="level">
              <!-- Left side -->
              <!-- <div class="level"> -->
                <div class="level-item">
                  <p v-for="pane in page.panes" class="subtitle is-5 zCBB-nav-item has-text-weight-light" v-bind:class="[actives.pane==pane.slug ? 'is-active has-text-weight-bold' : '']" @click="actives.pane=pane.slug">
                    {{pane.label}}<span v-if="bits.length>0 && pane.slug=='search'" class="has-badge-rounded has-badge-secondary" :data-badge="bits.length"></span>
                  </p>

                  <p class="zCBB-nav-item">
                    <span @click="page.splayed=!page.splayed" id="zCBB-pane-toggler" :class="['tooltip','is-tooltip-right',page.splayed?'splayed':'']" style="padding-right:2em;"><i :class="['fas','fa-map','tooltip']" data-tooltip="toggle main area for more/less map"></i></span>
                  </p>
                  <!-- <p v-if="loadings.maplayer">loading geometries...</p> -->
                  <!-- <p v-if="loadings.app">boostrapping...</p> -->
                  <!-- <p v-if="loadings.popup">collecting details...</p> -->
                </div>
              <!-- </div NB="/.level-left"> -->
            </nav NB="/.level">
          </div>
        <!-- </div NB="/#inputsearch"> -->
      </div NB="/.column">
      <div class="column has-text-right is-2">
        <!-- <span @click="page.splayed=!page.splayed" id="zCBB-pane-toggler" :class="page.splayed?'splayed':''" style="padding-right:2em;"><i :class="['fas','fa-map']"></i></span> -->
      </div>
    </div NB="/.columns">

    <div :class="['zCBB-pane','columns',this.page.splayed?'splayed':'']" v-if="actives.pane=='default'">
      <div v-if="hero" class="column zCBB-hero-column">
        <p class="is-size-2 has-text-weight-bold has-text-right zCBB-primary" style="padding-right:3em;">{{hero._source.instance}}</p>
        <p class="is-size-5 has-text-weight-light has-text-right zCBB-primary-2" style="padding-right:5em;">-- {{hero._source.hero.attrib}}  (ep.{{hero._source.episode.split('/')[hero._source.episode.split('/').length-1]}})</p>
        <p class="is-size-7 has-text-weight-light has-text-right zCBB-primary-3" style="padding-right:5em;"><span style="padding-right:2em;" @click="setQueryFire(hero._source,['bit','episode'])" class="zCBB-trigger">{{hero._source.bit}}</span></p>
      </div>
    </div NB="/default/home">
    <div :class="['zCBB-pane','columns',this.page.splayed?'splayed':'']" v-if="actives.pane=='huh'">

      <div class="column is-one-fifth"></div>
      <div class="column is-one-fifth has-text-grey">

  <h1 class="title zCBB-primary">What's this, now?
  <span class="bang-inline" ><span class="has-text-grey-lighter"><i class="fa fa-exclamation"></i></span>
<span class="zCBB-"><i class="fa fa-exclamation"></i></span>
  </span>
  </h1>
    <p >Come on, guys -- it's a searchable index of all the recurring bits from the <em><a href="http://www.earwolf.com/show/comedy-bang-bang/">Comedy Bang! Bang!</a></em> podcast.
    </p>
</div NB="/.column">

      
  <div class="column is-one-fifth has-text-grey">


  <h1 class="title zCBB-primary" style="text-align:center;">
    <span class="bang-inline" ><span class="zCBB-"><i class="fa fa-exclamation"></i></span>
  <span class="zCBB-"><i class="fa fa-exclamation has-text-grey-lighter"></i></span>
    </span>
  Why?
  </h1>
  <p>Because <em><a href="http://www.earwolf.com/show/comedy-bang-bang/">CBB</a></em> is the best thing ever recorded. Or maybe the best thing to ever even happen at all.</p><p>But also because the very good <a href="https://comedybangbang.fandom.com/wiki/Main_Page">CB!B! Wikia instance</a> isn't quite obsessive – and certainly not mappy – enough.</p>

</div NB="/.column">

<div class="column is-one-fifth has-text-grey">

<h1 class="title zCBB-primary" style="text-align:center;">Official thing?
  <span class="bang-inline" ><span class="zCBB-"><i class="fa fa-exclamation has-text-grey-lighter"></i></span>
  <span class="zCBB-"><i class="fa fa-exclamation"></i></span>
  </span>
</h1>
<p style="text-align:center;">Isn't, nope. Fansite.</p>
</div NB="/.column">


      
    </div NB="/huh">
    <div style="padding-top:2em;" :class="['zCBB-pane','columns',this.page.splayed?'splayed':'']" v-if="actives.pane=='search'">
      
      <div v-if="!page.splayed" class="zCBB-facet column has-text-left has-text-weight-light is-size-7">
<!-- ••••••••••••••••••••••••••••••••••••••••••••••••••••••••• FACET ••••••••••••••• -->
<div v-if="key == 'bits'" v-for="(facet, key) in this.facets">
  <h5 :class="['has-text-grey','is-size-5','has-text-weight-bold']">{{key}}</h5>
  <ul>
    <li v-for="bucket in facet.filtered_bits.buckets">
      <span @click="query.facets.bits.push(bucket.key)" :class="$_.contains(query.facets.bits,bucket.key)?'':'zCBB-trigger'">{{bucket.key}}</span>
       <span class="has-text-grey-lighter">({{bucket.doc_count}})</span> <sup @click="query.facets.bits=$_.reject(query.facets.bits,(b)=>{return b==bucket.key})" v-if="$_.contains(query.facets.bits,bucket.key)"><i class="fa fa-ban zCBB-trigger-facet-remove"></i></sup></li>
  </ul>
</div NB="/.facet in facets">
<!-- ••••••••••••••••••••••••••••••••••••••••••••••••••••••••• FACET ••••••••••••••• -->
<div v-if="key == 'tags'" v-for="(facet, key) in this.facets">
  <h5 :class="['has-text-grey','is-size-5','has-text-weight-bold']">{{key}}</h5>
  <ul>
    <li v-for="bucket in facet.filtered_tags.buckets"><span @click="query.facets.tags.push(bucket.key)" :class="$_.contains(query.facets.tags,bucket.key)?'':'zCBB-trigger'">{{bucket.key}}</span> <span class="has-text-grey-lighter">({{bucket.doc_count}})</span> <sup @click="query.facets.tags=$_.reject(query.facets.tags,(b)=>{return b==bucket.key})" v-if="$_.contains(query.facets.tags,bucket.key)"><i class="fa fa-ban zCBB-trigger-facet-remove"></i></sup></li>
  </ul>
</div NB="/.facet in facets">
<!-- ••••••••••••••••••••••••••••••••••••••••••••••••••••••••• FACET ••••••••••••••• -->
<div v-if="key == 'guests'" v-for="(facet, key) in this.facets">
  <h5 :class="['has-text-grey','is-size-5','has-text-weight-bold']">{{key}}</h5>
  <ul>
    <li v-for="bucket in facet.filtered_guests.buckets"><span @click="query.facets.guests.push(bucket.key)" :class="$_.contains(query.facets.guests,bucket.key)?'':'zCBB-trigger'">{{bucket.key}}</span> <span class="has-text-grey-lighter">({{bucket.doc_count}})</span> <sup @click="query.facets.guests=$_.reject(query.facets.guests,(b)=>{return b==bucket.key})" v-if="$_.contains(query.facets.guests,bucket.key)"><i class="fa fa-ban zCBB-trigger-facet-remove"></i></sup></li>
  </ul>
</div NB="/.facet in facets">
<!-- ••••••••••••••••••••••••••••••••••••••••••••••••••••••••• FACET ••••••••••••••• -->
<div v-if="key == 'episodes'" v-for="(facet, key) in this.facets">
  <h5 :class="['has-text-grey','is-size-5','has-text-weight-bold']">{{key}}</h5>
  <ul>
    <li v-for="bucket in facet.filtered_episodes.buckets"><span @click="query.facets.episodes.push(bucket.key)" :class="$_.contains(query.facets.episodes,bucket.key)?'':'zCBB-trigger'">{{bucket.key.split('/')[bucket.key.split('/').length-1]}}</span> <span class="has-text-grey-lighter">({{bucket.doc_count}})</span> <sup @click="query.facets.episodes=$_.reject(query.facets.episodes,(b)=>{return b==bucket.key})" v-if="$_.contains(query.facets.episodes,bucket.key)"><i class="fa fa-ban zCBB-trigger-facet-remove"></i></sup></li>
  </ul>
</div NB="/.facet in facets">

      </div NB="/.column (facets container)">
      <div class="column is-three-quarters">
        <ul>
          <li @mouseleave="actives.geom=null" @mouseenter="actives.geom=(bit._source.bit=='Location' && actives.geom!==genGeomID('bit',bit))?genGeomID('bit',bit):null" v-if="bits.length>1" v-for="bit in bits" :class="['has-text-left',!page.splayed?'box':'is-size-7 ellipsized']">
            <!-- <i v-if="" style="font-size:1.1em;" class="fa fa-arrow-right" /> -->
            <i @click="GEOMS.eachLayer((l)=>{l.eachLayer((la)=>{if(genGeomID('featureParent',la)==genGeomID('bit',bit)){if(la.getLatLng){MAP.panInside(la.getLatLng())}else{MAP.fitBounds(la.getBounds())}}})})" v-if="bit._source.bit=='Location'" style="font-size:1.1em;" :class="['fa','fa-map-marker',actives.geom==genGeomID('bit',bit)?'zCBB-marker-hi':'']" />
            <span class="bit-instance">{{bit._source.instance}}</span>
            <div class="columns zCBB-bit-data">
              <div v-if="!page.splayed" class="column is-1"></div>
     
<!-- Main container -->
<div class="level">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
      <p class="subtitle is-5">
      
<div  class='zCBB-bit-data'>
<span class='tooltip is-tooltip-left' :data-tooltip="bit._source.elucidation">
<span class="has-text-grey-lighter" v-if="!page.splayed">bit: </span><a href="#" class="">{{bit._source.bit}}</a></span>
<span v-if="!page.splayed" class="has-text-grey-lighter">({{bit._source.elucidation}})</span>
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
                                
    </p NB="/.level-item">
  </div NB="/.level-right">
</div>

            </div NB="columns">

            <div v-if="!page.splayed" class="columns zCBB-bit-data-meta">
                
              <div class="column is-1"></div>
              
<div class="column is-7"><span style="margin-left:1em;" class="is-size-7 has-text-grey-light">ep.{{bit._source.episode.split('/')[bit._source.episode.split('/').length-1]}}</span><span class="is-size-7 has-text-grey-light" v-if="bit._source.created_at">&nbsp;|&nbsp;~{{bit._source.tstart}}&nbsp;|&nbsp;added: {{$MOMENT(bit._source.created_at).format('YYYY.MMM.Mo')}}</span><span class="is-size-7 has-text-grey-light" v-if="bit._source.updated_at">&nbsp;|&nbsp;updated {{$MOMENT(bit._source.updated_at).format('YYYY.MMM.Mo')}}</span></div NB="/.column">

<div class="column"><div v-if="bit._source.tags" style="margin-left:1px;" v-bind:class="['zCBB-tag','tag',(query.string && encodeURI(query.string.toLowerCase()).indexOf(encodeURI(tag.toLowerCase()))>=0)?'is-hot':'']" @click="triggerSingleFieldQuery('tag',tag)" v-for="tag in (bit._source.tags.split(','))">{{tag}}</div NB="tags"></div NB="/.column">
            
            </div NB="/.columns  .zCBB-bit-data-meta">

          </li>
          <li v-else>
            big bit: {{bit._source.instance}}
          </li>
        </ul>
      </div>
    </div NB="/search">
    <div :class="['zCBB-pane','zCBB-browses','columns',this.page.splayed?'splayed':'']" v-if="actives.pane=='browse' && browses.doc_count>0">
      <div class="column">
        <h4 class="is-size-4">Bits</h4>
        <ul>
        <li style="line-height:.8;margin-bottom:1.1em;" v-for="bucket in browses.bits.filtered_bits.buckets"><span @click="setQueryFire({bit:bucket.key},['bit'])" class="zCBB-trigger has-badge-rounded has-badge-primary" :data-badge="bucket.doc_count">{{bucket.key}}</span> <p class="has-text-grey-lighter">({{bucket.elucidation.hits.hits[0]._source.elucidation}})</p></li>
      </ul>
      </div NB="./column browse bucket">
      <div class="column">
        <h4 class="is-size-4">Tags</h4>
        <ul>
           <li v-for="bucket in browses.tags.filtered_tags.buckets"><span @click="setQueryFire({tags:bucket.key},['tags'])" class="zCBB-trigger has-badge-rounded has-badge-primary" :data-badge="bucket.doc_count">{{bucket.key}}</span></li>
        </ul>
      </div NB="./column browse bucket">
      <div class="column">
        <h4 class="is-size-4">Guests</h4>
        <ul>
           <li v-for="bucket in browses.guests.filtered_guests.buckets"><span @click="setQueryFire({guests:bucket.key},['guests'])" class="zCBB-trigger has-badge-rounded has-badge-primary" :data-badge="bucket.doc_count">{{bucket.key}}</span></li>
        </ul>
      </div NB="./column browse bucket">
    </div NB="/browse">
    <div :class="['zCBB-pane','columns',this.page.splayed?'splayed':'']" v-if="actives.pane=='updates'">
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
                    <span @click="triggerUpdateQuery(report.episode,bit.bit)" class="zCBB-trigger has-badge-rounded has-badge-primary" :data-badge="bit.count">{{bit.bit}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div NB="/.columns">
        </div NB="/.tile">
        <div class="column is-1"></div>
      </div NB="/.column w tiles">
    </div NB="/updates">
    <div :class="['zCBB-pane','columns','is-multiline',this.page.splayed?'splayed':'']" v-if="actives.pane=='help'">
    
  <div class="column is-1"></div>
  <div class="column is-10">
    <div class="card large"><div class="card-content">
                            <div class="content">
                              <h2 class="is-size-3"><i class="fas fa-search-location"></i>&nbsp;Searching</h2>
                                <p>Basically you can just type into the box like a monkey might do it - "huell" or "fourvel" and so forth. Case is irrelevant.</p>
                                <p>Any query that results in even one Location will subquery that location and it will appear on the map, below (ctrl key or the map icon, above, will toggle a better display).</p>
        <p>But also know that whatever you type into the box gets pretty much POSTed as-is to an <a href="https://www.elastic.co/products/elasticsearch">ElasticSearch</a> (v5.6) index. As with most search engines, there is <a href="https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-query-string-query.html">some pretty advanced stuff</a> you can do if you like. To wit:</p>
<p>
  <ul style="list-style: none;">
    <li style="margin-bottom:2em;">to find all the Phil Collins references that *aren't* about his Live Aid Concorde stunt: <p><code>"phil collins" -concorde</code></p></li>
    <li style="margin-bottom:2em;">...or those that specifically are: <p><code>"phil collins" +concorde</code></p></li>
    <li style="margin-bottom:2em;">it's also fun to, say, find all the times a Lapkus character is referenced when she's not even there: <p><code>
      -lapkus +((traci +reard*n) || "nephew todd" || "regina crimp" || "mizz chips" || "liz mathers" || "marla charles" || "frank dorito" || "ho ho" || "benjamin susix" || "hortense harpie" || "murphy o'malaman" || "juniper flagen" || "sunny" || "scarsdale" || "salantame" || "big sue" || "dimples" || "mrs. blarrr" || "frank dorito" || "amanda calzone" || "natalie scoppapoppalee" || "whitney peeps" || "lisa porsche" || "harmony moongloss" || "craigory james" || "pamela from big bear" || "dinky liddle" || "carmela pointe" || "wendy quote the worm endquote widelman" || "the dell guy" || "ross gellar" || "p'nut" || "bunty pickles" || "vernessa lykes" || "dump dump" || "waldo" || "dirk thirsty" || "scat hamptoncrat")
    </code>
  </p>
    <p class="hast-text-italic">(...where the + is a boolean AND and the || is boolean OR)</p>
</li>
  </ul>
</p>

                            </div>
                        </div NB="/.card-content">
                      </div NB="/.card-large">
    <div class="columns is-mobile">
      <div class="column">
        <div class="card large"><div class="card-content"><div class="content">
          <h2 class="is-size-3"><i class="fas fa-clock"></i>&nbsp;Timestamps</h2>

          <p>Each record has <strong>tstart</strong> and <strong>tend</strong> timestamps - ostensibly these frame the specific instance within the episode. However, when CBB audio files were moved behind the Howl paywall (and then to Stitcher), it rendered many of them incorrect – as paywalled episodes pass the edit points where commercials used to be, they're offset by however long the excised commercials were.</p><p>Timestamps can still be used to get close to the instance when listening, but they are no longer accurate enough to be used for, say, supercutting or something.

          </p>
        </div></div></div>
      </div>
      <div class="column">
        <div class="card large"><div class="card-content"><div class="content">
          <h2 class="is-size-3"><i class="fas fa-map"></i>&nbsp;The Map</h2>
          <p>There's a Leaflet instance under here that will display the geometries associated with any bits of type="location." Look for the <i class="fa fa-map-marker"></i> and click it to zoom the map to that location. More on that under "Locations."</p>
          <p>But a note or two about how to use said map: in an effort to reduce clutter, there are no map controls as you might find in other web maps (zoom bar, +/-, maybe a panning control, too). None of that here - just grab the map to move it and trackpad|scroll to zoom in and out. Optionally you can shift-click+hold-drag-release in order to "select" an area of the map to which you'll immediately zoom.</p>
        </div></div></div>
      </div>
    </div NB="/.columns">
    
    <div class="column is-12">
    <div class="card large"><div class="card-content">
                            <div class="content">
                              <h2 class="is-size-3"><i class="fas fa-map-marker"></i>&nbsp;Locations</h2>
                                <p>One of the bits is special (and in fact the original impetus of this entire effort). For <a href='#' class='zCBB-trigger' data-type='bit' data-target='Location'>bits="Location"</a> the results will appear in the picklist (indicated by a map pin icon) <em>and</em> on the map under what you're reading now (hidden behind the main content area by default).</p><p>The ctrl key will toggle the map's visibility (as will the <i class="fas fa-map"></i> button); the <i  class="fa fa-map-marker"></i> in the search results will zoom to that instance's referenced location (the map otherwise defaults to the full spatial extent of *all* the location bits). <a href="#" class='zCBB-trigger' data-type="" data-target='bit:Location +tags:"huell howser"'>Huell Howser</a>, <a href="#" class='zCBB-trigger' data-type="" data-target='bit:Location +tags:"gino lambardo"'>Gino Lambardo</a>, <a href="#" class='zCBB-trigger' data-type="" data-target='bit:Location +tags:"merrill shindler"'>Merrill Shindler</a>, and <a href="#" class='zCBB-trigger' data-type="" data-target='bit:Location +tags:"shelly driftwood"'>Shelly Driftwood</a> are all good for at least a few.</p>
   <p>Another thing to note about locations is that unless there's a clamor for it we do NOT spatially-index the geometries for retrieval. So while of course you can query for <em>bits</em> that reference locations (and those referenced geometries will appear on the map with minimal interaction), we're not bothering to offer the ability to, say, zoom/pan the map and query for locations <em>in that area</em>. Like, who cares?</p><p>If you're <em>that interested</em> you could just query for everything (<a href="#" class="zCBB-trigger" data-type="" data-target="bit:location">"bit:Location"</a>) and zoom to the spot about which you're curious.</p>
<p>Bet you're not, though!</p>
                            </div NB="/.content">
                        </div NB="/.card-content">
                      </div NB="/.card-large">
    </div NB="/.column.is-12">

    <div class="column is-12">
    <div class="card large"><div class="card-content">
                            <div class="content">
                              <h2 class="is-size-3"><i class="fas fa-hashtag"></i>&nbsp;Contact</h2>
                                <p>
                                  Seems unlikely you would need to contact the one aging white dude who built and maintains this, but technically nothing can stop you: <a href="https://twitter.com/zapstraighttoit">@ZapStraightToIt</a>
                                </p>
                            </div NB="/.content">
                        </div NB="/.card-content">
                      </div NB="/.card-large">
    </div NB="/.column.is-12">
  </div NB="/.column">
  

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
    // this.loadings.app = true
    this.query.string = (this.$route.params.query && this.$route.params.query!=='*') ? this.$route.params.query : null
    // this.query.facets = (this.$route.params.facets) ? decodeURI(this.$route.params.facets.split(",")) : []
    this.actives = {
      pane: (this.$route.params.pane) ? this.$route.params.pane : 'default',
      basemap: (this.$route.params.basemap) ? this.$route.params.basemap : null,
      updatekey: (this.$route.params.updatekey) ? this.$route.params.updatekey : null,
      geom:null
    }
    this.updates = (this.actives.updatekey) ? null : __.last(__.sortBy(__.map(updates, (u) => {
      let uo = u;
      uo.sorter = new Date(u.date)
      return uo
    }), 'sorter').reverse(), 3);
    
    var mess = "CBB-guI";
    
    this.msg = mess.toUpperCase();
    setInterval(() => {
      this.wipeConsole()
    }, 30000)

  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.keyMonitor)
  },
  mounted: function() {
    this.CONFIG = CONFIG
    window.addEventListener('keydown', this.keyMonitor)
    // this.console.msgs.push({ m: "mounted", c: "" });
    // this.getBits()
    // this.getFacets()
    
      
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

  this.GEOMS = new L.featureGroup().addTo(this.MAP);

  this.getHero()

  },
  data() {
    return {
      CONFIG: null,
      loadings:{maplayer:false,app:false,popupopen:false},
      hero: null,
      updates: null,
      locations:null,
      seens:[],
      query: {string:null,facets:{bits:[],episodes:[],guests:[],tags:[]}},
      browses:{doc_count:0},
      bits: [],
      facets: [],
      page: {
        title: "BitMap",
        splayed: true,
        panes: [{
          label: 'Home',
          slug: 'default'
        }, { label: 'Huh?', slug: 'huh' }, { label: 'Search', slug: 'search' }, { label: 'Browse', slug: 'browse' }, { label: 'Updates', slug: 'updates' }, { label: 'Help', slug: 'help' }]
      },
      project: { shorthand: "CbBBtMp" },
      console: { msgs: [] },
      modals: {settings:false},
      incoming: null,
      MAP: null,
      basemaps: [
        { "name": "AJ Ashton's Pencil", "handle": "default", "uri": "https://b.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A" }
      ],
      actives: { basemap: null, pane: 'default', updatekey: null, geom:"000" }
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
    consolelog: function (c1,c2) {
console.log(c1,c2)
    },
    getUpdates: function() {

      let u = (this.updatekey) ? this.updatekey : '';
      // console.log("updatekey:", this.updatekey);
      let qs = (this.CONFIG.mode == '33') ? this.CONFIG.prod.atlas_updates + u : this.CONFIG.dev.atlas_updates;



    },
    keyMonitor: function(e){

if(e.ctrlKey){this.page.splayed=!this.page.splayed}
if(e.key.toLowerCase()=='escape'){this.modals={settings:false}}

    },
  getPageTitle: function(){

return (this.query.string && this.query.string!=='null')?this.page.title+': '+this.query.string:this.page.title

  },
    setQueryFire: function(B,wa) {

let clauses = []

__.each(wa,(w)=>{
  clauses.push(w+':"'+B[w]+'"')
})

this.query.string='('+clauses.join(" AND ")+')'

this.clearFacets();
this.actives.pane='search';

    },
    getHero: function() {

let QS = null;

/*
THE NEW HERO METHOD WILL BE TO QUERY ELASTIC FOR THE MOST RECENT WHERE hero:true  - currently no docs feature this attribute
*/

      QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_bits + '&q=instance:"Low-rise%20*and*%20boot-cut?"&size=1' : this.CONFIG.dev.elastic_bits;

      axios
        .get(QS)
        .then(response => {
          this.loadings.app = false

          this.hero = __.map(response.data.hits.hits,(b)=>{
                      let o = b
                      o._source.hero={on:true,attrib:"Scott Aukerman"}
                      return o;
                    })[8]

        }) //axios.then
        .catch(e => {
          this.loadings.app = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch



    },
    genGeomID: function(caller,e){

let g = null;

switch(caller) {
  case 'featureParent':
    g= e.feature.geometry.type+':'+e.feature.properties.cartodb_id
    break;
  case 'feature':
    g= e.geometry.type+':'+e.properties.cartodb_id
    break;
  case 'layer':
    g= e.layer.toGeoJSON().geometry.type+':'+e.layer.toGeoJSON().properties.cartodb_id
    break;
  case 'bit':
    g= e._source.location_type+':'+e._source.location_id
    break;
  default:
    // code block
}

return g.toLowerCase().replace('multi','').replace('gon','').replace('string','')

    },
    getGeomIDs: function (){

return this.$_.map(this.$_.filter(this.bits,(b)=>{return b._source.bit=='Location'}),(m)=>{
  return m._source.location_type.toLowerCase()+':'+m._source.location_id
})

    },
    restyleGeoms: function () {

this.GEOMS.eachLayer((l)=>{

l.eachLayer((f)=>{
  // let s = __.contains(this.seens,this.genGeomID('style',f.feature))?{fillColor:'white',fillOpacity:.7,color:'black'}:{fillColor:'red',fillOpacity:.9,color:'pink'}
let s = null;

switch(true){
  case this.actives.geom==this.genGeomID('feature',f.feature):
  s={fillColor:'#dDa812',fillOpacity:.7,color:'#00A1c2'}
  break;
  case __.contains(this.seens,this.genGeomID('feature',f.feature)):
  s={fillColor:'white',fillOpacity:.7,color:'black'}
  break;
  default:
  s={fillColor:'#FDB812',fillOpacity:.9,color:'#00A1E2'}
}

f.setStyle(s)

})//eachlayer

})

    },
    mapGeoms: function() {

this.GEOMS.clearLayers();

L.geoJson(this.locations, {
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, (feature)=>{return __.contains(this.genGeomID('feature',feature))?{fillColor:'white',fillOpacity:.7,color:'black'}:{fillColor:'red',fillOpacity:.9,color:'pink'}});
            }
          })
.bindPopup(
  (l)=>{return l.feature.properties.name}
  )
.addTo(this.GEOMS)
.on("click",(f)=>{
  this.loadings.popupopen=true;
  this.seens.push(this.genGeomID('layer',f))
})
.on("popupopen", ()=>{
  this.loadings.popupopen=false
})
.on("mouseover", (f)=>{
  this.actives.geom=this.genGeomID('layer',f);
})
.on("mouseout", ()=>{
  this.actives.geom=null;
})

this.restyleGeoms();
this.MAP.fitBounds(this.GEOMS.getBounds())

    },
    getGeoms: function() {

let u = null;
if(this.CONFIG.mode!=='T'){
u = this.CONFIG.prod.atlas_geoms+this.getGeomIDs().join(',')
} else {
  u="http://localhost:8000/cbb_fake-geoms.json"
}
if(this.getGeomIDs().length>0)
{
this.loadings.maplayer=true
  axios.get(u)
        .then(response => {

         this.locations = response.data

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.loadings.maplayer = false
        })} else {
          console.log("no associated geometries") 
        }

    },
    getBits: function() {
      
      this.loadings.app=true;

      this.setRoute();

let QO = null;

      // if (!this.query || this.query=='') { 
      //   // query is empty - we'll send out for just a sampling
      // this.console.msgs.push({ m: "querying for default... ...", c: "" })
      // } //else.this.query

if(this.CONFIG.mode=='33'){

  let qso = this.query.string?this.query.string:'*'
  let qfg = (this.query.facets.guests.length>0)?' AND ('+__.uniq(this.query.facets.guests).join(' AND ')+')':''
  let qft = (this.query.facets.tags.length>0)?' AND ('+__.uniq(this.query.facets.tags).join(' AND ')+')':''
  let qfb = (this.query.facets.bits.length>0)?' AND ('+__.uniq(this.query.facets.bits).join(' AND ')+')':''
  let qfe = (this.query.facets.episodes.length>0)?' AND ('+__.uniq(this.query.facets.episodes).join(' AND ')+')':''

console.log("RAW QUERY:",this.query.string)
// console.log("PREPD QUERY:",qso+qfg+qft+qfb+qfe)
  let Q = {"wildcard":{"tags.comma_del":"cake boss"}}

// let Q = {
//     "multi_match": {
//       "query": qso+qfg+qft+qfb+qfe,
//       "fields": [
//         "bit",
//         "instance",
//         "elucidation",
//         "episode_title",
//         "tags.comma_del",
//         "episode_guests.comma_del"
//       ]
//     }
//   }

 QO={
  "size": 10000,
  "query": Q,
  "aggregations": {
    "all_bits": {
      "global": {},
      "aggregations": {
        "guests": {
          "filter": {
            "query_string": {
              "default_operator": "AND",
              "analyzer": "simple",
              "query": qso+qfg+qft+qfb+qfe
            }
          },
          "aggregations": {
            "filtered_guests": {
              "terms": {
                "size": 10000,
                "field": "episode_guests.comma_del"
              }
            }
          }
        },
        "tags": {
          "filter": {
            "query_string": {
              "default_operator": "AND",
              "analyzer": "simple",
              "query": qso+qfg+qft+qfb+qfe
            }
          },
          "aggregations": {
            "filtered_tags": {
              "terms": {
                "size": 10000,
                "field": "tags.comma_del"
              }
            }
          }
        },
        "bits": {
          "filter": {
            "query_string": {
              "default_operator": "AND",
              "analyzer": "simple",
              "query": qso+qfg+qft+qfb+qfe
            }
          },
          "aggregations": {
            "filtered_bits": {
              "terms": {
                "size": 10000,
                "field": "bit.keyword"
              }
            }
          }
        },
        "episodes": {
          "filter": {
            "query_string": {
              "default_operator": "AND",
              "analyzer": "simple",
              "query": qso+qfg+qft+qfb+qfe
            }
          },
          "aggregations": {
            "filtered_episodes": {
              "terms": {
                "size": 10000,
                "field": "episode.keyword"
              }
            }
          }
        }
      }
    }
  }
} //qs

// let QT1={
//   "query": {
//     "bool": {
//       "should": [
//         {
//           "match": {
//             "tags.comma_del": "cake boss"
//           }
//         }
//       ],
//       "minimum_should_match": 1,
//       "must": [
//         {
//           "match": {
//             "bit": "Marone!"
//           }
//         }
//       ]
//     }
//   }
// }

// let QT={"query":{"multi_match":{"query":this.query.string,"fields":["bit","instance","tags.comma_del","episode_guests"]}}}

// fetch(this.CONFIG.prod.bits,
axios.post(this.CONFIG.prod.elastic_bits,QO)
        .then(response => {

          this.bits = response.data.hits.hits
          this.facets = response.data.aggregations.all_bits

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.loadings.app = false
        })

} else {

QO=this.CONFIG.dev.elastic_bits;
axios.get(QO)
        .then(response => {

          this.bits = response.data.hits.hits
          this.facets = response.data.aggregations.all_bits

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.loadings.app = false
        })
} //if.else.mode

    },
    setRandomQuery: function () {

this.actives.pane='search'
this.query.string='random string gen'
this.clearFacets()

    },clearFacets: function () {

this.query.facets = {bits:[],episodes:[],guests:[],tags:[]}

    },
    getFacets: function() {


      this.console.msgs.push({ m: "facetizing " + this.query, c: "" })
      this.loadings.app = true
      let QS = (this.CONFIG.mode == '33') ? this.CONFIG.prod.elastic_facets + this.query : this.CONFIG.dev.elastic_facets;
      axios
        .get(QS)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting facets w/ axios response..." : null
          );

          this.loadings.app = false

          this.facets = response.data.aggregations

        }) //axios.then
        .catch(e => {
          this.loadings.app = false
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }); //axios.catch

    },
    wipeConsole: function() {
      this.console.msgs = [];
    },
    bootstrapBrowse: function() {

let qo = {"size":0,"query":{"query_string":{"default_operator":"AND","query":"*:*"}},"aggregations":{"all_bits":{"global":{},"aggregations":{"guests":{"filter":{"query_string":{"default_operator":"AND","query":"*:*"}},"aggregations":{"filtered_guests":{"terms":{"size":1000000,"field":"episode_guests.comma_del"}}}},"tags":{"filter":{"query_string":{"default_operator":"AND","query":"*:*"}},"aggregations":{"filtered_tags":{"terms":{"size":1000000,"field":"tags.comma_del"}}}},"bits":{"filter":{"query_string":{"default_operator":"AND","query":"*:*"}},"aggregations":{"filtered_bits":{"terms":{"size":1000000,"field":"bit.keyword"},"aggs":{"elucidation":{"top_hits":{"size":1,"_source":{"include":"elucidation"}}}}}}}}}}}

this.loadings.app=true;

if(this.CONFIG.mode=='33'){
axios.post(this.CONFIG.prod.elastic_bits,qo)
        .then(response => {
          console.info(
            process.env.VERBOSITY === "DEBUG" ? "getting all keys w/ axios response..." : null
          );
          
          this.browses = response.data.aggregations.all_bits

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.loadings.app = false
        })
      } else {
        axios.get(this.CONFIG.dev.browse)
        .then(response => {

          this.browses = response.data.aggregations.all_bits

        }) //axios.then
        .catch(e => {
        
          this.console.msgs.push({ m: e, c: "error" })
          console.error(e);
        }) //axios.catch
        .finally(()=>{
          this.loadings.app = false
        })
      }

    },
    setRoute: function() {

let P = {
            pane: this.actives.pane,
            query: (this.query.string)?this.query.string:'*',
            // facets: (this.query.facets.length>0)?this.query.facets.join(','):('*'),
            basemap: (this.actives.basemap)?this.actives.basemap:'default',
            updatekey: this.actives.updatekey
          }
        this.$router.push({
          params: P
        }); //rejplace
      } //setRoute
      
  } //methods
  ,
  watch: {
    bits: {
      handler: function(vnew, vold) {
        this.getGeoms()
      }
    },actives: {
      deep:true,
      handler: function(vnew, vold) {
        this.setRoute();
        this.restyleGeoms();
        if(vnew.pane=='browse' && this.browses.doc_count<1){
          this.bootstrapBrowse();
        }
      }
    },locations: {
      deep:true,
      handler: function(vnew, vold) {
        this.mapGeoms();
      }
    },seens: {
      deep:true,
      handler: function(vnew, vold) {
        this.restyleGeoms();
      }
    }
    ,"query.string": {
      handler: function(vnew, vold) {
        // this.setRoute();
      }
    },"query.facets": {
      deep:true,
      handler: function(vnew, vold) {
        this.getBits();
      }
    }
  } //watch
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style></style>
