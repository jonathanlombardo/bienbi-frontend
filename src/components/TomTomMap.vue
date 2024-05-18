<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
// import "https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/<version>/maps/maps-web.min.js";
import tt from "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      // store,
      // ...
    };
  },

  props: {
    lat: Number,
    long: Number,
    zoom: {
      type: Number,
      default: 16,
    },
  },

  components: {},

  mounted() {
    const map = tt.map({
      key: "GkJjTzfTAB01jy6W7VUViPfOdDf7dx9I",
      container: "map",
      center: [this.long, this.lat],
      language: "it-IT",
      zoom: this.zoom,
      dragPan: !this.$isMobile(),
      // dragPan: true,
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());

    const marker = new tt.Marker().setLngLat([this.long, this.lat]).addTo(map);
  },
};
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 370px;
  // aspect-ratio: 1;
}
</style>
