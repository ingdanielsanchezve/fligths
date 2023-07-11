<template>
  <div class="container px-4 mx-auto">

  <div class="flex flex-row">
    <div class="basis-4/5">
      <h3 class="w-full font-bold">
        Edit fligths
      </h3>
      <p class="w-full text-xs">
        Add or remove fligths from the subscriber
      </p>
    </div>
    <div class="relative w-full flex-grow flex-1 text-right">
      <a class="text-blueGray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
        @click="showQuotaEditor()">
        <i class="fas fa-times"></i>
      </a>
    </div>
  </div>
  <div class="flex flex-wrap pt-4">

    <div class="md:w-2/5 w-full md:pr-2">
      <span class="flex flex-wrap align-center justify-center pb-2 bg-slate-200">
          Fligths Left
      </span>
      <div class="flex flex-wrap align-center justify-center pb-4 bg-slate-200">
        <div class="w-2/12 py-4 bg-white">
          <div class="relative w-full text-center">
            <button
              class="text-blueGray-500 bg-slate-200 rounded-full px-2 py-1 font-bold uppercase text-xs border border-solid focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              :disabled="shouldDisableDeductionBtn"
              :class="{ 'disabled:opacity-25': shouldDisableDeductionBtn }"
              @click="removeQuota"
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="w-3/12 bg-white">
          <div class="relative w-full mt-2">
            <input
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none w-full ease-linear transition-all duration-150 text-center cursor-pointer"
              readonly
              max="10"
              maxlength="2"
              placeholder="quota"
              v-model="currentQuota"
            >
          </div>
        </div>
        <div class="w-2/12 py-4 bg-white">
          <div class="relative w-full text-center">
            <button
              class="text-blueGray-500 bg-slate-200 rounded-full px-2 py-1 font-bold uppercase text-xs  border border-solid focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              :disabled="shouldDisableAdditionBtn"
              :class="{ 'disabled:opacity-25': shouldDisableAdditionBtn }"
              @click="addQuota"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="md:w-3/5 w-full mt-4 md:mt-0">
      <div class="select-wrapper">
        <select
         class="select-wrapper border border-solid px-3 py-3 w-full text-slate-600"
         v-model="exceptionReason"
         @click="checkQuotaIsChanged"
         @change="enableSaveBtn"
        >
          <option value="" disabled>What is the motive?</option>
          <option
            v-for="reason in reasonsList"
            :key="reason.id"
            :value="reason"
          >
            {{ reason.description }}
          </option>
        </select>
      </div>
      <p v-if="showReasonsHelp" class="w-full text-sm text-red py-2 text-blue-400 text-right">
        Please change fligths quota before <i class="fas fa-exclamation"></i>
      </p>
    </div>
  </div>

  <div class="py-3 sm:flex sm:flex-row-reverse">
    <button
      title="Save changes"
      class="inline-flex w-full justify-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto cursor-pointer"
      :class="{
        'enabled:hover:bg-blue-600': !isBntDisabled,
        'disabled:opacity-25': isBntDisabled
      }"
      :disabled="isBntDisabled"
      @click="saveException"
    >
      Save Changes
    </button>
  </div>
</div>
</template>

<script>
const MIN_FLIGHTS_ALLOWED = 0
const MAX_FLIGHTS_ALLOWED = 3

const ADDITION = 'addition'
const DEDUCTION = 'deduction'

export default {
  props: {
    subscription: {
      required: true,
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      currentQuota: this.subscription.current_quota,
      reasonsList: [],
      exceptionReason: '',
      exceptionType: '',
      showReasonsHelp: false,
      quotaChanged: false,
      isBntDisabled: true,
      MIN_FLIGHTS_ALLOWED,
      MAX_FLIGHTS_ALLOWED
    }
  },
  computed: {
    additionReasons () {
      return this.$store.getters['subscriptions/getAdditionReasons']()
    },
    deductionReasons () {
      return this.$store.getters['subscriptions/getDeductionReasons']()
    },
    shouldDisableAdditionBtn () {
      return this.currentQuota == MAX_FLIGHTS_ALLOWED
    },
    shouldDisableDeductionBtn () {
      return this.currentQuota == MIN_FLIGHTS_ALLOWED
    }
  },
  async mounted () {
    await this.$store.dispatch('subscriptions/GET_EXCEPTION_REASONS')
  },
  methods: {
    showQuotaEditor () {
      this.$emit('showQuotaEditor');
    },
    checkQuotaIsChanged () {
      if (!this.quotaChanged) {
        this.showReasonsHelp = true
      }
    },
    addQuota () {
      if (this.currentQuota <= MAX_FLIGHTS_ALLOWED) {
        this.prepareForm()
        this.reasonsList = this.additionReasons
        this.exceptionType = ADDITION
        this.currentQuota++
      }
    },
    removeQuota () {
      if (this.currentQuota >= MIN_FLIGHTS_ALLOWED) {
        this.prepareForm()
        this.reasonsList = this.deductionReasons
        this.exceptionType = DEDUCTION
        this.currentQuota--
      }
    },
    prepareForm () {
      this.reasonsList = []
      this.showReasonsHelp = false
      this.exceptionReason = ''
      this.quotaChanged = true
      this.isBntDisabled= true
    },
    enableSaveBtn () {
      this.isBntDisabled = false
    },
    saveException () {
      if (this.exceptionReason) {
        const exceptionData = {
          currentQuota: this.currentQuota,
          exceptionReason: this.exceptionReason,
          exceptionType: this.exceptionType
        }
        this.$emit('saveException', exceptionData)
        this.prepareForm()
      }
    }
  }
}
</script>

<style scoped>
select {
  -webkit-appearance: none;
  appearance: none;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "▼";
  font-size: 1rem;
  top: 14px;
  right: 10px;
  position: absolute;
}

</style>