import axios from 'axios'
import { read } from 'fs';
export default {
  state:{
    goods: [],
  },
  getters:{
    goods: state => state.goods,
  },
  mutations:{
    alterGoods(state,data) {
      state.goods = data;
    },
  },
  actions:{
    async getAllGoods(context,id) {
      let res = await axios.get(`/goods/allGoods?id=${id}`);
      context.commit('alterGoods',res.data);
      console.log(22,res.data);
    },
    async instoreSubmit(context,order) {
      let res = await axios.post(`/goods/instore`,order);
      // context.dispatch('getAllGoods','2');
      return res;
    },
  }
}

