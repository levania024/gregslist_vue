<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
    houseProp: { type: House, require: true }
})

const account = computed(() => AppState.account)

async function deleteHouse() {
    try {
        const wantsToDelete = await Pop.confirm('are you sure you want to delete this house')
        if (!wantsToDelete) { return }

        logger.log('deleted', props.houseProp.id)
        await housesService.deleteHouse(props.houseProp.id)
    }
    catch (error) {
        Pop.meow(error);
        logger.log(error)
    }

}
</script>


<template>
    <section class="row">
        <div class="col-md-4">
            <img :src="houseProp.imgUrl" :alt="houseProp.creatorName" class="img-fluid house-img">
        </div>
        <div class="col-md-8 my-3">
            <div>
                <h3> Bathrooms: {{ houseProp.bathrooms }} bedrooms: {{ houseProp.bedrooms }} </h3>
            </div>
            <div class="d-flex flex-column">
                <p>Levels: {{ houseProp.levels }} </p>
                <p>Price: {{ houseProp.priceCurrency }} </p>
                <p>Year: {{ houseProp.year }} </p>
                <p>Description: {{ houseProp.description }} </p>
                <p>Created at: {{ houseProp.createdAt.toLocaleString() }} </p>
            </div>
            <div class=" d-flex justify-content-end align-items-end">
                <img :src="houseProp.creatorPicture" :alt="houseProp.creatorName" class="img-fluid creator-img">
                <span>{{ houseProp.creatorName }}</span>
            </div>
            <div class="d-flex align-items-end">
                <button v-if="houseProp.creatorId == account?.id" @click="deleteHouse()" type="button"
                    class="btn btn-outline-danger">Delete House</button>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.row {
    border: 2px solid;
    box-shadow: 0 2px 15px rgb(172, 163, 163);
}

.house-img {
    height: 50dvh;
    width: 100%;
    object-fit: cover;
    object-position: cover;
}

.creator-img {
    height: 10dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    object-position: cover;
}
</style>