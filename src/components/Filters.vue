<template>
  <div class="filter">
    <div class="filter__genre">
      <b>Pick your genres:</b>
      <multiselect
        v-model="selectedGenres"
        placeholder="Filter by genre"
        label="name"
        track-by="id"
        :options="genres"
        :multiple="true"
        :taggable="true">
      </multiselect>
    </div>
    <div class="filter__star-rating">
      <b>Sort by star rating:</b>
      <multiselect
        v-model="selectedRating"
        placeholder="Filter by star rating"
        label="rating"
        track-by="rating"
        :options="starRatings"
        :taggable="true">
      </multiselect>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';

export default {
  name: 'v-filter',
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedGenres: null,
      selectedRating: null,
      starRatings: [
        { rating: 0 },
        { rating: 0.5 },
        { rating: 1 },
        { rating: 1.5 },
        { rating: 2 },
        { rating: 2.5 },
        { rating: 3 },
        { rating: 3.5 },
        { rating: 4 },
        { rating: 4.5 },
        { rating: 5 },
        { rating: 5.5 },
        { rating: 6 },
        { rating: 6.5 },
        { rating: 7 },
        { rating: 7.5 },
        { rating: 8 },
        { rating: 8.5 },
        { rating: 9 },
        { rating: 9.5 },
        { rating: 10 },
      ],
    };
  },
  computed: {
    // mapping getters from store
    ...mapGetters({
      genres: 'movies/availableGenres',
    }),
  },
  watch: {
    selectedGenres: {
      handler() {
        const genres = this.selectedGenres;
        if (!genres) {
          return;
        }
        this.$store.dispatch('movies/FILTER_BY_GENRES', { genres });
        this.starRating = null;
      },
    },
    selectedRating: {
      handler() {
        const rating = this.selectedRating;
        if (!rating) {
          return;
        }
        this.$store.dispatch('movies/FILTER_BY_STAR_RATING', rating);
        this.selectedGenres = null;
      },
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- overriding styles from above multiselect -->
<style lang="scss">
  @import '../styles/_settings.scss';

  .multiselect__option--highlight,
  .multiselect__option--selected,
  .multiselect__tag {
    background-color: $primary-color;
    &:after {
      background-color: $primary-color;
    }
  }
</style>

<!-- component styles -->
<style lang="scss" scoped>
  @import '../styles/_settings.scss';

  .filter {
    padding: $spacing-base;
    background: #fff;
    border-bottom: 1px solid $color-grey-light;
    display: grid;
    grid-template-columns: 'item item';
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $spacing-base;
    b {
      text-align: left;
      display: block;
      margin-bottom: $spacing-xs;
    }
  }
</style>
