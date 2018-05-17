import axios from 'axios'
export default {
  state:{
    warehouses: [],
    wareCount: 0,
    begin: 0,
  },
  getters:{
    warehouses: state => state.warehouses,
    wareCount: state => state.wareCount,
  },
  mutations:{
    alterWarehouse(state,data) {
      state.warehouses = data.data.data;
      state.wareCount = data.data.result[0]['COUNT(*)'];
      state.begin = data.begin;
    },
  },
  actions:{
    async getWarehouses(context,begin) {
      let url = sessionStorage.userName === 'admin' 
        ? `/storage/allStorage?page=${begin}` 
        : `/storage/allStorageById?page=${begin}&ManagerID=${sessionStorage.ManagerID}`;
      let res = await axios.get(url);
      context.commit('alterWarehouse',{data:res.data,begin});
    },
    async addNewStorage(context,params) {
      let res = await axios.post('/storage/addStorage',params);
      context.dispatch('getWarehouses',context.state.begin);
      return res;
    },
    async deleteStorage(context,data) {
      let res = await axios.delete('/storage/deleteStorage',{data:{StorageID:data.StorageID}});
      context.dispatch('getWarehouses',context.state.begin);
      return res;
    },
    async updateStorage(context,params) {
      let res = await axios.put('/storage/updateStorage',params);
      context.dispatch('getWarehouses',context.state.begin);
      return res;
    }
  }
}

