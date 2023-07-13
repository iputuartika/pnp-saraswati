<script setup>
import { BASE_URL } from '../api'
import { Icon } from '@iconify/vue'
import {
  Button,
  Spinner,
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  Pagination,
  Modal
} from 'flowbite-vue'
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const items = ref([])
const itemLength = ref()
const itemsPerPage = ref(10)
const currentPage = ref(1)
const searchQuery = ref('')
const toast = useToast()
const productId = ref()
const deleteModal = ref(false)
const createDrawer = ref(false)

// Get prodcut data from API
const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  try {
    items.value = response.data
  } catch (error) {
    console.log(error)
  }
}

// Refresh product data
const refreshProducts = () => {
  items.value = []
  console.log(items.value)
  setTimeout(getProducts, 100) // Delayed call to fetchProducts
}

// Delete product data
const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/products/${id}`)
  try {
    console.log(response.data)
    productId.value = null
    toast.success(response.data.message)
    deleteModal.value = !deleteModal.value
    getProducts()
  } catch (error) {
    console.log(error)
  }
}

// Format price with dot as thousand separator and comma as decimal separator
const formatPrice = (price) => {
  const formattedPrice = parseFloat(price).toFixed(2)
  const parts = formattedPrice.split('.')
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const decimalPart = parts[1]
  return `${integerPart},${decimalPart}`
}

// Filter item and paginate
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  if (!query) {
    // Return all items if the search query is empty
    const searchResult = items.value
    itemLength.value = Math.ceil(searchResult.length / itemsPerPage.value)
    return searchResult.slice(startIndex, endIndex)
  }
  const searchResult = items.value.filter((item) => {
    // Perform case-insensitive matching on item properties you want to search
    // Searching by item sku or name
    const skuMatch = item.id.toString().includes(query)
    const nameMatch = item.name.toLowerCase().includes(query)
    return skuMatch || nameMatch
  })
  // Set current page, item length, and return search result
  currentPage.value = 1
  itemLength.value = Math.ceil(searchResult.length / itemsPerPage.value)
  return searchResult.slice(startIndex, endIndex)
})

onMounted(() => {
  getProducts()
})
</script>

<template>
  <!-- Start coding here -->
  <div
    class="border md:rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative md:shadow-md overflow-hidden"
  >
    <!-- Table header -->
    <div
      class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
    >
      <!-- Search Form-->
      <div class="w-full md:w-1/2">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search"
            required=""
          />
        </div>
      </div>
      <div
        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <!-- Add Button -->
        <Button @click="createDrawer = !createDrawer" class="justify-center">
          <template #prefix>
            <Icon icon="mdi:plus-circle-outline" :style="{ fontSize: '18px' }" />
          </template>
          Add Product</Button
        >
        <div class="flex justify-center items-center space-x-3 w-full md:w-auto">
          <!-- Refresh -->
          <Button @click="refreshProducts" color="alternative" class="w-full justify-center">
            <template #prefix>
              <Icon icon="mdi:refresh" :style="{ fontSize: '18px' }" />
            </template>
            Refresh
          </Button>
          <!-- Export Button -->
          <Button color="alternative" class="w-full justify-center">
            <template #prefix>
              <Icon icon="mdi:file-export" :style="{ fontSize: '18px' }" />
            </template>
            Export
          </Button>
        </div>
      </div>
    </div>
    <!-- Table data -->
    <Table class="sm:rounded-none shadow-none" striped hoverable>
      <table-head>
        <table-head-cell class="text-center border border-l-0 border-gray-200 dark:border-gray-600"
          >SKU</table-head-cell
        >
        <table-head-cell class="w-1/2 text-center border border-gray-200 dark:border-gray-600"
          >Name</table-head-cell
        >
        <table-head-cell class="text-center border border-gray-200 dark:border-gray-600"
          >Category</table-head-cell
        >
        <table-head-cell class="text-center border border-gray-200 dark:border-gray-600"
          >Price</table-head-cell
        >
        <table-head-cell class="text-center border border-r-0 border-gray-200 dark:border-gray-600"
          >Action</table-head-cell
        >
      </table-head>
      <table-body v-if="items.length === 0">
        <tr>
          <td colspan="5" class="text-center border-b border-gray-200 dark:border-gray-600">
            <div class="flex p-10 items-center justify-center">
              <spinner size="8" />
            </div>
          </td>
        </tr>
      </table-body>
      <table-body>
        <table-row v-for="product in filteredItems" :key="product.id" class="p-0">
          <td
            class="w-32 text-right border border-l-0 border-gray-200 dark:border-gray-600 px-6 py-2"
          >
            {{ product.id }}
          </td>
          <td class="border border-gray-200 dark:border-gray-600 px-6 py-2">
            {{ product.name }}
          </td>
          <td class="border border-gray-200 dark:border-gray-600 text-center px-6 py-2">
            {{ product.category }}
          </td>
          <td class="border border-gray-200 dark:border-gray-600 text-right px-6 py-2">
            {{ formatPrice(product.price) }}
          </td>
          <td
            class="w-32 text-center border border-r-0 border-gray-200 dark:border-gray-600 px-6 py-2"
          >
            <div class="flex justify-center gap-1">
              <div>
                <Icon
                  icon="mdi:note"
                  :style="{ fontSize: '20px' }"
                  class="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500"
                />
                <span class="sr-only">View</span>
              </div>
              <div>
                <Icon
                  icon="mdi:pencil"
                  :style="{ fontSize: '20px' }"
                  class="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                />
                <span class="sr-only">Edit</span>
              </div>
              <div @click=";(deleteModal = !deleteModal), (productId = product.id)">
                <Icon
                  icon="mdi:trash"
                  :style="{ fontSize: '20px' }"
                  class="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
                />
                <span class="sr-only">Delete</span>
              </div>
            </div>
          </td>
        </table-row>
      </table-body>
    </Table>
    <!-- Table footer -->
    <div class="flex flex-row justify-between items-center p-4" aria-label="Table navigation">
      <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Page {{ currentPage }} /
        <span class="font-semibold text-gray-900 dark:text-white">{{ itemLength }}</span>
      </div>
      <Pagination
        v-model="currentPage"
        :total-pages="itemLength"
        show-icons
        :layout="'navigation'"
        :class="'text-sm'"
      />
    </div>
  </div>
  <!-- Create product drawer -->
  <div
    class="fixed top-0 right-0 z-50 border-l border-gray-200 dark:border-gray-700 w-full h-full lg:max-w-2xl p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800"
    :class="createDrawer ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="inline-flex justify-between">
      <h5
        class="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        New Product
      </h5>
      <Button @click="createDrawer = !createDrawer" color="alternative" class="p-64">
        <Icon icon="mdi:close" :style="{ fontSize: '24px' }" />
      </Button>
    </div>
    <div class="space-y-4">
      <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Name</label
        >
        <input
          type="text"
          name="title"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Type product name"
          required=""
        />
      </div>
      <div>
        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Category</label
        >
        <select
          id="category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option selected="">Select category</option>
          <option value="TV">TV/Monitors</option>
          <option value="PC">PC</option>
          <option value="GA">Gaming/Console</option>
          <option value="PH">Phones</option>
        </select>
      </div>
      <div>
        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Price</label
        >
        <input
          type="number"
          name="price"
          id="price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="$2999"
          required=""
        />
      </div>
      <div>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Enter event description here"
        ></textarea>
      </div>
      <div>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Enter event description here"
        ></textarea>
      </div>
      <div>
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Enter event description here"
        ></textarea>
      </div>
      <div class="flex bottom-0 right-0 justify-between space-x-4 w-full">
        <Button class="w-full md:w-auto">Add product</Button>
        <Button color="alternative" class="w-full md:w-auto">Close</Button>
      </div>
    </div>
  </div>
  <!-- Delete confirmation modal -->
  <Modal size="xl" v-show="deleteModal" @close="deleteModal = !deleteModal">
    <template #body>
      <div class="text-center">
        <Icon
          icon="mdi:alert-circle-outline"
          :style="{ fontSize: '32px' }"
          class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product? {{ productId }}
        </h3>
        <Button @click="deleteProduct(productId)" class="mr-2"> Yes, I'm sure</Button>
        <Button @click="deleteModal = !deleteModal" color="red"> No, cancel </Button>
      </div>
    </template>
  </Modal>
</template>
