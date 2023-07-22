<template>
  <div v-if="dataFromLocalStorage">
    <h1>Welcome {{ dataFromLocalStorage.user.name }}</h1>
    <button @click="logoutUser">Logout</button>
  </div>
  <div v-else>
    <form @submit.prevent="loginUser">
      <input v-model="login.email" type="email" />
      <input v-model="login.password" type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/user'
import { BASE_URL } from '../api'
import { RouterView } from 'vue-router'
import router from '@/router'

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
    router.push('/data/category')
  } catch (error) {
    console.log(error)
  }
}

const logoutUser = () => {
  userStore.logout()
}

const storedData = localStorage.getItem('user_data') // Replace 'key' with the key you used to store the data

// Access the value from localStorage
const dataFromLocalStorage = JSON.parse(storedData) // Convert to object if needed
console.log(dataFromLocalStorage)
</script>
