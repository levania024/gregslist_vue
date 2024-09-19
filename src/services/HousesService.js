import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { House } from "@/models/House.js"
import { AppState } from "@/AppState.js"

class HousesService{
    async deleteHouse(houseId) {
       const response = await api.delete(`api/houses/${houseId}`)
       logger.log('deleted', response.data)
       const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
       AppState.houses.splice(houseIndex,1)
    }

   async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        logger.log('create house', response.data)

        const newHouse = new House(response.data)
        AppState.houses.push(newHouse)
    }

    async getHouses() {
        const response = await api.get('api/houses')
        logger.log('get houses list', response.data)
        const newHouse = response.data.map(housePOJO => new House(housePOJO))
        AppState.houses = newHouse
    }



}
export const housesService = new HousesService()