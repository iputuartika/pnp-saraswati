<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarState } from '@/composables'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <NavbarComponent />
  <Sidebar />
  <main
    :class="sidebarState.isOpen ? 'md:pl-70' : 'md:pl-20'"
    class="px-0 md:px-8 min-h-screen dark:bg-gray-900 py-16 pl-"
  >
    <div class="pb-2">
      <Breadcrumb />
    </div>
    <div class="pb-2">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>
