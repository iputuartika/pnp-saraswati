import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { BASE_URL } from '../api'
import router from '../router'

const LOCAL_STORAGE_KEY = 'user_data'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email,
          password
        })
        this.user = response.data

        const store = localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response.data)) // Store the user data in localStorage
        console.log('Login berhasil', response.data, store)
        router.push('/home')
      } catch (error) {
        console.log(error)
      }
    },

    logout() {
      this.user = null
      localStorage.setItem(LOCAL_STORAGE_KEY, null)
      console.log('Berhasil logout')
      router.push('/login')
    }
  },

  // Initialize the store state when the store is created
  // Use a callback to set the initial state from localStorage, if available
  init: (store) => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (userData) {
      store.user = JSON.parse(userData)
    }
  }
})
