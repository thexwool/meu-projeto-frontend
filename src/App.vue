<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center">Lista de Produtos</h1>
          <SearchBar @search="filterProducts" />
          <v-alert v-if="error" type="error" dismissible>
            {{ error }}
          </v-alert>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
            class="my-5"
          ></v-progress-circular>
          <ProductList
            v-else
            :products="filteredProducts"
            :favorites="favorites"
            @view-details="handleViewDetails"
            @toggle-favorite="handleToggleFavorite"
          />
        </v-col>
      </v-row>
      <ProductDetailsModal
        v-if="showProductDetails"
        :product="selectedProduct"
        @close="showProductDetails = false"
      />
    </v-container>
  </v-app>
</template>

<script>
  import { ref, onMounted, computed } from "vue";
  import SearchBar from "./components/SearchBar.vue";
  import ProductList from "./components/ProductList.vue";
  import ProductDetailsModal from "./components/ProductDetailsModal.vue";

  export default {
    name: "App",
    components: {
      SearchBar,
      ProductList,
      ProductDetailsModal,
    },
    setup() {
      const products = ref([]);
      const favorites = ref([]);
      const searchTerm = ref("");
      const loading = ref(false);
      const error = ref(null);
      const showProductDetails = ref(false);
      const selectedProduct = ref(null);

      const fetchProducts = async () => {
        loading.value = true;
        try {
          const response = await fetch("http://localhost:3000/api/products");
          const data = await response.json();
          products.value = data;
          loadFavorites();
        } catch (e) {
          error.value = "Falha ao buscar produtos. Por favor, tente novamente mais tarde.";
          console.error("Falha ao buscar produtos:", e);
        } finally {
          loading.value = false;
        }
      };

      const filterProducts = (term) => {
        searchTerm.value = term;
        pushToDataLayer({
          event: "search",
          search_term: term,
        });
      };

      const handleViewDetails = (product) => {
        selectedProduct.value = product;
        showProductDetails.value = true;

        pushToDataLayer({
          event: "view_product",
          product_id: product.id,
          product_name: product.name,
        });
      };

      const handleToggleFavorite = (product) => {
        const index = favorites.value.findIndex((fav) => fav.id === product.id);
        const action = index > -1 ? "remove_favorite" : "add_favorite";

        if (index > -1) {
          favorites.value.splice(index, 1);
        } else {
          favorites.value.push(product);
        }
        try {
          localStorage.setItem("favorites", JSON.stringify(favorites.value));
        } catch (e) {
          console.error("Falha ao salvar favoritos:", e);
        }

        pushToDataLayer({
          event: action,
          product_id: product.id,
          product_name: product.name,
        });
      };

      const loadFavorites = () => {
        try {
          const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
          if (storedFavorites) {
            favorites.value = storedFavorites;
          }
        } catch (e) {
          console.error("Falha ao carregar favoritos:", e);
        }
      };

      const pushToDataLayer = (eventData) => {
        if (window && window.dataLayer) {
          window.dataLayer.push(eventData);
          console.log("Evento enviado ao GTM:", eventData);
        } else {
          setTimeout(() => {
            pushToDataLayer(eventData);
          }, 500);
          console.warn("GTM dataLayer não está disponível, tentando novamente...");
        }
      };

      const filteredProducts = computed(() => {
        return products.value.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });

      onMounted(() => {
        fetchProducts();
      });

      return {
        products,
        favorites,
        filteredProducts,
        filterProducts,
        handleViewDetails,
        handleToggleFavorite,
        loading,
        error,
        showProductDetails,
        selectedProduct,
      };
    },
  };
</script>

<style>
  #app {
    font-family: "Roboto", sans-serif;
    margin: 20px;
  }
</style>
