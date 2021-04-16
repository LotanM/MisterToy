<template>
  <div v-if="toy" class="toy-details">
    <div class="header">
      <h1>{{ toy.name }}</h1>
      <router-link to="/misterToy-app">
        <button class="back-btn">↵</button>
      </router-link>
    </div>
    <div class="body">
      <div class="img-container">
        <img src="../assets/img/toys/2.jpg" alt="" />
      </div>
      <div class="details">
        <p>${{ toy.price }}</p>
        <p v-if="toy.inStock">In Stock!</p>
        <p>Type: {{ toy.type }}</p>
      </div>
    </div>
    <div class="chat-container">
      <chat :toyId="toy.id" />
    </div>
  </div>
</template>

<script>
import chat from "./chat-room.vue";

export default {
  name: "toy-details",
  data() {
    return {
      toy: null,
      toyId: this.$route.params.toyId,
    };
  },
  methods: {
    loadToy() {
      const toyId = this.$route.params.toyId;
      this.$store.dispatch({ type: "getToyById", toyId }).then(() => {
        this.toy = this.$store.getters.toyForDisplay;
      });
    },
  },
  created() {
    this.loadToy();
  },
  components: {
    chat,
  },
};
</script>