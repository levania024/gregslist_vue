<script setup>
import { AppState } from '@/AppState.js';
import { Job } from '@/models/Job.js';
import { jobsService } from '@/services/JobsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const props = defineProps({
    jobsProp: { type: Job, require: true }
})

const account = computed(() => AppState.account)

async function deleteJob() {
    try {
        const wantsToDelete = await Pop.confirm('are you sure you want to delete this house')
        if (!wantsToDelete) { return }

        logger.log('deleted', props.jobsProp.id)
        await jobsService.deleteJob(props.jobsProp.id)
    }
    catch (error) {
        Pop.meow(error);
        logger.log(error)
    }

}
</script>


<template>
    <div class="col-md-4">
        <h5>{{ jobsProp.jobTitle }}</h5>
    </div>
    <div class="col-md-8">
        <div class="bg-light shadow my-3 p-2">
            <p class="p-2">{{ jobsProp.company }} is hiring {{ jobsProp.description }} If your ready to work be
                ready to work {{ jobsProp.hours }} a week. And best on the rating {{ jobsProp.rate }}, we are the best
                place you will want to be working. As a {{ jobsProp.jobTitle }}, you should get ready to have fun coding
                !!!!. But remember to code small and smart!!!!!!!
            </p>
        </div>
        <div class="d-flex align-items-end justify-content-end my-3">
            <button v-if="jobsProp.creatorId == account?.id" @click="deleteJob()" type="button"
                class="btn btn-outline-danger">Delete House</button>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>