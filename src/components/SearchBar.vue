<template>
  <v-text-field
    v-model="searchTerm"
    label="Buscar produtos..."
    @input="debouncedOnSearch"
    append-icon="mdi-magnify"
    clearable
    class="mb-5"
  ></v-text-field>
</template>

<script>
  import { ref } from 'vue'
  import debounce from 'lodash/debounce'

  export default {
    name: 'SearchBar',
    emits: ['search'],
    setup(props, { emit }) {
      const searchTerm = ref('')

      const onSearch = () => {
        emit('search', searchTerm.value)
      }

      const debouncedOnSearch = debounce(onSearch, 300)

      return {
        searchTerm,
        debouncedOnSearch,
      }
    },
  }
</script>
