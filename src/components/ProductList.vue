<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <ProductItem
        :product="product"
        :is-favorite="isFavorite(product)"
        @view-details="$emit('view-details', product)"
        @toggle-favorite="$emit('toggle-favorite', product)"
      />
    </v-col>
  </v-row>
</template>

<script>
  import { toRefs } from 'vue'
  import ProductItem from './ProductItem.vue'

  export default {
    name: 'ProductList',
    components: {
      ProductItem,
    },
    props: {
      products: {
        type: Array,
        required: true,
      },
      favorites: {
        type: Array,
        required: true,
      },
    },
    emits: ['view-details', 'toggle-favorite'],
    setup(props) {
      const { favorites } = toRefs(props)

      const isFavorite = (product) => {
        return favorites.value.some((fav) => fav.id === product.id)
      }

      return {
        isFavorite,
      }
    },
  }
</script>
