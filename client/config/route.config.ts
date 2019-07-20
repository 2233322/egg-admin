export default [
  {
    path: '/oauth',
    routes: [
      {
        path: '/oauth/accesstoken',
        component: './Authorized',
      }
    ]
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        component: './user/login',
      }
    ]
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        name: 'account',
        path: '/account',
        icon: 'user',
        routes: [
          {
            name: 'settings',
            path: '/account/settings',
            component: './account/settings',
          },
        ],
      },
      {
        name: '权限管理',
        path: 'auth',
        icon: 'safety-certificate',
        routes: [
          {
            name: '功能模块管理',
            path: '/auth/opera',
            component: './auth/opera',
          }
        ]
      }
    ],
  },
]
