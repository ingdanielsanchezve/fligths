import { BaseApiService } from './baseApi.service'

const ENDPOINTS= {
  allExceptions: '/exceptions?_expand=reason',
  exceptions: '/exceptions',
  exceptionsBySubscriptionId: '/exceptions?subscriptionId=:id&_expand=reason'
}

export class exceptionsService extends BaseApiService{
  async getExceptions () {
    return await this.apiRequest(ENDPOINTS.allExceptions)
  }

  async getExceptionsBySubscriptionId (subscriptionId) {
    return await this.apiRequest(ENDPOINTS.exceptionsBySubscriptionId.replace(':id', subscriptionId))
  }

  async createException (exceptionData) {
    return await this.apiRequest(ENDPOINTS.allExceptions, 'POST', exceptionData);
  }

}