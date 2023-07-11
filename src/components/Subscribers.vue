<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-2 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">
            Subscribers
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
            <th
              class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Name
            </th>
            <th
              class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Email
            </th>
            <th
              class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Phone
            </th>
            <th
              class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Country
            </th>
            <th class="px-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="subscriber in subscribersData" :key="subscriber.id">
            <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              <img
                :src="subscriber.avatar"
                class="h-12 w-12 max-w-none bg-white rounded-full border"
                alt="..."
              />
            </th>
            <td
              class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left"
            >
                {{ subscriber.first_name }} {{ subscriber.last_name }}
            </td>
            <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
              {{ subscriber.email }}
            </td>
            <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
            {{ subscriber.phone }}
            </td>
            <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ subscriber.country }}
            </td>
            <td
              class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
            <a class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
              title="Check subscription details"
              @click="showSubscriptionModal(subscriber.subscriptions[0].id)">
                <i class="fas fa-list"></i>
            </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      showModal: false,
      subscriptionId: ''
    }
  },
  computed: {
    subscribersData() {
      return this.$store.getters['subscribers/getSubscribersData']()
    }
  },
  methods: {
    showSubscriptionModal (subscriptionId) {
      this.$emit('showModal', subscriptionId)
    }
  }
}
</script>

<style>
.tbody {
  overflow-y: auto;
  max-height: 50rem;
}
</style>