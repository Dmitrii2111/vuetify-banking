<template>
<v-container class="d-flex justify-center align-content-center mt-15">
  <v-row align="center">
    <v-col align-self="center">
      <app-table :title="'Заявки'"></app-table>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import AppTable from "@/components/AppTable";
export default {
  name: "Home",
  components: {AppTable},
}
</script>

<style scoped>

</style>
