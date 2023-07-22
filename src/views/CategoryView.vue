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
        <label for="search" class="sr-only">Search</label>
        <div class="relative w-full">
          <Input v-model="searchQuery" size="sm" placeholder="enter your search query">
            <template #prefix>
              <Icon
                icon="mdi:search"
                :style="{ fontSize: '18px' }"
                class="text-gray-500 dark:text-gray-400"
              />
            </template>
            <template v-if="searchQuery" #suffix>
              <Icon
                @click="searchQuery = ''"
                icon="mdi:close"
                :style="{ fontSize: '18px' }"
                class="text-gray-500 dark:text-gray-300"
              />
            </template>
          </Input>
        </div>
      </div>
      <div
        class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <!-- New Button -->
        <Button
          @click=";(cruDrawer = !cruDrawer), (state = 'create')"
          class="md:w-28 justify-center"
        >
          <template #prefix>
            <Icon icon="mdi:plus-circle-outline" :style="{ fontSize: '18px' }" />
          </template>
          New</Button
        >
        <div class="flex justify-center items-center space-x-3 w-full md:w-auto">
          <!-- Refresh -->
          <Button
            @click="refreshCategories"
            color="alternative"
            class="w-full md:w-28 justify-center"
          >
            <template #prefix>
              <Icon icon="mdi:refresh" :style="{ fontSize: '18px' }" />
            </template>
            Refresh
          </Button>
          <!-- Export Button -->
          <Button color="alternative" class="w-full md:w-28 justify-center">
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
          class="w-1/5 text-center border border-l-0 border-gray-200 dark:border-gray-600"
          >Name</TableHeadCell
        >
        <TableHeadCell class="text-center border border-r-0 border-gray-200 dark:border-gray-600"
          >Description</TableHeadCell
        >
        <TableHeadCell
          class="w-32 text-center border border-r-0 border-gray-200 dark:border-gray-600"
          >Action</TableHeadCell
        >
      </TableHead>
      <TableBody>
        <tr>
          <TableCell
            v-if="categories.length === 0"
            colspan="3"
            class="text-center border-gray-200 dark:border-gray-600"
          >
            <div class="flex p-10 items-center justify-center">
              <Spinner size="8" />
            </div>
          </TableCell>
        </tr>
      </TableBody>
      <TableBody>
        <TableRow v-for="category in filteredCategories" :key="category.id" class="p-0">
          <TableCell class="border border-l-0 border-gray-200 dark:border-gray-600 px-6 py-2">{{
            category.name
          }}</TableCell>
          <TableCell class="border border-gray-200 dark:border-gray-600 px-6 py-2">
            {{ category.description }}
          </TableCell>
          <TableCell
            class="text-center border border-r-0 border-gray-200 dark:border-gray-600 px-6 py-2"
          >
            <div class="flex justify-center gap-1">
              <div @click="getCategory(category.id), (state = 'view')">
                <Icon
                  icon="mdi:note"
                  :style="{ fontSize: '20px' }"
                  class="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500"
                />
                <span class="sr-only">View</span>
              </div>
              <div
                @click="getCategory(category.id), (categoryId = category.id), (state = 'update')"
              >
                <Icon
                  icon="mdi:pencil"
                  :style="{ fontSize: '20px' }"
                  class="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500"
                />
                <span class="sr-only">Edit</span>
              </div>
              <div
                @click="
                  ;(deleteModal = !deleteModal), (categoryId = category.id), (state = 'delete')
                "
              >
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
    <div
      v-if="categories.length != 0"
      class="flex flex-row justify-between items-center p-4"
      aria-label="Table navigation"
    >
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
  <!-- CRUD -->
  <!-- Create, Read, Update Drawer -->
  <div :class="cruDrawer ? 'fixed top-0 right-0 w-full h-full z-40 bg-gray-500 bg-opacity-50' : ''">
    <div
      class="fixed top-0 right-0 z-50 md:border-l border-gray-200 dark:border-gray-700 transition-transform w-screen h-full lg:max-w-2xl p-4 overflow-y-auto bg-white dark:bg-gray-800"
      :class="cruDrawer ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex justify-between pb-2">
        <h5 class="inline-flex text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
          {{ state }} Category
        </h5>
        <Button @click=";(cruDrawer = !cruDrawer), resetVar()" color="red">
          <Icon icon="mdi:close" :style="{ fontSize: '20px' }" class="-mx-2" />
        </Button>
      </div>
      <div class="space-y-4">
        <div>
          <Input
            :disabled="state === 'view'"
            v-model="category.name"
            type="text"
            placeholder="Type product name"
            label="Name"
            required
          />
        </div>
        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Description</label
          >
          <textarea
            :disabled="state === 'view'"
            v-model="category.description"
            rows="4"
            :class="state === 'view' ? 'cursor-not-allowed' : 'bg-gray-50'"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type category description here..."
          ></textarea>
        </div>
        <div>
          <Input
            :disabled="state === 'view'"
            v-model="category.user"
            type="text"
            placeholder="User here"
            label="User"
            required
          />
        </div>
      </div>
      <div
        class="absolute md:relative lg:absolute bottom-0 right-0 md:flex justify-between p-4 md:p-0 md:pt-4 lg:p-4 w-full space-y-4 md:space-y-0"
      >
        <Button v-if="state === 'create'" @click="createCategory" class="w-full md:w-24"
          >Save</Button
        >
        <Button v-if="state === 'update'" @click="updateCategory(categoryId)" class="w-full md:w-24"
          >Update</Button
        >
        <Button
          v-if="state === 'create' || state === 'update'"
          @click=";(cruDrawer = !cruDrawer), resetVar()"
          color="alternative"
          class="w-full md:w-24"
          >Cancel</Button
        >
      </div>
    </div>
  </div>
  <!-- Delete Modal -->
  <Modal size="xl" v-show="deleteModal" @close="deleteModal = !deleteModal">
    <template #body>
      <div class="text-center">
        <Icon
          icon="mdi:alert-circle-outline"
          :style="{ fontSize: '32px' }"
          class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this category?
        </h3>
        <div class="space-x-4">
          <Button @click="deleteCategory(categoryId)" class="mr-2 w-32"> Yes, I'm sure</Button>
          <Button @click="deleteModal = !deleteModal" color="red" class="w-32"> No, cancel </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Button,
  Input,
  Spinner,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  Pagination,
  TableCell,
  Modal
} from 'flowbite-vue'
import axios from 'axios'
import { BASE_URL } from '../api'
import { useToast } from 'vue-toastification'

