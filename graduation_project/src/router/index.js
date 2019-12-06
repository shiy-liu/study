import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import subHome from '@/components/subHome'
import companyCulture from '@/components/companyCulture'
import companyIntroduction from '@/components/companyIntroduction'
import companyHistory from '@/components/companyHistory'
import feedbackAndPhone from '@/components/feedbackAndPhone'
import technology from '@/components/technology'
import service from '@/components/service'
import school from '@/components/recruitment/school'
import social from '@/components/recruitment/social'
import overseas from '@/components/recruitment/overseas'
//产品
import Goodlist from '@/components/goodslist'
import cart from '@/components/cart'
import address from '@/components/address'
import orderConfirm from '@/components/orderconfirm'
import orderSuccess from '@/components/ordersuccess'
import orderList from '@/components/orderList'
//管理员模块
import admin from '@/components/admin/admin'
import userAdmin from '@/components/admin/userAdmin'
import companyAdmin from '@/components/admin/companyAdmin'
import recruitAdmin from '@/components/admin/recruitAdmin'
import orderAdmin from '@/components/admin/orderAdmin'
import commentAdmin from '@/components/admin/commentAdmin'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components:
      {default: Home,
      },
      children: [
      {path: '/', name: 'subHome', component: subHome},
      {path: '/companyCulture', name: 'companyCulture', component: companyCulture},
      {path: '/companyHistory', name: 'companyHistory', component: companyHistory},
      {path: '/companyIntroduction', name: 'companyIntroduction', component: companyIntroduction},
      {path: '/technology', name: 'technology', component: technology},
      {path: '/service', name: 'service', component: service},
      {path: '/school', name: 'school', component: school},
      {path: '/social', name: 'social', component: social},
      {path: '/overseas', name: 'overseas', component: overseas},
      //产品
      {
        path: '/goodlist',
        name: 'goodlist',
        component: Goodlist
    },
    {
        path: '/cart',
        name: 'cart',
        component: cart
    },
    {
        path: '/address',
        name: 'address',
        component: address
    },
    {
        path: '/orderConfirm',
        name: 'orderConfirm',
        component: orderConfirm
    },
    {
        path: '/orderSuccess',
        name: 'orderSuccess',
        component: orderSuccess
    },
    {
        path: '/order',
        name: 'orderList',
        component: orderList
    }
      
     ]
    },
    {
    path:'/feedbackAndPhone',
    name:feedbackAndPhone,
    component:feedbackAndPhone
    },
    {
      path:'/admin',
      name:admin,
      redirect:'/admin/userAdmin',
      components:
      {default: admin,
      },
      children:[
        {path: '/admin/userAdmin', name: 'userAdmin', component: userAdmin},
        {path: '/admin/companyAdmin', name: 'companyAdmin', component: companyAdmin},
        {path: '/admin/recruitAdmin', name: 'recruitAdmin', component:recruitAdmin},
        {path: '/admin/orderAdmin', name: 'orderAdmin', component: orderAdmin},
        {path: '/admin/commentAdmin', name: 'commentAdmin', component: commentAdmin},

      ]
      }
  ]
})
