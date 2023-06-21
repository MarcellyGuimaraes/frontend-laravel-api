<template>
  <div class="register">
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

<script>
import axios from "axios";
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
      axios
        .post("http://127.0.0.1:8000/api/register", requestData)
        .then((response) => {
          // Registro bem-sucedido
          const token = response.data.token;
          // Salvar o token no Vuex ou localStorage, como preferir
          // Exemplo de salvamento no Vuex:
          this.$store.commit("setToken", token);

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
