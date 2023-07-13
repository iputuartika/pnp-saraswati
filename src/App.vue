<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarState } from '@/composables'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'

// const rout = useRoute()
</script>

<template>
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
    <div class="pb-2">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>
