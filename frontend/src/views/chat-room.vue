<template>
  <div class="container">
    <h1>About Us</h1>
    <p>We like You</p>
    <h2>Your thoughts about {{ topic }}</h2>
    <label>
      <input
        type="radio"
        value="Politics"
        v-model="topic"
        @change="changeTopic"
      />
      Politics
    </label>
    <label>
      <input  type="radio" value="Love" v-model="topic" @change="changeTopic" />
      Love
    </label>
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
       {{msg.from}} : {{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service";

export default {
  data() {
    return {
      msg: { from: this.user, txt: "" },
      msgs: [],
      topic: this.$store.getters.toyForDisplay.name,
      user: this.$store.getters.loggedinUser.username
    }
  },
  created() {
    socketService.setup();
    socketService.emit("chat topic", this.topic);
    socketService.on("chat addMsg", this.addMsg);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      console.log("Sending", this.msg.from);
      socketService.emit("chat newMsg", this.msg);
      this.msg = { from: this.user, txt: "" };
    },
    changeTopic() {
      socketService.emit("chat topic", this.topic);
    },
  },
};
</script>
