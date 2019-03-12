<template>
  <div id="app">
    <v-header>
      <h1 slot="main">Moovy!</h1>
      <h3 slot="sub">Making Film Groovy Again</h3>
    </v-header>
    <main class="wrapper" v-show="results.length > 0">
      <magic-grid>
        <v-card
          v-for="result in results"
          :title="result.original_title"
          :src="result.poster_path"
          :genreIds="result.genre_ids"
          :animate="true"
          :key="result.id" />
      </magic-grid>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VCard from '@/components/Card.vue';
import VHeader from '@/components/Header.vue';

/**
 * TODO: Add loading state
 */
export default {
  components: {
    VCard,
    VHeader,
  },
  async mounted() {
    await this.getGenres();
    await this.getMovies();
  },
  computed: {
    ...mapState({
      results: state => state.movies.results,
    }),
  },
  methods: {
    // re-names actions for a more succinct API
    ...mapActions({
      getMovies: 'movies/GET_MOVIES',
      getGenres: 'movies/GET_GENRES',
    }),
  },
};
</script>

<style lang="scss">
  @import 'styles/manifest.scss';
</style>
