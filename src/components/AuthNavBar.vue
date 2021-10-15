<template>
  <v-app-bar
      color="yellow accent-3"
      dense
      justify-space-between
  >
    <v-app-bar-title class="col-4">Добро пожаловать!</v-app-bar-title>

      <v-tabs right color="black">
        <v-tab to="/login" exact-path> Войти </v-tab>
        <v-tab to="/registration">Зарегистрироваться</v-tab>
      </v-tabs>

  </v-app-bar>
</template>

<script>
export default {
  name: "AuthNavBar",
}
</script>

<style scoped>

</style>
