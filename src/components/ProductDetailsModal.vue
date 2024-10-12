<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ product.name }}</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-img
          :src="product.image"
          :alt="product.name"
          height="300px"
          class="mb-4"
        ></v-img>
        <p>{{ product.description }}</p>
        <h3>Preço: R$ {{ product.price.toFixed(2) }}</h3>
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          @click="closeModal"
          :aria-label="'Fechar detalhes de ' + product.name"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { ref, watch } from "vue";

  export default {
    name: "ProductDetailsModal",
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    emits: ["close"],
    setup(props, { emit }) {
      const dialog = ref(true);

      const closeModal = () => {
        dialog.value = false;
      };

      watch(dialog, (val) => {
        if (!val) {
          emit("close");
        }
      });

      return {
        dialog,
        closeModal,
      };
    },
  };
</script>
