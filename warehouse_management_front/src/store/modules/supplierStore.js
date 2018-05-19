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
    async addSupplier(context,params) {
      let res = await axios.post('/supplier/addSupplier',params);
      context.dispatch('getSupplierList');
      return res;
    },
    async updateSupplier(context,params) {
      let res = await axios.put('/supplier/updateSupplier',params);
      context.dispatch('getSupplierList');
      return res;
    },
    async deleteSupplier(context,SupplierID) {
      let res = await axios.delete('/supplier/deleteSupplier',{data:{SupplierID}});
      context.dispatch('getSupplierList');
      return res;
    }
  }
}

