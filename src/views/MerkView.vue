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
      <TableHead>
        <TableHeadCell
          class="w-1/4 text-center border border-l-0 border-gray-200 dark:border-gray-600"
          >Name</TableHeadCell
        >
        <TableHeadCell
          class="w-1/2 text-center border border-r-0 border-gray-200 dark:border-gray-600"
          >Description</TableHeadCell
        >
        <TableHeadCell
          class="w-1/6 text-center border border-r-0 border-gray-200 dark:border-gray-600"
          >Action</TableHeadCell
        >
      </TableHead>
      <TableBody>
        <tr>
          <TableCell colspan="3" class="text-center border-b border-gray-200 dark:border-gray-600">
            <div class="flex p-10 items-center justify-center">
              <Spinner size="8" />
            </div>
          </TableCell>
        </tr>
      </TableBody>
      <TableBody>
        <TableRow class="p-0">
          <TableCell class="border border-l-0 border-gray-200 dark:border-gray-600 px-6 py-2"
            >Dupa Saraswati 108</TableCell
          >
          <TableCell class="border border-gray-200 dark:border-gray-600 px-6 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptates impedit facilis
          </TableCell>
          <TableCell
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
          </TableCell>
        </TableRow>
      </TableBody>
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
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Button,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  Pagination,
  TableCell
} from 'flowbite-vue'

const data = ref(false)
</script>
