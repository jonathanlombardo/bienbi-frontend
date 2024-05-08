<script>
import { services } from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";

export default {
  data() {
    return {
      options: {
        searchOptions: {
          key: "GkJjTzfTAB01jy6W7VUViPfOdDf7dx9I",
          language: "it-IT",
          limit: 5,
          countrySet: "IT",
          idxSet: "Geo,PAD,Addr,Str,XStr",
        },
      },
    };
  },

  props: {
    placeholder: {
      type: String,
      default: "Cerca Indirizzo",
    },
  },

  emits: ["returnAddress"],

  methods: {
    emitAddress(event) {
      const res = event.data.result;
      this.$emit("returnAddress", {
        address: res.address.freeformAddress,
        lat: res.position.lat,
        long: res.position.lng,
      });
    },
  },

  mounted() {
    const searchBoxEl = document.querySelector("#tomtom-searchbox");
    const ttSearchBox = new SearchBox(services, this.options);
    const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    searchBoxEl.append(searchBoxHTML);

    const searchBoxInput = document.querySelector("input.tt-search-box-input");
    searchBoxInput.setAttribute("placeholder", this.placeholder);

    const searchBoxContainer = document.querySelector(".tt-search-box");
    searchBoxContainer.style.marginTop = 0;

    ttSearchBox.on("tomtom.searchbox.resultselected", this.emitAddress);
  },
};
</script>

<template>
  <div id="tomtom-searchbox" class="w-100">
    
  </div>
</template>

<style lang="scss" scoped></style>
