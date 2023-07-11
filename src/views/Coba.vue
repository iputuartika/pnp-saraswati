<template>
  <div></div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { BASE_URL } from '../api'

export default {
  setup() {
    const items = ref([])
    const getItems = async () => {
      const response = await axios.get(`${BASE_URL}/products`)
      try {
        items.value = response.data
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    getItems()

    return {
      getItems
    }
  },

  computed: {}
}
</script>
