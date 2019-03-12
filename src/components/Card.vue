<template>
  <div class="card">
    <img class="card__image" :src="imageSrc" />
    <h3 class="card__header">{{ title }}</h3>
    <div class="card__genres">
      <div
        class="card__genres__item"
        v-for="genre in getGenres(this.genreIds)"
        :key="genre.id">{{ genre.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'v-card',
  props: {
    title: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      require: true,
    },
    genreIds: {
      type: Array,
      require: true,
    },
  },
  computed: {
    imageSrc() {
      return `https://image.tmdb.org/t/p/w500${this.src}`;
    },
    // mapping getters from movies store module
    ...mapGetters({
      getGenres: 'movies/getGenresByIds',
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/_settings.scss';

  .card {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 1px 2px 7px -1px $color-grey;
    position: relative;
    background: #fff;
    transition: all ease .25s;
    &:hover {
      transform: scale(1.02);
      cursor: pointer;
      .card__genres__item {
        transition: background-color ease .25s, color ease .25s;
        background-color: $color-green;
        color: $color-green-dark;
      }
    }
    &__image {
      display: block;
      width: 100%;
    }
    &__header {
      bottom: 0;
      margin: 0;
      background: #fff;
      width: 100%;
      padding: $spacing-small 0;
    }
    &__genres {
      position: absolute;
      top: 0;
      right: 0;
      &__item {
        background: #fff;
        padding: $spacing-xs $spacing-small;
        margin-top: $spacing-xs;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        box-shadow: -2px 2px 6px -2px #000;
      }
    }
  }

  // animations
  .fade-enter-active, .fade-leave-active {
    transition: all .75s;
  }
  .fade-enter, .fade-leave-to {
    transition: all .75s;
    opacity: 0;
  }
</style>
