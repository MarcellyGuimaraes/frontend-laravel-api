<template>
  <nav>
    <router-link class="nav-link" v-if="!isAuthenticated" to="/"
      >Login |
    </router-link>
    <router-link class="nav-link" v-if="!isAuthenticated" to="/register"
      >Register |
    </router-link>
    <router-link class="nav-link" v-if="isAuthenticated" to="/token"
      >Token |
    </router-link>
    <router-link class="nav-link" v-if="isAuthenticated" to="/products"
      >Exemplo |
    </router-link>
    <span class="nav-link" v-if="isAuthenticated" @click="logout">Logout</span>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    setAuthenticated(value) {
      this.isAuthenticated = value;
    },
    logout() {
      // Remover o token do LocalStorage e executar a lógica de logout
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      this.setAuthenticated(false); // Atualiza o estado de autenticação
      this.$router.push({ name: "login" });
      // Outras ações de logout, se necessário
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      // Verifica se a rota requer autenticação
      if (to.meta.requiresAuth) {
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        this.setAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          next({ name: "login" }); // Redireciona para a página de login se não estiver autenticado
        } else {
          next(); // Permite o acesso à rota se estiver autenticado
        }
      } else {
        next(); // Permite o acesso a rotas que não requerem autenticação
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

nav {
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 20px;
}

.nav-link {
  font-size: 18px;
  margin-right: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
