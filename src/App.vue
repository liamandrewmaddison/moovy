<template>
  <div id="app">
    <v-header>
      <h1 slot="main">Moovy!</h1>
      <h3 slot="sub">Making Film Groovy Again</h3>
    </v-header>
    <main></main>
  </div>
</template>

<script>
import VHeader from '@/components/Header.vue';

export default {
  components: {
    VHeader,
  },
};
</script>

<style lang="scss">
  @import 'styles/manifest.scss';
</style>
