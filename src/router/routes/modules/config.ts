import { LAYOUT } from '/@/router/constant';
import type { AppRouteModule } from '/@/router/types';

const dashboard: AppRouteModule = {
  path: '/config',
  name: 'Config',
  component: LAYOUT,
  redirect: '/config/eslint',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '配置',
  },
  children: [
    {
      path: 'eslint',
      name: 'ConfigEslint',
      component: () => import('/@/views/config/eslint/index.vue'),
      meta: {
        title: 'eslint',
      },
    },
    {
      path: 'stylelint',
      name: 'ConfigStylelint',
      component: () => import('/@/views/config/stylelint/index.vue'),
      meta: {
        title: 'stylelint',
      },
    },
  ],
};

export default dashboard;
