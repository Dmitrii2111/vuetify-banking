<template>
  <v-app>
    <v-main>
      <auth-nav-bar></auth-nav-bar>
      <v-alert
          dismissible
          elevation="7"
          transition="scale-transition"
          class="ma-0"
          :type="$store.state.message.type"
          v-if="$store.state.message"
      >
        {{$store.state.message.value}}
      </v-alert>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppForm from "../views/Login";
import AuthNavBar from "@/components/AuthNavBar";
import AppMessage from "@/components/AppMessage";
export default {
  name: "AuthLayout",
  components: {AppMessage, AuthNavBar, AppForm}
}
</script>

<style scoped>

</style>
