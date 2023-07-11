import { BaseApiService } from './baseApi.service'

const ENDPOINTS= {
  airlines: '/airlines?_embed=subscriptionsPlans'
}

export class airlinesService extends BaseApiService{

  async getAirlines () {
    try {
      return await this.apiRequest(ENDPOINTS.airlines)
    } catch (error) {
      console.error('Error reading airlines:', error)
    }
  }

}