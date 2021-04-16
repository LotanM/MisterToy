<template>
  <nav class="header-container">
    <div class="logo-container">
      <router-link to="/"
        ><img src="../assets/img/logo.svg" alt=""
      /></router-link>
    </div>
    <div v-if="user" class="username-container">
      <p>{{ user.username }}</p>
      <button @click="logOut(user.username)"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <p v-else><router-link to="/login"><i class="fas fa-sign-in-alt"></i></router-link></p>
  </nav>
</template>

<script>

export default {
  name: "toy-header",
  methods: {
    logOut(username){
    this.$store.dispatch('logout', username)
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>
