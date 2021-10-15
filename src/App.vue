<template>
  <v-app>
    <v-main>
      <component :is="layout+'-layout'"/>
    </v-main>
  </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";


export default {
  name: 'App',
  components: {MainLayout, AuthLayout},
  data() {
    return {
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'auth'
    }
  },
};
</script>
