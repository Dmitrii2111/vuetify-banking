<template>
  <v-app-bar
      color="yellow accent-3"
      dense
      justify-space-between
  >
    <v-app-bar-title class="col-4">Онлайн банкинг</v-app-bar-title>

    <v-tabs right color="black">
      <v-tab exact-path to="/">Главная</v-tab>
      <v-tab to="/help">Помощь</v-tab>
      <v-tab to="/messages">Сообщения</v-tab>
      <v-tab @click="logout">Выйти</v-tab>
    </v-tabs>

  </v-app-bar>
</template>

<script>
export default {
  name: "AppNavbar",
  methods: {
    logout() {
      console.log('logout')
      localStorage.removeItem('jwt-token')
      this.$router.push('/login')
      // this.$store.commit('auth/logout')
    },
  }
}
</script>

<style scoped>

</style>
