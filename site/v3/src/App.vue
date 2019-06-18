<template>
  <div id="app">
    <router-view />
  
  </div>
</template>

<script>
// window.map = new L.Map("map", {
//   zoomControl: false,
//   center: [51.505, -0.09],
//   attributionControl: false,
//   zoom: 2
// });

// import __ from "underscore";
// Object.defineProperty(Vue.prototype, "$__", { value: __ });

// var baseLayer = new L.TileLayer("https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png")
// var baseLayer = new L.TileLayer( // "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png" // ); // map.addLayer(baseLayer);


export default {
  name: "app"
};
</script>

<style lang="scss">

#map{
  width: 100%;height: 100%;position: fixed;top: 0;right: 0;bottom: 0;left: 0;
  z-index:-1;
}

@import "@/sass/style.scss";
// ---------------------------- BADGE, BULMA -------
@-webkit-keyframes spinAround {
  from {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg)
  }
}

@keyframes spinAround {
  from {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }
  to {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg)
  }
}


</style>
