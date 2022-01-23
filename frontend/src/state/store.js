import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'
import createLogger from 'vuex/dist/logger';
// Modules
import answer from './modules/answer';
import loader from './modules/loader';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    /**
     * Assign the modules to the store.
     */
      modules: {
          answer,
          loader
      },

    /**
     * If strict mode should be enabled.
     */
      strict: debug,

    /**
     * Plugins used in the store.
     */
      plugins: debug ? [createLogger()] : [],
  });
