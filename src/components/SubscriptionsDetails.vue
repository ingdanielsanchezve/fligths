<template>
  <div>
    <div class="mt-3">

      <div class="flex flex-row">
        <div class="basis-1/2">
          <h3 class="font-semibold text-base text-blueGray-700">
            Subscriptions Details
          </h3>
        </div>
        <div class="relative w-full flex-grow flex-1 text-right">
          <a class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
            @click="toggleModal()">
            <i class="fas fa-times"></i>
          </a>
        </div>
      </div>

      <div class="mt-2 overflow-x-scroll">

        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Airline
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Contracted Plan
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Contracted Quota
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Current Quota
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Period
              </th>
              <th class="px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
              <th class="px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"></th>
            </tr>
          </thead>
          <tbody v-if="isSubscriptionLoaded" class="text-center">
            <tr>
              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
                {{ airline.name }}
              </td>
              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
                {{ subscription?.subscriptionsPlan.pretty_name }}
              </td>
              <td
                class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ subscription.subscriptionsPlan.quota }} fligths
              </td>
              <td
                class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ subscription.current_quota }} fligths
              </td>
<td
                class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{ subscription.subscriptionsPlan.installments_frequency }}
              </td>
<td
                class="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                <a
                  title="Edit subscriber fligths quota"
                  class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                  @click="showQuotaEditor()"
                >
                  <i class="fas fa-edit"></i>
                </a>
              </td>
              <td
                class="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                <a
                  title="Show Exceptions Log"
                  class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                  @click="showExceptionsList()"
                >
                  <i class="fas fa-eye"></i>
                </a>
              </td>

            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    isSubscriptionLoaded: {
      required: true,
      default: false
    },
    subscription: {
      required: true,
      default: () => ({}),
    },
    airline: {
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    showQuotaEditor () {
      this.$emit('showQuotaEditor')
    },
    showExceptionsList () {
      this.$emit('showExceptionsList')
    },
    toggleModal () {
      this.$emit('toggleModal')
    },
  }
}
</script>