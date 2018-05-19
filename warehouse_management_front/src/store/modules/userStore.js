import axios from 'axios'
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
    async getAllManager(context) {
      let res = await axios.get('/user/allManager');
      context.commit('alterUserList',res.data);
    },
    async addManager(context,params) {
      let res = await axios.post('/user/addManager',params);
      context.dispatch('getAllManager');
      return res;
    },
    async updateManager(context,params) {
      let res = await axios.put('/user/updateManager',params);
      context.dispatch('getAllManager');
      return res;
    },
    async deleteManager(context,ManagerID) {
      let res = await axios.delete('/user/deleteManager',{data:{ManagerID}});
      context.dispatch('getAllManager');
      return res;
    }
  }
}

