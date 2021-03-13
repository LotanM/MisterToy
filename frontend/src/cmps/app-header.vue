<template>
  <div class="header-container">
    <nav>
      <p>misterToyLogo</p>
      <router-link to="/"><p>Sign Up / Login</p></router-link>
    </nav>
  </div>
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
