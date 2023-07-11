<template>
  <div>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-[30%] md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:max-w-3xl">

            <SubscriptionsDetails
              v-if="isSubscriptionLoaded"
              class="bg-white px-4 py-4 sm:p-6 sm:pb-4"
              :is-subscription-loaded="isSubscriptionLoaded"
              :airline="airline"
              :subscription="subscription"
              @showExceptionsList="showExceptionsList"
              @showQuotaEditor="showQuotaEditor"
              @toggleModal="toggleModal"
            />
            <SubscriptionExceptions
              v-if="shouldShowExceptions"
              class="bg-white px-4 py-4 sm:p-6 sm:pb-4"
              @showExceptionsList="showExceptionsList"
              :subscription="subscription"
            />
            <SubscriptionQuotaEditor
              v-if="shouldShowEditor"
              class="bg-white px-4 py-4 sm:p-6 sm:pb-4"
              @showQuotaEditor="showQuotaEditor"
              :subscription="subscription"
              @saveException="saveException"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShortUniqueId from 'short-unique-id'

import SubscriptionsDetails from './SubscriptionsDetails'
import SubscriptionExceptions from './SubscriptionExceptions.vue'
import SubscriptionQuotaEditor from './SubscriptionQuotaEditor'

export default {
  components: {
    SubscriptionsDetails,
    SubscriptionExceptions,
    SubscriptionQuotaEditor
  },
  computed: {
    subscription () {
      return this.$store.getters['subscriptions/getSubscription']()
    },
    airline () {
      return this.$store.getters['airlines/getAirline'](this.subscription.subscriptionsPlan.airlineId)
    },
    isSubscriptionLoaded (){
      return Object.keys(this.subscription).length
    }
  },
  data () {
    return {
      shouldShowEditor: false,
      shouldShowExceptions: false,
    }
  },
  methods: {
    toggleModal () {
      this.$emit('toggleModal')
    },
    showQuotaEditor () {
      this.shouldShowEditor = !this.shouldShowEditor
    },
    async showExceptionsList () {
      await this.$store.dispatch('exceptions/GET_EXCEPTIONS_BY_SUBSCRIPTION', this.subscription.id)
      this.shouldShowExceptions = !this.shouldShowExceptions
    },
    async saveException (exceptionData) {
      const updatedSubscription = {
        id: this.subscription.id,
        subscriberId: this.subscription.subscriberId,
        subscriptionsPlanId: this.subscription.subscriptionsPlanId,
        current_quota: exceptionData.currentQuota,
        createdAt: this.subscription.createdAt,
        updatedAt: new Date().toISOString()
      }

      const uid = new ShortUniqueId({ length: 24 })
      const newException = {
        id: uid(),
        reasonId: exceptionData.exceptionReason.id,
        subscriptionId: this.subscription.id,
        exceptionType: exceptionData.exceptionType,
        createdAt: new Date().toISOString()
      }

      try {
        await Promise.all([
          this.$store.dispatch('exceptions/CREATE_EXCEPTION', newException),
          this.$store.dispatch('subscriptions/UPDATE_SUBSCRIPTION', updatedSubscription),
          this.$store.dispatch('exceptions/GET_EXCEPTIONS')
        ])
      } catch (err) {
        this.$toast.error('There was an error updating the Subscription, please try again')
        throw new Error(err)
      } finally {
        this.isBntDisabled = true
        this.resetEditor = true
        await Promise.all([
         this.$store.dispatch('exceptions/GET_EXCEPTIONS_BY_SUBSCRIPTION', this.subscription.id)
        ])
        this.$toast.success('Subscription updated succesfully!!!')
      }
    }
  }
}
</script>