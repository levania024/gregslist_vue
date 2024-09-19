<script setup>
import { AppState } from '@/AppState.js';
import HouseForm from '@/components/globals/HouseForm.vue';
import HouseListing from '@/components/globals/HouseListing.vue';
import { housesService } from '@/services/HousesService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)

onMounted(() =>
    getHouses()
)

async function getHouses() {
    try {
        await housesService.getHouses()
    }
    catch (error) {
        Pop.meow(error);
    }
}
</script>

<template>
    <div class="container">
        <h1> House</h1>
        <section class="row">
            <div v-if="account" class="col-12">
                <HouseForm />
            </div>
        </section>
        <section class="row">
            <div v-for="house in houses" :key="house.id" class="col-12 mb-3">
                <HouseListing :houseProp="house" />
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped></style>