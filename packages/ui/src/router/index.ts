import Vue from 'vue';
import Router from 'vue-router';
import {Component} from 'vue-property-decorator';

Vue.use(Router);

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import(/* webpackChunkName: "sandbox" */ '../ui/style/pages/Sandbox.vue'),
    },
    {
      path: '/articles',
      name: 'articleList',
      component: () => import(/* webpackChunkName: "articleList" */ '../ui/article/pages/ArticleList.vue'),
    },
    {
      path: '/articles/:articleId',
      name: 'articleEdit',
      component: () => import(/* webpackChunkName: "articleEdit" */ '../ui/article/pages/ArticleEdit.vue'),
    },
  ],
});
