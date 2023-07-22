<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useUserStore } from './stores/user'
import router from '@/router'
import NavbarComponent from './components/NavbarComponent.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarState } from '@/composables'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'

// const rout = useRoute()
const login = reactive({
  email: '',
  password: ''
})

const loginData = ref()

const userStore = useUserStore()

const loginUser = async () => {
  try {
    await userStore.login(login.email, login.password)
    loginData.value = userStore.user.user
    console.log('Selamat datang', userStore.user)
  } catch (error) {
    console.log(error)
  }
}

const storedData = localStorage.getItem('user_data') // Replace 'key' with the key you used to store the data

// Access the value from localStorage
const dataFromLocalStorage = JSON.parse(storedData) // Convert to object if needed
console.log(dataFromLocalStorage)
</script>

<template>
  <div v-if="dataFromLocalStorage">
    <NavbarComponent />
    <Sidebar />
    <main
      :class="sidebarState.isOpen ? 'md:pl-20 lg:pl-72' : 'md:pl-20 lg:pl-24'"
      class="px-0 md:px-4 lg:px-8 min-h-screen bg-slate-200 dark:bg-gray-900 pt-16 pb-16 sm:pb-11"
    >
      <div class="pb-2">
        <!-- {{ rout.name }} > {{ rout.matched[0].children.name }} -->
        <Breadcrumb />
      </div>
      <div class="pb-4">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
  <div v-else></div>
</template>
