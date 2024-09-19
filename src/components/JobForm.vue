<script setup>
import { jobsService } from '@/services/JobsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';

const editableJobData = ref({
    company: '',
    jobTitle: '',
    hours: '',
    rate: '',
    description: '',
})

async function createJob() {
    try {
        const jobData = editableJobData.value

        await jobsService.createJob(jobData)

        editableJobData.value = {
            company: '',
            jobTitle: '',
            hours: '',
            rate: '',
            description: '',
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
                <form @submit.prevent="createJob()">
                    <div class="mb-3">
                        <label for="company" class="form-label mt-3">Company</label>
                        <input v-model="editableJobData.company" type="text" class="form-control" id="company"
                            name="company" required min="1" maxlength="100" placeholder="company name">
                    </div>
                    <div class="mb-3">
                        <label for="jobTitle" class="form-label">jobTitle</label>
                        <input v-model="editableJobData.jobTitle" type="text" class="form-control" id="jobTitle"
                            name="jobTitle" required maxlength="100" placeholder="jobTitle">
                    </div>
                    <div class="mb-3">
                        <label for="hours" class="form-label">hours</label>
                        <input v-model="editableJobData.hours" type="number" class="form-control" id="hours"
                            name="hours" required placeholder="hours">
                    </div>
                    <div class="mb-3">
                        <label for="rate" class="form-label">rate</label>
                        <input v-model="editableJobData.rate" type="number" class="form-control" id="rate" name="rate"
                            required placeholder="rate">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea v-model="editableJobData.description" class="form-control" id="description"
                            name="description" maxlength="5000" placeholder="job description"></textarea>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary mb-3">Create Job Listing</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped></style>