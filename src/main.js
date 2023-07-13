// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import tailwindcss
import './index.css'

// import flowbite
import 'flowbite'

// import vue-toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const options = {
  // You can set your default options here
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options)

app.mount('#app')
