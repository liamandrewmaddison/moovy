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
  },
  mutations: {
    SET_RESULTS(state, { results }) {
      state.results = results;
    },
    SET_GENRES(state, { genres }) {
      state.genres = genres;
    },
  },
  actions: {
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
    async GET_GENRES({ commit }) {
      return http({
        url: 'genre/movie/list',
      }).then((response) => {
        const { genres } = response.data;
        commit('SET_GENRES', { genres });
      });
    },
  },
  getters: {
    availableGenreList(state, getters) {
      const allGenres = new Set();
      state.results.forEach((result) => {
        allGenres.add(...result.genre_ids);
      });

      return [...allGenres].map(genreId => getters.getGenreById(genreId));
    },
    getGenreById: state => id => state.genres.filter(genre => genre.id === id)[0],
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
