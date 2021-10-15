<template>
<v-main>
  <app-main-navbar></app-main-navbar>
  <v-alert
      dismissible
      elevation="7"
      transition="scale-transition"
      class="ma-0"
      :type="$store.state.message.type"
      v-if="$store.state.message">
    {{$store.state.message.value}}
  </v-alert>
  <router-view></router-view>
</v-main>
</template>

<script>
import AppMainNavbar from "@/components/AppMainNavbar";
export default {
  name: "MainLayout",
  components: {AppMainNavbar},
  methods: {
    logout() {
      this.$store.commit('auth/logout')
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>

</style>
