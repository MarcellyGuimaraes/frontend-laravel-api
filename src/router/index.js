import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TokenView from "../views/TokenView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/token",
    name: "token",
    component: TokenView,
    meta: {
      requiresAuth: true, // Define a propriedade 'requiresAuth' como verdadeira para indicar que a rota requer autenticação
    },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: {
      requiresAuth: true, // Define a propriedade 'requiresAuth' como verdadeira para indicar que a rota requer autenticação
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Verifica se a rota requer autenticação
    // Implemente sua lógica de verificação de autenticação aqui
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") === "true" &&
      localStorage.getItem("token") !== ""; // Verifique se o usuário está autenticado

    if (!isAuthenticated) {
      next("/"); // Redireciona para a rota de login se o usuário não estiver autenticado
    } else {
      next(); // Permite o acesso à rota se o usuário estiver autenticado
    }
  } else {
    next(); // Permite o acesso a rotas que não requerem autenticação
  }
});

export default router;
