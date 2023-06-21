<template>
  <div>
    <h2>Token</h2>
    <p>Token: {{ token }}</p>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      token: "",
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    console.log(store.state);
  },
};
</script>
