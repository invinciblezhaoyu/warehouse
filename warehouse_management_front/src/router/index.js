import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/login/login'
import Main from '@/modules/main/Main'

import Employee from '@/modules/employee/employeeManagement'
import Supplier from '@/modules/supplier/supplierManagement'
import Warehourse from '@/modules/warehouse/warehouseManagement'
import System from '@/modules/system/systemConfiguration'
import Help from '@/modules/help/help'

Vue.use(Router)

export default new Router({
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
      meta: { requireAuth: true },
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
          path: '/warehourse',
          name: '仓库管理',
          component: Warehourse,
          meta: { requireAuth: true },
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
        },]
    }
  ]
})
