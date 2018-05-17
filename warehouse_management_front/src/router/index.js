import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/login/login'
import Main from '@/modules/main/Main'

import Employee from '@/modules/employee/employeeManagement'
import Supplier from '@/modules/supplier/supplierManagement'
import Instore from '@/modules/instore/instore'
import Outstore from '@/modules/outstore/outstore'
import Warehourse from '@/modules/warehouse/warehouseManagement'
import WarehouseList from '@/modules/warehouse/warehouseList'
import WarehouseDetail from '@/modules/warehouse/warehouseDetail'
import System from '@/modules/system/systemConfiguration'
import Help from '@/modules/help/help'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/main',
      name: '主页面',
      component: Main,
      redirect: '/warehouse',
      children: [
        {
          path: '/employee',
          name: '员工管理',
          component: Employee,
          meta: { requireAuth: true },
        },{
          path: '/supplier',
          name: '供应商管理',
          component: Supplier,
          meta: { requireAuth: true },
        },{
          path: '/warehouse',
          name: '仓库管理',
          component: Warehourse,
          redirect: '/list',
          children: [{
            path: '/list',
            name: '仓库列表',
            component: WarehouseList,
            meta: { requireAuth: true },
          },{
            path: '/detail',
            name: '仓库详情',
            component: WarehouseDetail,
            meta: { requireAuth: true },
          }],
        },{
          path: '/system',
          name: '系统设置',
          component: System,
          meta: { requireAuth: true },
        },{
          path: '/help',
          name: '帮助',
          component: Help,
          meta: { requireAuth: true },
        },{
          path: '/instore',
          name: '入库管理',
          component: Instore,
          meta: { requireAuth: true },
        },{
          path: '/outstore',
          name: '出库管理',
          component: Outstore,
          meta: { requireAuth: true },
        }]
    }
  ]
})
