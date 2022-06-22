
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
  //manager
  {
    path: '/list',
    name: '查询表格',
    icon: 'table',
    routes: [
      {
        path: '/list/student',
        name: '学生信息查询',
        icon: 'smile',
        component: './TableList/index',
      },
      {
        path: '/list/teacher',
        name: '教师信息查询',
        icon: 'smile',
        component: './TableList/teacher',
      },
      {
        path: '/list/manager',
        name: '管理员信息查询',
        icon: 'smile',
        component: './TableList/manager',
      },
    ],
  },
  //teacher
  {
    name: '设计作业上传',
    icon: 'table',
    path: '/designwork',
    component: './DesignWork',
  },
  //teacher + student
  {
    name: '查看作业',
    icon: 'table',
    path: '/checkwork',
    component: './CheckWork',
  },
  //3
  {
    path: '/checkwork/info',
    component: './CheckWork/work_detail/table'
  },
  {
    path: '/checkwork/commit',
    component: './CheckWork/commitwork'
  },
  //3
  {
    name: '作业互评',
    icon: 'table',
    path: '/workmutual',
    component: './WorkMutual',
  },
  {
    name: '评价学生互评内容',
    icon: 'table',
    path: '/workprocess',
    component: './WorkProcess',
  },
  //3
  {
    name: '查看老师评价',
    icon: 'table',
    path: '/checkteacher',
    component: './CheckTeacher',
  },
  //3
  {
    name: '成绩分析',
    icon: 'table',
    path: '/gradeanalysis',
    component: './Grade',
  },
  //3
  {
    name: '修改密码',
    icon: 'table',
    path: '/changepassword',
    component: './ChangePassword',
  },
  {
    name: 'test',
    icon: 'table',
    path: '/test',
    component: './Test',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  }
];
