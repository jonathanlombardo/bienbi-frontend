<script>
export default {
  props: {
    collection: Object,
  },

  emits: ["linkClicked"],

  methods: {
    linkClickHandle(url, label) {
      if (url) this.$emit("linkClicked", url, label);
    },
  },

  components: {},

  created() {
    console.group("collection");
    console.log(this.collection);
    console.groupEnd();
  },
};
</script>

<template>
  <div v-if="collection.length != 0 && collection.total > collection.per_page" class="wrapper">
    <div class="fst-italic fs-6">
      Mostrat{{ collection.data.length < 2 ? "o" : "i" }} <span class="fw-medium">{{ collection.data.length }}</span> risultat{{ collection.data.length < 2 ? "o" : "i" }}. Da <span class="fw-medium">{{ collection.from }}</span> a <span class="fw-medium">{{ collection.to }}</span>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li v-for="(link, index) in collection.links" class="page-item" :class="{ active: link.active }" @click="linkClickHandle(link.url, link.label)">
          <a v-if="index == 0" class="page-link" :class="{ disabled: !link.url }" href="javascript:void(0)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
          <a v-else-if="index < collection.links.length - 1" class="page-link" :class="{ disabled: !link.url }" href="javascript:void(0)">
            {{ link.label }}
          </a>
          <a v-else class="page-link" :class="{ disabled: !link.url }" href="javascript:void(0)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active > .page-link,
.page-link.active {
  background-color: #f34e39;
  border-color: #f34e39;
  color: white;
}

.page-link {
  color: #f34e39;
}
</style>
