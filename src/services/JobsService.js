import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Job } from "@/models/Job.js"
import { AppState } from "@/AppState.js"

class JobsService{
   async deleteJob(jobId) {
    const response = await api.delete(`api/jobs/${jobId}`)
    logger.log('deleted', response.data)
    const jobIndex = AppState.jobs.findIndex(job => job.id == jobId)
    AppState.jobs.splice(jobIndex,1)
   }
   async createJob(jobData) {
    const response = await api.post('api/jobs', jobData)
    logger.log('create job', response.data)

    const newJob = new Job(response.data)
    AppState.jobs.push(newJob)
   }

   async getJobs() {
       const response = await api.get('api/jobs')
       logger.log('get jobs list', response.data)
        
       const newJobs = response.data.map(jobPOJO => new Job(jobPOJO))
       AppState.jobs = newJobs
    }

}
export const jobsService = new JobsService()