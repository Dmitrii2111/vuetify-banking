<template>
  <v-container class="d-flex justify-center align-content-center mt-15">
    <v-row align="center">
      <v-col align-self="center">
        <app-question :questions="questions"></app-question>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppQuestion from "@/components/AppQuestion";
export default {
  name: "Help",
  components: {AppQuestion},
  data() {
    return {
      questions: [
        {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati placeat quasi? Consequuntur dicta doloremque error excepturi facilis illo ipsa molestiae odio quo! Consectetur exercitationem in libero nemo repellat. Nobis!'},
        {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati placeat quasi? CUHCDH facilis illo ipsa molestiae odio quo! Consectetur exercitationem in libero nemo repellat. Nobis!'},
        {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati placeat quasi? Consequuntur dicta doloremque  excepturi facilis illo ipsa molestiae odio quo! Consectetur exercitationem in libero nemo repellat. Nobis!'},
        {title: 'Lorem', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati placeat quasi? CUHCDH facilis illo  molestiae odio quo! Consectetur exercitationem in libero nemo repellat. Nobis!'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
