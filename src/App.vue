<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">HUNTER KILLER</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
};
</script>
<style>
@media screen and (max-width: 700px) {
  .container {
    padding: 0px !important;
  }
}
</style>
