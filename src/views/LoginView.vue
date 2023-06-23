<template>
  <div class="login-view">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Email:</label>
      <input type="email" v-model="email" required />
      <label>Senha:</label>
      <input type="password" v-model="password" required />
      <p v-if="error" class="error">
        Erro! Verifique os dados de acesso ou
        <router-link class="error" to="/register">Crie uma conta</router-link>
      </p>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 300px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

.error {
  color: red;
}
</style>

<script>
import { api } from "@/services/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      clientSecret: "",
      clientId: "",
      error: false,
    };
  },
  methods: {
    login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      api
        .post("/login", loginData)
        .then((response) => {
          const token = response.data.data.token;

          // Salvar o token no estado do Vuex
          localStorage.setItem("token", token);

          localStorage.setItem("isAuthenticated", "true");

          // Redirecionar para a página de token
          this.$router.push({ name: "token" });
        })
        .catch((error) => {
          console.error("ERRO", error.response);
          if (error.response.data.message == "Unauthorized.") {
            this.error = true;
          }
        });
    },
  },
};
</script>
