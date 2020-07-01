<template>
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

const defaultLayout = "default";

export default Vue.extend({
  name: "App",
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  },

  data: () => ({
    //
  })
});
</script>
