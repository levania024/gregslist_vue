<script setup>
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';

const currentYear = new Date().getFullYear()

const editableHouseData = ref({
    bedrooms: '',
    bathrooms: '',
    levels: '',
    imgUrl: '',
    year: currentYear,
    price: 0,
    description: ''
})

async function createHouse() {
    try {
        const houseData = editableHouseData.value
        await housesService.createHouse(houseData)
        editableHouseData.value = {
            bedrooms: '',
            bathrooms: '',
            levels: '',
            imgUrl: '',
            year: currentYear,
            price: 0,
            description: ''
        }
    }
    catch (error) {
        Pop.meow(error);
        logger.log(error)
    }
}
</script>

<template>
    <div class="container">
        <section class="row">
            <div class="col-12">
                <form @submit.prevent="createHouse()">
                    <div class="mb-3">
                        <label for="bedrooms" class="form-label mt-3">Bedrooms</label>
                        <input v-model="editableHouseData.bedrooms" type="number" class="form-control" id="bedrooms"
                            name="bedrooms" required min="1" placeholder="Number of bedrooms">
                    </div>
                    <div class="mb-3">
                        <label for="bathrooms" class="form-label">Bathrooms</label>
                        <input v-model="editableHouseData.bathrooms" type="number" class="form-control" id="bathrooms"
                            name="bathrooms" required min="1" placeholder="Number of bathrooms">
                    </div>
                    <div class="mb-3">
                        <label for="levels" class="form-label">Levels</label>
                        <input v-model="editableHouseData.levels" type="number" class="form-control" id="levels"
                            name="levels" required min="1" placeholder="Number of levels">
                    </div>
                    <div class="mb-3">
                        <label for="imgUrl" class="form-label">Image URL</label>
                        <input v-model="editableHouseData.imgUrl" type="url" class="form-control" id="imgUrl"
                            name="imgUrl" required maxlength="500" placeholder="House image URL">
                    </div>
                    <div class="mb-3">
                        <label for="year" class="form-label">Year</label>
                        <input v-model="editableHouseData.year" type="number" class="form-control" id="year" name="year"
                            required min="1800" max="currentYear + 1" placeholder="Year built">
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Price</label>
                        <input v-model="editableHouseData.price" type="number" class="form-control" id="price"
                            name="price" required min="0" placeholder="Price">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea v-model="editableHouseData.description" class="form-control" id="description"
                            name="description" maxlength="500" placeholder="House description"></textarea>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary mb-3">Create House Listing</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped></style>