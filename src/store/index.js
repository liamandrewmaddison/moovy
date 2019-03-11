import Vue from 'vue';
import Vuex from 'vuex';
import moviesModule from '@/store/modules/movies';

Vue.use(Vuex);

/* --------------------------------*
 * STORE/INDEX.JS
 *
 * Our base Vuex store
 *--------------------------------*/
export default new Vuex.Store({
  modules: {
    moviesModule,
  },
});
