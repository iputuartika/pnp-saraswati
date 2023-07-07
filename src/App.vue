<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import PageWrapper from './components/PageWrapper.vue'
import { sidebarState } from '@/composables'
</script>

<template>
  <NavbarComponent />
  <Sidebar />
  <main :class="sidebarState.isOpen ? 'pl-64' : ''" class="h-screen dark:bg-gray-700 pt-16">
    <RouterView />
  </main>
</template>
