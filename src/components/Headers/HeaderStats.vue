<template>
  <!-- Header -->
  <div class="relative bg-blue-900 md:pt-32 pb-32 pt-12">
    <div class="px-2 md:px-10 mx-auto w-full">
      <div>
        <!--  stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-2">
            <Stats
              statSubtitle="Subscribers"
              :statTitle="subscribersQty"
              statIconName="fas fa-users"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-2">
            <Stats
              statSubtitle="Airlines"
              :statTitle="airlinesQty"
              statIconName="fas fa-plane-departure"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-2">
            <Stats
              statSubtitle="Suscriptions"
              :statTitle="subscriptionsQty"
              statIconName="fas fa-ticket-alt"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-2">
            <Stats
              statSubtitle="Exceptions"
              :statTitle="exceptionsQty"
              statIconName="fas fa-list-ol"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stats from "@/components/Stats.vue";

export default {
  components: {
    Stats,
  },
  computed: {
    subscribersQty () {
      return this.$store.getters['subscribers/getSubscribersQty']()
    },
    airlinesQty () {
      return this.$store.getters['airlines/getAirlinesQty']()
    },
    subscriptionsQty () {
      return this.$store.getters['subscriptions/getSubscriptionsQty']()
    },
    exceptionsQty () {
      return this.$store.getters['exceptions/getExceptionsQty']()
    }
  }
};
</script>
