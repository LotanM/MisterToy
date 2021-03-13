

<template>
  <li class="toy-preview">
    <div class="img-container">
      <img src="../assets/img/toys/2.jpg" alt="" />
    </div>
    <div class="details-container">
      <div class="toy-title">{{ toy.name }}</div>
      <div class="toy-price">$ {{ toy.price }}</div>
      <div v-if="toy.inStock">in Stock!</div>
      <div v-else>Out of Stock!</div>
      <div class="btns-container">
        <button @click="removeToy(toy._id)">
          <i class="far fa-trash-alt"></i>
        </button>
        <button @click="showDetails(toy._id)">
          <i class="fas fa-info"></i>
        </button>
        <button @click="editToy(toy._id)"><i class="fas fa-edit"></i></button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "toy-list",
  props: {
    toy: Object,
  },
  data() {
    return {
      randomNum: "2",
    };
  },
  methods: {
    removeToy(toyId) {
      this.$emit("removeToy", toyId);
    },
    showDetails(toyId) {
      this.$router.push(`/misterToy-app/${toyId}`);
    },
    editToy(toyId) {
      this.$router.push(`/misterToy-app/edit/${toyId}`);
    },
  },
};
</script>

