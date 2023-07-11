<script setup>
import { BASE_URL } from '../api'
import { Icon } from '@iconify/vue'
import {
  Table,
  TableHead,
  TableBody,
  TableHeadCell,
  TableRow,
  TableCell,
  Pagination
} from 'flowbite-vue'
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const items = ref([])
const itemLength = ref(0)
const itemsPerPage = ref(10)
const currentPage = ref(1)
const searchQuery = ref('')

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredItems.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  const page = Math.ceil(itemLength.value / itemsPerPage.value)
  return page
})

const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  try {
    items.value = response.data
    itemLength.value = items.value.length
  } catch (error) {
    console.log(error)
  }
}

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  if (!query) {
    // Return all items if the search query is empty
    return items.value.slice(startIndex, endIndex)
  }
  return items.value.filter((item) => {
    // Perform case-insensitive matching on item properties you want to search
    // Example: Searching by item name
    const skuMatch = item.id.toString().includes(query)
    const nameMatch = item.name.toLowerCase().includes(query)

    return skuMatch || nameMatch
  })
})

onMounted(() => {
  getProducts(), totalPages
})
</script>

<template>
  <!-- Start coding here -->
  <div
    class="md:rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative md:shadow-md sm:rounded-lg overflow-hidden"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
    >
      <div class="w-full md:w-1/2">
        <form class="flex items-center">
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
        </form>
      </div>
      <div
        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <button
          type="button"
          class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <Icon icon="mdi:plus-circle-outline" :style="{ fontSize: '18px' }" class="mr-1" />
          Add product
        </button>
        <div class="flex items-center space-x-3 w-full md:w-auto">
          <button
            id="actionsDropdownButton"
            data-dropdown-toggle="actionsDropdown"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <svg
              class="-ml-1 mr-1.5 w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
            Actions
          </button>
          <div
            id="actionsDropdown"
            class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="actionsDropdownButton"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Mass Edit</a
                >
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Delete all</a
              >
            </div>
          </div>
          <button
            id="filterDropdownButton"
            data-dropdown-toggle="filterDropdown"
            class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="h-4 w-4 mr-2 text-gray-400"
              viewbox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
            </svg>
            Filter
            <svg
              class="-mr-1 ml-1.5 w-5 h-5"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </button>
          <div
            id="filterDropdown"
            class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
            <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
              <li class="flex items-center">
                <input
                  id="apple"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="apple" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >Apple (56)</label
                >
              </li>
              <li class="flex items-center">
                <input
                  id="fitbit"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="fitbit"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >Microsoft (16)</label
                >
              </li>
              <li class="flex items-center">
                <input
                  id="razor"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="razor" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >Razor (49)</label
                >
              </li>
              <li class="flex items-center">
                <input
                  id="nikon"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="nikon" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >Nikon (12)</label
                >
              </li>
              <li class="flex items-center">
                <input
                  id="benq"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label for="benq" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >BenQ (74)</label
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Table class="sm:rounded-none shadow-none" striped hoverable>
      <table-head>
        <table-head-cell class="text-center border border-l-0 border-gray-200 dark:border-gray-600"
          >SKU</table-head-cell
        >
        <table-head-cell class="text-center border border-gray-200 dark:border-gray-600"
          >Name</table-head-cell
        >
        <table-head-cell class="text-center border border-gray-200 dark:border-gray-600"
          >Category</table-head-cell
        >
        <table-head-cell class="text-center border border-gray-200 dark:border-gray-600"
          >Price</table-head-cell
        >
        <table-head-cell class="border border-r-0 border-gray-200 dark:border-gray-600"
          ><span class="sr-only">Edit</span></table-head-cell
        >
      </table-head>
      <!-- <table-body v-if="items.length === 0">
        <tr>
          <td colspan="5" class="text-center">Loading...</td>
          <td>{{ items.length }}</td>
        </tr>
      </table-body> -->
      <table-body>
        <table-row v-for="product in filteredItems" :key="product.id">
          <table-cell
            class="w-32 text-right border border-l-0 border-gray-200 dark:border-gray-600"
            >{{ product.id }}</table-cell
          >
          <table-cell class="border border-gray-200 dark:border-gray-600">{{
            product.name
          }}</table-cell>
          <table-cell class="border border-gray-200 dark:border-gray-600 text-center">{{
            product.category
          }}</table-cell>
          <table-cell class="border border-gray-200 dark:border-gray-600 text-right">{{
            product.price
          }}</table-cell>
          <td class="text-center px-6 py-4 border border-gray-200 dark:border-gray-600">
            {{ product.price }}
          </td>
        </table-row>
      </table-body>
    </Table>
    <nav
      class="flex flex-col md:flex-row justify-between items-start md:items-center pace-y-0 p-4"
      aria-label="Table navigation"
    >
      <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Page {{ currentPage }} /
        <span class="font-semibold text-gray-900 dark:text-white">{{ totalPages }}</span>
      </div>
      <Pagination
        v-model="currentPage"
        :total-pages="totalPages"
        show-icons
        :layout="'navigation'"
        :class="'text-sm'"
      />
    </nav>
  </div>
</template>
