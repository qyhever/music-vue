import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Recommend from 'components/recommend/Recommend';
import Singer from 'components/singer/Singer';
import Rank from 'components/rank/Rank';
import Search from 'components/search/Search';

import SingerDetail from 'components/singer-detail/SingerDetail';

export default new Router({
  routes: [
    { path: '/', redirect: '/recommend' },
    { path: '/recommend', component: Recommend },
    {
      path: '/singer',
      component: Singer,
      children: [
        {path: ':id', component: SingerDetail}
      ]
    },
    { path: '/rank', component: Rank },
    { path: '/search', component: Search }
  ]
});