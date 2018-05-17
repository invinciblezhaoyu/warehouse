import axios from 'axios'
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
export default {
  state:{
    user: {},
    userList: [],
  },
  getters:{
    user: state => state.user,
    userList: state => state.userList,
  },
  mutations:{
    alterUser(state,data) {
      state.user = data;
      sessionStorage.userName = data.ManagerName;
      sessionStorage.ManagerID = data.ManagerID;
    },
    alterUserList(state,data) {
      state.userList = data;
    },
  },
  actions:{
    async managerLogin(context,params) {
      let url = params.type === 'admin' ? '/user/managerLogin' : '/user/userLogin';
      let res = await axios.post(url,params);
      context.commit('alterUser',res.data);
    },
    async getAllManager(context,params) {
      let res = await axios.get('/user/allManager');
      context.commit('alterUserList',res.data);
    },
  }
}

