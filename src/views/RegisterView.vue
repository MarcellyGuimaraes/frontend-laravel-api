<template>
  <div class="register-view">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <label>Nome:</label>
      <input type="text" v-model="name" required />
      <label>Email:</label>
      <input type="email" v-model="email" required />
      <label>Senha:</label>
      <input type="password" v-model="password" required />
      <label>Confirmar Senha:</label>
      <input type="password" v-model="confirmPassword" required />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;

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
</style>

<script>
import { api } from "@/services/api";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      // Verificar se as senhas coincidem
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem");
        return;
      }

      // Enviar os dados do registro para a API
      const requestData = {
        name: this.name,
        email: this.email,
        password: this.password,
        c_password: this.confirmPassword,
      };

      // Fazer a requisição para a rota de registro
      api
        .post("/register", requestData)
        .then((response) => {
          // Registro bem-sucedido
          const token = response.data.data.token;
          // Salvar o token no Vuex ou localStorage, como preferir
          // Exemplo de salvamento no Vuex:
          localStorage.setItem("token", token);

          localStorage.setItem("isAuthenticated", "true");

          // Redirecionar para a tela de exibição do token
          this.$router.push("/token");
        })
        .catch((error) => {
          // Registro falhou
          console.error(error);
          alert("Falha no registro. Verifique os dados e tente novamente.");
        });
    },
  },
};
</script>
