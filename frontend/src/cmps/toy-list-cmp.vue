

<template>
<div class="toy-list-container">
  <ul class="toy-list">
    <toy-preview
      :key="toy._id"
      v-for="toy in toys"
      :toy="toy"
      @removeToy="removeToy"
    />
  </ul>
</div>
</template>

<script>
import toyPreview from "@/cmps/toy-preview-cmp.vue";

export default {
  name: "toy-list",
  props: {
    toys: Array,
  },
  methods: {
    removeToy(toyId) {
      this.$emit("removeToy", toyId);
    },
  },
  components: {
    toyPreview,
  },
};
</script>

