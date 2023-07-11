import { BaseApiService } from './baseApi.service'

const ENDPOINTS = {
  allSubscriptions: '/subscriptions?_expand=subscriptionsPlan',
  subscriptionsById: '/subscriptions/:id?_expand=subscriptionsPlan',
  subscriptions: '/subscriptions/:id',
  exceptionReasons: '/reasons'
}

export class subscriptionsService extends BaseApiService{
  async getSubscriptions () {
    return await this.apiRequest(ENDPOINTS.allSubscriptions)
  }

  async getSubscriptionsById (subscriptionsId) {
    return await this.apiRequest(ENDPOINTS.subscriptionsById.replace(':id', subscriptionsId))
  }

  async getReasons () {
    return await this.apiRequest(ENDPOINTS.exceptionReasons)
  }

  async updateSubscription (subscriptionData) {
    return await this.apiRequest(ENDPOINTS.subscriptions.replace(':id', subscriptionData.id), 'PUT', subscriptionData)
  }
}