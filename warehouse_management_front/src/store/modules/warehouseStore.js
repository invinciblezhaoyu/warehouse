import axios from 'axios'
export default {
  state:{
    warehouses: [],
  },
  getters:{
    warehouses: state => state.warehouses,
  },
  mutations:{
    alterWarehouse(state,data) {
      state.warehouses = data;
    },
  },
  actions:{
    async getWarehouses(context) {
      let res = await axios.get('/storage/allStorage');
      context.commit('alterWarehouse',res.data);
    },
    async addNewStorage(context,params) {
      let res = await axios.post('/storage/addStorage',params);
      context.dispatch('getWarehouses');
      return res;
    },
    async deleteStorage(context,data) {
      let res = await axios.delete('/storage/deleteStorage',{data:{StorageID:data.StorageID}});
      context.dispatch('getWarehouses');
      return res;
    },
  }
}

