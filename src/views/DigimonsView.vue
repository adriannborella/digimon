<template>
    <DigimonList :digimonList="digimons" title="Digimons" />
</template>

<script setup lang="ts">
import db from '@/assets/db.json'
import DigimonList from '@/components/DigimonList.vue';
import type { Digimon } from '@/interfaces'
import { ref } from 'vue';


const digimons = ref<Digimon[]>(Object.values(db));

</script>