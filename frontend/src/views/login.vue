<template>
  <div class="sign-up">
    <form @submit.prevent="signup">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Fullname"
        v-model="loggedinUser.fullname"
      />
      <input
        type="text"
        placeholder="Nickname"
        v-model="loggedinUser.nickname"
      />
      <input
        type="password"
        placeholder="Password"
        v-model="loggedinUser.password"
      />
      <button>Sign Up</button>
    </form>
    <button @click="goBack()">Go back</button>
  </div>
</template>
<script>
export default {
  name: "sign-up",
  data() {
    return {
      loggedinUser: { fullname: "", nickname: "", password: "" },
    };
  },
  methods: {
    signup() {
      this.$store.dispatch({ type: "saveUser", user: this.loggedinUser });
      // userService.addUser({ ...this.signupCredentials }).then((user) => {
      //   this.loggedinUser = user;
      // });
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

<style scoped>
.sign-up form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}
.sign-up form input {
  margin-bottom: 10px;
  padding-left: 10px;
  height: 25px;
  font-size: 20px;
}
</style>