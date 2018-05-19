import axios from 'axios'
import { WSASYSCALLFAILURE } from 'constants';
export default {
  state:{
    orderList: [],
    orderCount: 0,
    orderValue: '',
    oneOrder: [],
    oneOutOrder: [],
  },
  getters:{
    orderList: state => state.orderList,
    orderCount: state => state.orderCount,
    oneOrder: state => state.oneOrder,
    oneOutOrder: state => state.oneOutOrder,
  },
  mutations:{
    alterOrderList(state,data) {
      state.orderList = data.data.data;
      state.orderCount = data.data.result[0]['COUNT(*)'];
      state.orderValue = data.value;
    },
    alterOneOrder(state,data) {
      state.oneOrder = data;
    },
    alterOneOutOrder(state,data) {
      state.oneOutOrder = data;
    },
    destoryList(state) {
      state.orderList = [];
    },
  },
  actions:{
    async getOrderList(context,value) {
      let res = await axios.get(`/order/allOrder?managerID=${value.ManagerID}&page=${value.page}&sign=${value.sign}`);
      context.commit('alterOrderList',{data:res.data,value});
    },
    async instoreSubmit(context,order) {
      let res = await axios.post(`/goods/instore`,order);
      context.dispatch('getOrderList',context.state.orderValue);
      return res;
    },
    async outstoreSubmit(context,order) {
      let res = await axios.post(`/goods/outstore`,order);
      context.dispatch('getOrderList',context.state.orderValue);
      return res;
    },
    async getOrderById(context,orderID) {
      if(!orderID) return;
      let res = await axios.get(`/order/oneOrder?orderID=${orderID}`);
      context.commit('alterOneOrder',res.data);
    },
    async getOutOrderById(context,orderID) {
      if(!orderID) return;
      let res = await axios.get(`/order/oneOutOrder?orderID=${orderID}`);
      context.commit('alterOneOutOrder',res.data);
    },

  }
}

