<template>
  <div class="login">
    <form @submit.prevent="login">
      <div class="form-header-container">
        <h2>Sign In</h2>
        <div class="img-container">
          <img src="../assets/img/Deku.png" alt="" />
        </div>
      </div>
      <div class="form-main-container">
        <input
          type="text"
          placeholder="Username"
          v-model="loggedinUser.username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loggedinUser.password"
        />
        <button class="login-btn">Login</button>
        <div class="form-footer-container">
          <div class="checkbox-container">
            <input type="checkbox" class="remember-btn" name="remember" />
            <label for="remember">remember me</label>
          </div>
          <button class="forgot-btn">Forgot Password?</button>
        </div>
        <hr>
        <p>Not a member yet? <router-link to="/sign-up">Join now </router-link></p>
      </div>
    </form>
    <button @click="goBack()">Home</button>
  </div>
</template>
<script>
export default {
  name: "log-in",
  data() {
    return {
      loggedinUser: { username: "", password: "" },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch({ type: "logUser", user: this.loggedinUser })
        .then(() => {
          this.$router.push("/misterToy-app");
        });
    },
    goBack() {
      this.$router.push("/");
    },
  },
  created() {},
};
</script>
