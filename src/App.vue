<template>
  <div id="app">
    <v-header>
      <h1 slot="main">Moovy!</h1>
      <h3 slot="sub">Making Film Groovy Again</h3>
    </v-header>
    <section class="filters">
      <v-filters />
    </section>
    <main>
      <transition-group name="fade" tag="div" class="grid">
        <v-card
          class="grid__item"
          v-for="result in whichList"
          :title="result.original_title"
          :src="result.poster_path"
          :genreIds="result.genre_ids"
          :animate="true"
          :key="result.id" />
      </transition-group>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VHeader from '@/components/Header.vue';
import VFilters from '@/components/Filters.vue';
import VCard from '@/components/Card.vue';

/**
 * TODO: Add loading state
 */
export default {
  components: {
    VHeader,
    VFilters,
    VCard,
  },
  async mounted() {
    await this.getGenres();
    await this.getMovies();
  },
  computed: {
    ...mapState({
      results: state => state.movies.results,
      filterList: state => state.movies.filterList,
    }),
    whichList() {
      return this.filterList.length > 0
        ? this.filterList
        : this.results;
    },
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
