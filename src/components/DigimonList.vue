<template>
    <!-- Table -->
    <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header class="px-5 py-4 border-b border-gray-100">
            <h2 class="font-semibold text-gray-800">{{ title }}</h2>
        </header>
        <div class="p-3">
            <div class="overflow-x-auto">
                <table class="table-auto w-full">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Name</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Type</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-center">Conditions</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Weight</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Care Mistakes</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                                <div class="font-semibold text-left">Bonus Condition</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-100">
                        <tr v-for="(digimon) in digimonList" :key="digimon?.name" @click="selectDigimon(digimon.name)"
                            class="hover:bg-gray-100 cursor-pointer">
                            <td class="p-2 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="w-20 h-20 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full"
                                            :src="digimon.img || 'https://ih1.redbubble.net/image.512695038.1616/st,small,507x507-pad,600x600,f8f8f8.u8.jpg'"
                                            width="64" height="64" alt="Alex Shatov"></div>
                                    <div class="font-medium text-gray-800">{{ digimon.name }}</div>
                                </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left">{{ digimon.type }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-xs">{{ digimon.condition }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left font-medium">{{ digimon.weight }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left font-medium">{{ digimon.care_mistakes }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left font-medium">{{ digimon.bonus_condition }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import type { Digimon } from '@/interfaces'
const router = useRouter();

defineProps<{ digimonList: Array<Digimon>, title: string }>();

function selectDigimon(digimonName: string) {
    router.push({ name: 'digimon-card', params: { digimonId: digimonName } });
}

</script>