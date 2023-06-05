import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // login route
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 404 route
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // console route
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  // the title of home page
  {
    path: '/frontbanner',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    children: [{
      path: 'frontbanner',
      name: 'frontBanner',
      component: () => import('@/views/frontBanner/index'),
      meta: { title: '首页标语', icon: 'el-icon-s-home' }
    }]
    // meta: { title: '首页标语', icon: 'el-icon-s-help' },
    // children: [
    //   {
    //     path: 'table',
    //     name: 'Table',
    //     component: () => import('@/views/table/index'),
    //     meta: { title: 'Table', icon: 'table' }
    //   },
    //   {
    //     path: 'treehshsh',
    //     name: 'Tree',
    //     component: () => import('@/views/tree/index'),
    //     meta: { title: 'Tree', icon: 'tree' }
    //   }
    // ]
  },

  // article manage route
  {
    path: '/form',
    name: 'article',
    component: Layout,
    meta: { title: '文章管理', icon: 'el-icon-s-management' },
    children: [{
      path: 'list',
      name: 'List',
      component: () => import('@/views/articleManage/List'),
      meta: { title: '文章列表', icon: 'el-icon-s-operation' }
    },
    {
      path: 'classification',
      name: 'Classification',
      component: () => import('@/views/articleManage/Classification'),
      meta: { title: '文章分类', icon: 'el-icon-star-off' }
    },
    {
      path: 'add',
      name: 'Add',
      component: () => import('@/views/articleManage/Add'),
      meta: { title: '文章添加', icon: 'el-icon-document-add' }
    },
    {
      path: 'edit/:id',
      name: 'Edit',
      component: () => import('@/views/articleManage/Edit'),
      meta: { title: '文章编辑', icon: 'el-icon-document-add' },
      hidden:true
    }]
  },

  // project manage route
  {
    path: '/projectmanage',
    component: Layout,
    meta: { title: '项目管理', icon: 'el-icon-s-finance' },
    children: [{
      path: 'list',
      name: 'List',
      component: () => import('@/views/projectManage/List'),
      meta: { title: '项目列表', icon: 'el-icon-s-data' }
    },
    {
      path: 'add',
      name: 'Add',
      component: () => import('@/views/projectManage/Add'),
      meta: { title: '添加项目', icon: 'el-icon-folder-add' }
    }]
  },

  // comment manage route
  {
    path: '/comment',
    component: Layout,
    children: [{
      path: 'comment',
      name: 'Comment',
      component: () => import('@/views/comment/index'),
      meta: { title: '评论管理', icon: 'el-icon-s-comment' }
    }]
  },

  // message board route
  {
    path: '/board',
    component: Layout,
    children: [{
      path: 'board',
      name: 'Board',
      component: () => import('@/views/board/index'),
      meta: { title: '留言板', icon: 'el-icon-message' }
    }]
  },

  // about me route
  {
    path: '/about',
    component: Layout,
    children: [{
      path: 'about',
      name: 'About',
      component: () => import('@/views/about/index'),
      meta: { title: '关于我', icon: 'el-icon-dish' }
    }]
  },
  // 个人中心
  {
    path: '/person',
    component: Layout,
    children: [{
      path: 'center',
      name: 'center',
      component: () => import('@/views/table/index'),
      meta: { title: '个人中心', icon: 'el-icon-dish' },
      hidden:true
    }]
  },

  // set route
  {
    path: '/set',
    component: Layout,
    children: [{
      path: 'set',
      name: 'Set',
      component: () => import('@/views/set/index'),
      meta: { title: '设置', icon: 'el-icon-set-up' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
