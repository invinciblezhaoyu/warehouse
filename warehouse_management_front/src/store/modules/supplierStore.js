import axios from 'axios'
export default {
  state:{
    supplierList: [],
  },
  getters:{
    supplierList: state => state.supplierList,
  },
  mutations:{
    alterSupplierList(state,data) {
      state.supplierList = data;
    },
  },
  actions:{
    async getSupplierList(context) {
      let res = await axios.get(`/supplier/allSupplier`);
      context.commit('alterSupplierList',res.data);
    },
  }
}

