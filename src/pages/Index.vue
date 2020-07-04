<template>
  <div>
    <toolbar />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Toolbar from "@/components/Toolbar.vue";

@Component({
  components: {
    Toolbar
  }
})
export default class Login extends Vue {
  check = false;
}
</script>
