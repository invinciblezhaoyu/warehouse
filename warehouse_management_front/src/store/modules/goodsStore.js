import axios from 'axios'
import { read } from 'fs';
export default {
  state:{
    goods: [],
    goodsType: [],
    wareId: '',
  },
  getters:{
    goods: state => state.goods,
    goodsType: state => state.goodsType,
  },
  mutations:{
    alterGoods(state,data) {
      state.goods = data;
    },
    alterGoodsType(state,data) {
      state.goodsType = data.data;
      state.wareId = data.wareId;
    },
  },
  actions:{
    async getAllGoods(context) {
      let res = await axios.get(`/goods/allGoods`);
      context.commit('alterGoods',res.data);
    },
    async getGoodsTypeByWareId(context,wareId) {
      let res = await axios.get(`/goods/goodsType?wareId=${wareId}`);
      context.commit('alterGoodsType',{data:res.data,wareId});
    },
    async addNewGoods(context, good) {
      let res = await axios.post(`/goods/addNewGoods`,good);
      context.dispatch('getGoodsTypeByWareId',context.state.wareId);
      return res;
    },
    async updateGoods(context, good) {
      let res = await axios.post(`/goods/updateGoods`,good);
      context.dispatch('getGoodsTypeByWareId',context.state.wareId);
      return res;
    },
    async deleteGoods(context, GoodsID) {
      let res = await axios.post(`/goods/deleteGoods`,{GoodsID});
      context.dispatch('getGoodsTypeByWareId',context.state.wareId);
      return res;
    }
  }
}

