<template>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
        >
            <v-card>
              <v-toolbar
                  :color=color
                  dark
              ></v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">{{message}}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "AppMessage",
  props: ['color', 'message']
}
</script>

<style scoped>

</style>
