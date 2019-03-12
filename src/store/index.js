import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';

Vue.use(Vuex);

/* --------------------------------*
 * STORE/INDEX.JS
 *
 * Our base Vuex store
 *--------------------------------*/
export default new Vuex.Store({
  modules: {
    movies,
  },
});
