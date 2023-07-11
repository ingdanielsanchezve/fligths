<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <SubscriptionsModal
        v-if="shoudlShowModal"
        @toggleModal="toggleModal"
      />
      <div class="w-full xl:w-7/12 mb-12 xl:mb-0 px-2">
        <Subscribers
          class="max-h-140 overflow-y-scroll"
          @showModal="showModal"
        />
      </div>
      <div class="w-full xl:w-5/12 px-2">
        <Airlines />
      </div>
    </div>
  </div>
</template>
<script>
import SubscriptionsModal from '@/components/SubscriptionsModal.vue';
import Subscribers from "@/components/Subscribers.vue";
import Airlines from "@/components/Airlines.vue";

export default {
  name: "dashboard-page",
  components: {
    Subscribers,
    Airlines,
    SubscriptionsModal
  },
  data () {
    return {
      shoudlShowModal: false,
    }
  },
  async mounted () {
    await this.$store.dispatch('general/LOAD_DATA')
  },
  methods: {
    async getSubscription (subscriptionId) {
      await this.$store.dispatch('subscriptions/GET_SUBSCRIPTION', subscriptionId)
    },
    showModal (subscriptionId) {
      this.getSubscription(subscriptionId)
      this.toggleModal()
    },
    toggleModal () {
      this.shoudlShowModal = !this.shoudlShowModal
    }
  }
};
</script>
