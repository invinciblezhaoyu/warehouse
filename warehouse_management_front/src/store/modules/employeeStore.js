import axios from 'axios'
export default {
  state:{
    employeeList: [],
  },
  getters:{
    employeeList: state => state.employeeList,
  },
  mutations:{
    alterSupplierList(state,data) {
      state.employeeList = data;
    },
  },
  actions:{
    async getSupplierList(context) {
      let res = await axios.get(`/supplier/allEmployee`);
      context.commit('alterSupplierList',res.data);
    },
  }
}

