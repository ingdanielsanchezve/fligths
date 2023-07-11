<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <header-stats />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>

<script>

import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin
  },
  computed: {
    errorResponse () {
      return this.$store.getters['general/getErrorResponse']()
    }
  },
  watch: {
    errorResponse (newVal) {
      if (newVal) {
        this.$toast.error ('There was an error trying to fetch data, plese refresh the page', { dismissible: false, duration: false, queue: true })
      }
    }
  }
};
</script>
