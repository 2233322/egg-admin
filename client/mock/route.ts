export default {
  '/api/auth_routes': {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  },

  '/api/routes': [{
    path: '/',
    name: 'welcome',
    icon: 'smile',
    locale: 'menu.welcome',
    component: './Welcome',
  },
  {
    name: 'account',
    path: '/account',
    locale: 'menu.account',
    icon: 'user',
    children: [
      {
        name: 'settings',
        locale: 'menu.account.settings',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    name: '权限管理',
    path: '/auth',
    icon: 'safety-certificate',
    children: [
      {
        name: '功能模块管理',
        path: '/auth/opera',
        component: './auth/opera',
      }
    ]
  }],
};
