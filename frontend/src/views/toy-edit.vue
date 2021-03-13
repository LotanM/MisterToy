<template>
  <div class="toy-edit">
    <h1>EditPage</h1>
    <form v-if="toy" @submit.prevent="saveToy">
      <input type="text" v-model="toy.name" />
      <input type="text" v-model="toy.price" />
      <input type="text" v-model="toy.type" />
      <input type="text" v-model="toy.inStock" />
      <button>save changes</button>
    </form>
    <button @click="goBack()">Go back</button>
  </div>
</template>
<script>
export default {
  name: "toy-edit",
  data() {
    return {
      toy: null,
    };
  },
  methods: {
    saveToy() {
      this.$store.dispatch({ type: "saveToy", toy: this.toy })
      // .then(() => {
      //   this.goBack();
      // });
    },
    goBack() {
      this.$router.go(-1);
    },
    loadToy() {
      const toyId = this.$route.params.toyId;
      this.$store.dispatch({ type: "getToyById", toyId }).then(() => {
        this.toy = { ...this.$store.getters.toyForDisplay };
      });
    },
  },
  created() {
    this.loadToy();
  },
};
</script>

<style scoped>
.toy-edit form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}
.toy-edit form input {
  margin-bottom: 10px;
  padding-left: 10px;
  height: 25px;
  font-size: 20px;
}
</style>