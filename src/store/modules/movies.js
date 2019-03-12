/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["state"]
  }
] */

import http from '../../utils/http';

/* --------------------------------*
 * STORE/MODULES/MOVIES.JS
 *
 * Our store module for our movie list
 *
 * Here we will have all the general
 * functionality only relative
 * to the movies entity
 *--------------------------------*/

const moviesModule = {
  namespaced: true,
  state: {
    results: [],
    genres: [],
    filterList: [],
  },
  mutations: {
    SET_RESULTS(state, { results }) {
      state.results = results;
    },
    SET_GENRES(state, { genres }) {
      state.genres = genres;
    },
    SET_FILTER_LIST(state, { list }) {
      state.filterList = list;
    },
  },
  actions: {
    // gets all movies on page 1
    async GET_MOVIES({ commit }) {
      return http({
        url: 'discover/movie?page=1',
        params: {
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
        },
      }).then((response) => {
        const { results } = response.data;
        commit('SET_RESULTS', { results });
      });
    },
    // gets all availabe genres
    async GET_GENRES({ commit }) {
      return http({
        url: 'genre/movie/list',
      }).then((response) => {
        const { genres } = response.data;
        commit('SET_GENRES', { genres });
      });
    },
    // filters results by genre
    FILTER_BY_GENRES({ state, commit }, { genres }) {
      const list = state.results.filter((result) => {
        const genreIds = result.genre_ids;
        let found = false;
        genreIds.forEach((genreId) => {
          genres.forEach((genre) => {
            if (genre.id === genreId) {
              found = result;
            }
          });
        });
        return found;
      });

      commit('SET_FILTER_LIST', { list });
    },
    // filters results by rating
    FILTER_BY_STAR_RATING({ state, commit }, { rating }) {
      const list = state.results.filter(result => result.vote_average >= rating);

      commit('SET_FILTER_LIST', { list });
    },
  },
  getters: {
    // gets all availabe genres that are
    // available with the movie list given
    availableGenres(state, getters) {
      const allGenres = new Set();
      state.results.forEach((result) => {
        allGenres.add(...result.genre_ids);
      });

      return [...allGenres].map(genreId => getters.getGenreById(genreId));
    },
    // gets a genre by its ID
    getGenreById: state => id => state.genres.filter(genre => genre.id === id)[0],
    // gets a list of genres when passed a list of ids
    getGenresByIds: (state, getters) => (ids) => {
      const genres = new Set();

      state.genres.forEach(() => {
        ids.forEach((genreId) => {
          genres.add(getters.getGenreById(genreId));
        });
      });

      return genres;
    },
  },
};

export default moviesModule;
