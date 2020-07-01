<template>
  <div class="home">
    <toolbar></toolbar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Toolbar from "@/components/Toolbar";

export default {
  name: "Home",
  components: {
    Toolbar
  }
};
</script>
