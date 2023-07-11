import { BaseApiService } from './baseApi.service'

const ENDPOINTS= {
  subscribers: '/subscribers?_embed=subscriptions'
}

export class SubscribersService extends BaseApiService{

  async getSubscribers () {
    return await this.apiRequest(ENDPOINTS.subscribers)
  }

}