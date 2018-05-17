import axios from 'axios'
export default {
  state:{
    orderList: [],
  },
  getters:{
    orderList: state => state.orderList,
  },
  mutations:{
    alterOrderList(state,data) {
      state.orderList = data;
    },
  },
  actions:{
    async getOrderList(context,value) {
      let res = await axios.get(`/order/allOrder?managerID=${value.ManagerID}&page=${value.page}`);
      context.commit('alterOrderList',res.data);
    },
  }
}

