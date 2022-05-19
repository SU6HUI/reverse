
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'designwork',
    icon: 'table',
    path: '/designwork',
    component: './DesignWork',
  },
  {
    name: 'checkwork',
    icon: 'table',
    path: '/checkwork',
    component: './CheckWork',
  },
  {
    path: '/checkwork/info',
    component: './CheckWork/work_detail/table'
  },

  {
    name: 'workmutual',
    icon: 'table',
    path: '/workmutual',
    component: './WorkMutual',
  },
  {
    name: 'workprocess',
    icon: 'table',
    path: '/workprocess',
    component: './WorkProcess',
  },
  {
    name: 'checkteacher',
    icon: 'table',
    path: '/checkteacher',
    component: './CheckTeacher',
  },
  {
    name: 'gradeanalysis',
    icon: 'table',
    path: '/gradeanalysis',
    component: './Grade',
  },
  {
    name: 'changepassword',
    icon: 'table',
    path: '/changepassword',
    component: './ChangePassword',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
