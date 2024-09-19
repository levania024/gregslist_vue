export class Job{
    constructor(data){
        this.id = data.id
        this.company = data.company
        this.jobTitle = data.jobTitle
        this.hours = data.hours
        this.rate = data.rate
        this.description = data.description
        this.creatorId = data.creatorId
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt) 
        this.creatorName = data.creator.name
        this.creatorPicture= data.creator.picture
    }
}

// const data = {
//     "_id": "6476d752403259fa173a74ba",
//     "company": "SuperDuperCoolPlace",
//     "jobTitle": "Software Developer",
//     "hours": 40,
//     "rate": 1000000,
//     "description": "Are you Super Duper Cool enough?",
//     "creatorId": "646424169346a51b7a721e71",
//     "createdAt": "2023-05-31T05:12:50.403Z",
//     "updatedAt": "2023-05-31T05:12:50.403Z",
//     "__v": 0,
//     "creator": {
//         "_id": "646424169346a51b7a721e71",
//         "name": "Code-y BeepBoop",
//         "picture": "https://68.media.tumblr.com/66dd12f943a2496adcb6d556025a2d96/tumblr_oklf80RKa21shq9dbo1_400.gif",
//         "id": "646424169346a51b7a721e71"
//     },
//     "id": "6476d752403259fa173a74ba"
// }