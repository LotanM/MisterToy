<template>
      <div class="sign-up">
        <form @submit.prevent="signup">
            <h2>Signup</h2>
            <input type="text" placeholder="Your fullname" v-model="signupCredentials.fullname" />
            <input type="text" placeholder="Your username" v-model="signupCredentials.username" />
            <input type="password" placeholder="Your password" v-model="signupCredentials.password" />
            <button>Sign Up</button>
        </form>
            <button @click="goBack()">Go back</button>
      </div>
</template>
<script>
export default {
  name: "toy-edit",
  data() {
          return {
              loggedinUser: null,
              signupCredentials: { username: '', password: '', fullname: '' }
          }
      },
  methods: {
    signup() {
            userService.addUser({ ...this.signupCredentials })
                .then(user => {
                    this.loggedinUser = user
                    this.$router.push('/bug-app');
                })
        },
    // saveToy() {
    //   this.$store.dispatch({ type: "saveToy", toy: this.toy });
    // },
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
    this.loggedinUser = userService.getLoggedinUser();
    if (this.loggedinUser) this.$router.push('/bug-app');
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