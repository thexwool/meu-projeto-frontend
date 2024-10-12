<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-img
      :src="product.image"
      :alt="product.name"
      height="200px"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)"
    >
      <v-btn
        icon
        text
        @click="$emit('toggle-favorite', product)"
        class="ma-2"
        :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <v-icon :color="isFavorite ? 'yellow' : 'grey'">
          {{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}
        </v-icon>
      </v-btn>
    </v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>Preço: R$ {{ product.price.toFixed(2) }}</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('view-details', product)">
        Ver Detalhes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'ProductItem',
    props: {
      product: {
        type: Object,
        required: true,
      },
      isFavorite: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['view-details', 'toggle-favorite'],
  }
</script>

<style scoped>
  .v-btn {
    background-color: transparent !important;
    box-shadow: none !important;
  }
</style>
