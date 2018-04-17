import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

import userStore from './modules/userStore'
import warehourseStore from './modules/warehouseStore'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:3000';

export default new Vuex.Store({
  modules:{
    userStore,
    warehourseStore,
  }
})
