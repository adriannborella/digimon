<template>
  <header class="w-full bg-yellow-200">
    <NavBar />
  </header>

  <div class="ml-10 mr-10 mt-5">
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

import digimonList from '@/assets/db.json'
import DigimonList from './components/DigimonList.vue';
import { ref } from 'vue';

const digimons = ref(digimonList);

</script>