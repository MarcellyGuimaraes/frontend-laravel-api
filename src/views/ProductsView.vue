<template>
  <div class="token-view">
    <h1>Produtos</h1>
    <div class="token-container">
      <h1>Exemplo de uso da api</h1>

      <div>
        <h3>Requisição GET</h3>
        <ul class="produtos">
          <li v-for="(produto, index) in produtos" :key="index">
            <span>
              {{ produto.name }} -
              {{
                produto.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h3>Requisição POST</h3>
        <form class="form" @submit.prevent="createProduct">
          <input
            v-model="name"
            placeholder="Nome do produto"
            class="input"
            type="text"
          />
          <input
            v-model="price"
            placeholder="Preço (R$)"
            class="input"
            type="text"
          />
          <textarea
            rows="5"
            cols="20"
            placeholder="Descrição"
            class="input"
            type="text"
            v-model="description"
          ></textarea>
          <button type="submit">Criar</button>
        </form>
      </div>

      <div>
        <h3>Requisição DELETE</h3>
        <ul class="produtos">
          <li v-for="(produto, index) in produtos" :key="index">
            {{ produto.name }} -
            <a class="" @click="deleteProduct(produto.id)">Excluir</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.token-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #e6e6e6;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
  }

  .token-container {
    width: 45rem;
    height: 46rem;
    background: #fff;
    display: flex;
    flex-direction: column;

    p {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .produtos {
      list-style: none;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .input {
        margin: 0.2rem 0;
      }
    }
  }
}
</style>

<script>
import { apiProducts } from "../services/api.js";

export default {
  data() {
    return {
      produtos: [],
      name: "",
      price: "",
      description: "",
    };
  },
  methods: {
    createProduct() {
      console.log("name:", this.name);
      console.log("price:", this.price);
      console.log("description:", this.description);

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("description", this.description);

      apiProducts
        .post("", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("ERRO", error);
        });
    },

    deleteProduct(id) {
      apiProducts
        .delete(`/${id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("ERRO", error);
        });
    },
  },
  created() {
    apiProducts
      .get()
      .then((response) => {
        this.produtos = response.data;
      })
      .catch((error) => {
        console.error("ERRO", error);
      });
  },
};
</script>
