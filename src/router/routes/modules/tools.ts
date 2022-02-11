import { LAYOUT } from '/@/router/constant';
import type { AppRouteModule } from '/@/router/types';

const tools: AppRouteModule = {
  path: '/tool',
  name: 'Tool',
  component: LAYOUT,
  redirect: '/tool/eslint',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '工具',
  },
  children: [
    {
      path: 'pug2html',
      name: 'ToolPug2Html',
      component: () => import('/@/views/tool/pug2html/index.vue'),
      meta: {
        title: 'pug2html',
      },
    },
  ],
};

export default tools;
