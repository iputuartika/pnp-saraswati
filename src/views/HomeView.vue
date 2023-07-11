<template>
  <div>
    <ul>
      <li v-for="item in paginatedItems" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="goToPreviousPage" :disabled="currentPage === 0">Previous</button>
    <button @click="goToNextPage" :disabled="currentPage === maxPageIndex">Next</button>
    <div>Page: {{ currentPage + 1 }} / {{ maxPageIndex + 1 }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { BASE_URL } from '../api'
import axios from 'axios'

const items = ref([])
const itemsPerPage = ref(10)
const currentPage = ref(0)

const getItems = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  try {
    items.value = response.data
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(getItems)

const paginatedItems = computed(() => {
  const startIndex = currentPage.value * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return items.value.slice(startIndex, endIndex)
})

const maxPageIndex = computed(() => {
  return Math.floor((items.value.length - 1) / itemsPerPage.value)
})

const goToPreviousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < maxPageIndex.value) {
    currentPage.value++
  }
}
</script>
