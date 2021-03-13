<template>
  <div class="home">
    <div class="app-title">
      <h2>best toy store</h2>
      <h1>Mister Toy</h1>
    </div>
    <nav>
      <div class="btns-container">
        <div class="login-container">
        <router-link to="/">
          <button>log In</button>
        </router-link>
        </div>
        <router-link to="/misterToy-app">
          <button>Shop</button>
        </router-link>
      </div>
      <router-link to="/sign-up">
          <p>dont have an account yet?</p>
        </router-link>
    </nav>
    <div class="logo-img">
      <img src="../assets/img/transformer.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      user: { fullname: "lotan" },
    };
  },
};
</script>
