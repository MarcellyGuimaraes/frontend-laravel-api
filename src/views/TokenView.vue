<template>
  <div class="token-view">
    <h1>Token</h1>
    <div class="token-container">
      <p>Seu token:</p>
      <textarea v-model="token" readonly></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.token-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e6e6e6;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .token-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 18px;
      margin-bottom: 10px;
    }

    textarea {
      width: 400px;
      height: 200px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: none;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  created() {
    this.token = localStorage.getItem("token");
  },
};
</script>
