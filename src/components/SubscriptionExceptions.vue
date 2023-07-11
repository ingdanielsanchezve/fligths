<template>
  <div>
    <div v-if="hasExceptions" class="mt-3">

      <div class="flex flex-row">
        <div class="basis-3/4">
          <h3 class="font-semibold text-base text-blueGray-700">
            Subscription Exceptions
          </h3>
        </div>
        <div class="relative w-full flex-grow flex-1 text-right">
          <a class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer" title="Hide Exceptions Log"
            @click="showExceptionsList()">
            <i class="fas fa-times"></i>
          </a>
        </div>
      </div>

      <div class="mt-2 max-h-72 overflow-y-scroll">

        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Date
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Type
              </th>
              <th
                class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exception in exceptions" :key="exception.id">
              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" >
                {{ formatDate(exception.createdAt) }}
              </td>
              <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize font-bold" >
                <i v-if="exception.exceptionType === ADDITION" class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                <i v-if="exception.exceptionType === DEDUCTION" class="fas fa-arrow-down text-orange-500 mr-4"></i>
                {{ exception.exceptionType }}
              </td>
              <td
                class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize"
              >
              {{ exception.reason.description }}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div v-else class="text-amber-500 text-sm px-6 py-4 border-0 rounded relative mb-4 bg-amber-50">
      <span class="text-xl inline-block mr-5 align-middle">
        <i class="fas fa-bell"></i>
      </span>
      <span class="inline-block align-middle mr-8">
        <b class="capitalize">Info</b> This subscriptions fligths quota has not been modified
      </span>
      <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" @click="showExceptionsList()">
        <span>×</span>
      </button>
    </div>
  </div>
</template>


<script>
const ADDITION = 'addition'
const DEDUCTION = 'deduction'

export default {
  data() {
    return {
      ADDITION,
      DEDUCTION
    }
  },
  props: {
    subscription: {
      required: true,
      default: () => ({}),
    }
  },
  computed: {
    exceptions () {
      return this.$store.getters['exceptions/getExceptions']
    },
    hasExceptions () {
      return this.exceptions.length
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric' }).format(date);
    },
    showExceptionsList () {
      this.$emit('showExceptionsList')
    }
  }
}
</script>