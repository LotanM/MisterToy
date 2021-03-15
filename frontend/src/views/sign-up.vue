<template>
  <div class="sign-up">
    <form @submit.prevent="signup">
      <div class="form-header-container">
        <h2>Sign Up</h2>
        <div class="img-container">
        </div>
      </div>
      <div class="form-main-container">
        <input
          type="text"
          placeholder="Fullname"
          v-model="loggedinUser.fullname"
        />
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
        <button class="sign-up-btn">Sign Up</button>
        <div class="form-footer-container">
          <div class="checkbox-container">
            <input type="checkbox" class="remember-btn" name="remember" />
            <label for="remember">remember me</label>
          </div>
          <button class="forgot-btn">Forgot Password?</button>
        </div>
      </div>
    </form>
    <button @click="goBack()">Go back</button>
  </div>
</template>
<script>
export default {
  name: "sign-up",
  data() {
    return {
      loggedinUser: { fullname: "", username: "", password: "" },
    };
  },
  methods: {
    signup() {
      this.$store
        .dispatch({ type: "saveUser", user: this.loggedinUser })
        .then(() => {
          this.$router.push('/misterToy-app')
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // this.loggedinUser = userService.getLoggedinUser();
    // if (this.loggedinUser) this.$router.push("/bug-app");
  },
};
</script>
