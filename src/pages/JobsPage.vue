<script setup>
import { AppState } from '@/AppState.js';
import JobForm from '@/components/JobForm.vue';
import JobListing from '@/components/JobListing.vue';
import { jobsService } from '@/services/JobsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => getJobs())

const jobs = computed(() => AppState.jobs)
const account = computed(() => AppState.account)

async function getJobs() {
    try {
        await jobsService.getJobs()
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
            <div v-if="account" class="col-12">
                <JobForm />
            </div>
        </section>
        <h1>Welcome to the job page</h1>
        <section class="row">
            <div v-for="job in jobs" :key="job.id" class="col-12">
                <JobListing :jobsProp="job" />
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped></style>