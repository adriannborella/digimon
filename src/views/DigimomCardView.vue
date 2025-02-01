<template>
    <!-- component -->
    <div class="">
        <div class="shadow-md bg-clip-border rounded-xl bg-white p-4 mb-4">
            <button class="bg-grey-light 
                    hover:bg-blue 
                    text-grey-darkest 
                    cursor-pointer
                    font-bold py-2 px-4 rounded inline-flex items-center" @click="goBack">
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#000000"></path>
                        </g>
                    </svg>
                </svg>
                <span>Atras</span>
            </button>
        </div>
        <div class="mx-auto" v-if="digimonData">
            <!-- Centering wrapper -->
            <div class="relative text-gray-700 bg-white shadow-md bg-clip-border rounded-xl flex flex-row">
                <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
                    <img :src="digimonData?.img" alt="card-image" class="object-cover w-full h-full" />
                </div>
                <div class="p-6">
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {{ digimonName }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Type: {{ digimonData.type }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Active Hours: {{ digimonData.active_hours }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Care Mistakes: {{ digimonData.care_mistakes }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Weight: {{ digimonData.weight }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Condition: {{ digimonData.condition }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Bonus Condition: {{ digimonData.bonus_condition }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Special Condition: {{ digimonData.spectial_condition }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Digivolving Items: {{ digimonData.digivolvin_items }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Finish Technique: {{ digimonData.finish_technique }}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Possible Digimon:
                    </p>
                    <ul class="list-disc list-inside">
                        <li v-for="digimon in digimonData.possible_digimon" :key="digimon">
                            <RouterLink :to="{ name: 'digimon-card', params: { digimonId: digimon } }">
                                {{ digimon }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-5 shadow-md bg-clip-border rounded-xl" v-if="evolutions.length">
                <DigimonList :digimon-list="evolutions" title="Evolutions" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue';
import type { Digimon } from '@/interfaces'
import db from '@/assets/db.json'
import { useRoute, useRouter } from 'vue-router';
import DigimonList from '@/components/DigimonList.vue';

const route = useRoute();
const router = useRouter();
const digimonData = ref<Digimon>();
const digimonName = ref('');
const digimons = ref<Record<string, Digimon>>(db);

function setDigimonData(digimonId: string) {
    digimonName.value = digimonId
    digimonData.value = digimons.value[digimonId]
}

onMounted(() => {
    const digimonId = route.params.digimonId
    if (typeof digimonId === 'string') {
        setDigimonData(digimonId)
    }
})

watch(route, (newValue) => {
    const digimonId = newValue.params.digimonId
    if (typeof digimonId === 'string') {
        setDigimonData(digimonId)
    }
});

const evolutions = computed(() => {
    const result = new Array<Digimon>()

    if (!digimonName.value || !digimonData.value || digimonData.value.digivolve_to.includes('N/A')) return result

    console.log(digimonData.value)

    const evoultionAvailable = digimonData.value.digivolve_to.filter((evolution: string) => {
        return digimons.value.hasOwnProperty(evolution)
    })

    return evoultionAvailable.map((evolution: string) => {
        return digimons.value[evolution]
    })
})

function goBack() {
    router.back()
}
</script>