import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

import userStore from './modules/userStore'
import warehourseStore from './modules/warehouseStore'
import goodsStore from './modules/goodsStore'
import orderStore from './modules/orderStore'
import supplierStore from './modules/supplierStore'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:3000';

export default new Vuex.Store({
  modules:{
    userStore,
    warehourseStore,
    goodsStore,
    orderStore,
    supplierStore,
  }
})
