import Vue from "vue";
import Vuex from "vuex";

import journal from "@/modules/daybook/store/journal";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    journal,
  }
});
