<template>
  <nav class="header-container">
      <div class="logo-container">
        <router-link to="/"><img src="../assets/img/logo.svg" alt=""></router-link>
      </div>
      <p>Sign Up / Login</p>
    </nav>
</template>

<script>
export default {
  name: "toy-header",
  data() {
    return {
      user: { fullname: "Sakura" },
    };
  },
};
</script>
