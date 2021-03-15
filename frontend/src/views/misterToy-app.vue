<template>
  <div class="misterToy-app">
    <toy-filter />
    <toy-list
      v-if="toysToShow && toysToShow.length"
      :toys="toysToShow"
      @removeToy="removeToy"
    />
  </div>
</template>


<script>
import toyList from "@/cmps/toy-list-cmp.vue";
import toyFilter from "@/cmps/toy-filter-cmp.vue";

export default {
  name: "misterToy-app",
  computed: {
    toysToShow() {
      return this.$store.getters.toysForDisplay;
    },
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: "removeToy", toyId })
        .then(() => {
          console.log("toy Removed from store");
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>