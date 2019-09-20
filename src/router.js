import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/Index.vue';

Vue.use(Router)

export const asyncRouterMap= [
  {
    path:'/',
    name:'dashboard',
    component:Layout,
    hidden: false,
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        meta:{title:'首页', icon:'fa fa-home'},
        component:()=>import('@/views/Home.vue')
      }
    ]
  },
  {
    path:'/product',
    name:'product',
    meta:{title:'商品管理', icon:'fa fa-bookmark '},
    component:Layout,
    hidden: false,
    redirect:'/goods',
    children:[
      {
        path:'/goods',
        name:'goods',
        meta:{title:'产品'},
        hidden: false,
        component:()=>import('@/views/Goods/goodsList.vue'),
        children:[]
      },
      {
        path:'/goodsadd',
        name:'goodsadd',
        meta:{title:'添加分类', activeMenu: '/goods' },
        hidden: true,
        component:()=>import('@/views/Goods/goodsAdd.vue')
      },
      {
        path:'/goodsedit/:id(\\d+)',
        name:'goodsedit',
        meta:{title:'更新产品', activeMenu: '/goodsedit' },
        hidden: true,
        component:()=>import('@/views/Goods/goodsEdit.vue')
      },
      {
        path:'/category',
        name:'category',
        meta:{title:'分类'},
        hidden: false,
        component:()=>import('@/views/Goods/categoryList.vue'),
        children:[
          
        ]
      },
      {
        path:'/categoryadd',
        name:'categoryadd',
        meta:{title:'添加分类', activeMenu: '/category' },
        hidden: true,
        component:()=>import('@/views/Goods/categoryAdd.vue')
      },
      {
        path:'/categoryedit/:id(\\d+)',
        name:'categoryedit',
        meta:{title:'更新分类', activeMenu: '/category' },
        hidden: true,
        component:()=>import('@/views/Goods/categoryEdit.vue')
      },
      
    ]
  },

  {
    path: '/login',
    name: 'Login',
    hidden:true,
    meta:{title:'系统登录'},
    component:()=>import('@/views/Login/Login.vue') 
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:asyncRouterMap
});

router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.adminToken?true:false;
  if(isLogin){
    if(to.path =='/login'){
      next('/');
    }else{
      next();
    }
  }else{
    if(to.path =='/login'){
      next();
    }else{
      next('/login');
    }
  }
});

export default router;

