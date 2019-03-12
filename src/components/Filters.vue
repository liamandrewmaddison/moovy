<template>
  <div class="filter">
    <div class="filter__genre">
      <b>Pick your genres:</b>
      <multiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="id"
        :options="genres"
        :multiple="true"
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
      value: null,
    };
  },
  computed: {
    // mapping getters from store
    ...mapGetters({
      genres: 'movies/availableGenres',
    }),
  },
  watch: {
    value: {
      handler() {
        const genres = this.value;
        this.$store.dispatch('movies/FILTER_RESULTS', { genres });
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
    b {
      text-align: left;
      display: block;
      margin-bottom: $spacing-xs;
    }
    &__genre {
      width: 50%;
    }
  }
</style>
