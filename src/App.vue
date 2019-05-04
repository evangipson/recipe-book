<template>
  <div id="app">
    <navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from "./views/Navigation.vue";

export default {
  name: 'App',
  components: {
    Navigation
  },
}
</script>