const categories = ref([])
const state = ref()
const category = reactive({
  name: '',
  description: '',
  user: ''
})
const categoryId = ref()
const cruDrawer = ref(false)
const deleteModal = ref(false)
const toast = useToast()
const searchQuery = ref('')

// Pagination data
const itemLength = ref()
const itemsPerPage = ref(10)
const currentPage = ref(1)

// Reset variable
const resetVar = () => {
  category.name = ''
  category.description = ''
  category.user = ''
  categoryId.value = ''
  state.value = ''
}

// Get categories
const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`)
    categories.value = response.data
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

// Refresh categories
const refreshCategories = () => {
  categories.value = []
  getCategories()
}

// Create category
const createCategory = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/category`, {
      name: category.name,
      description: category.description,
      user: category.user
    })
    console.log(response.data)
    getCategories()
    resetVar()
    cruDrawer.value = !cruDrawer.value
    toast.success(response.data.message)
  } catch (error) {
    console.log(error)
  }
}

// Read category
const getCategory = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}`)
    category.name = response.data.name
    category.description = response.data.description
    category.user = response.data.user
    cruDrawer.value = !cruDrawer.value
  } catch (error) {
    console.log(error)
  }
}

// Update category
const updateCategory = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/category/${id}`, {
      name: category.name,
      description: category.description,
      user: category.user
    })
    getCategories()
    resetVar()
    cruDrawer.value = !cruDrawer.value
    toast.success(response.data.message)
  } catch (e) {
    console.log(e)
  }
}

// Delete category
const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/category/${id}`)
    console.log(response.data)
    resetVar()
    getCategories()
    deleteModal.value = !deleteModal.value
    toast.success(response.data.message)
  } catch (error) {
    console.log(error)
  }
}

// Search and Paginate
const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  if (!query) {
    // Return all items if the search query is empty
    const searchResult = categories.value
    itemLength.value = Math.ceil(searchResult.length / itemsPerPage.value)
    return searchResult.slice(startIndex, endIndex)
  }
  const searchResult = categories.value.filter((category) => {
    // Perform case-insensitive matching on item properties you want to search
    // Searching by category name
    const nameMatch = category.name.toLowerCase().includes(query)
    const descriptionMatch = category.description.toLowerCase().includes(query)
    console.log(nameMatch)
    console.log(descriptionMatch)
    return nameMatch || descriptionMatch
  })
  // Set current page, item length, and return search result
  currentPage.value = 1
  itemLength.value = Math.ceil(searchResult.length / itemsPerPage.value)
  return searchResult.slice(startIndex, endIndex)
})

onMounted(() => {
  getCategories()
})
</script>
