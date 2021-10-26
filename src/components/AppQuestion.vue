<template>
  <v-expansion-panels focusable>
    <v-expansion-panel
        v-for="(q, i) in questions"
        :key="i"
    >
      <v-expansion-panel-header>{{ q.title }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-text>{{ q.text }}</v-card-text>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "AppQuestion",
  props: ['questions']
}
</script>

<style scoped>

</style>
