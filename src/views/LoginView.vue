<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input type="email" v-model="email" required />
      <label>Senha:</label>
      <input type="password" v-model="password" required />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      clientSecret: "",
      clientId: "",
    };
  },
  methods: {
    ...mapActions(["setToken"]),
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://127.0.0.1:8000/api/login", loginData)
        .then((response) => {
          const token = response.data.data.token;

          // Salvar o token no estado do Vuex
          localStorage.setItem("token", token);

          localStorage.setItem("isAuthenticated", "true");

          // Redirecionar para a página de token
          this.$router.push({ name: "token" });
        })
        .catch((error) => {
          console.error(error);
          // Tratar o erro de login, exibir mensagem de erro, etc.
        });
    },
  },
};
</script>
