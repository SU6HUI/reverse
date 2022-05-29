import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pages from './zh-CN/pages';
export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': '蚂蚁集团体验技术部出品',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  '查询表格': '查询表格',
  '学生信息查询': '学生信息查询',
  '教师信息查询': '教师信息查询',
  '管理员信息查询': '管理员信息查询',
  '设计作业上传': '设计作业上传',
  '查看作业': '查看作业',
  '作业互评': '作业互评',
  '评价学生互评内容': '评价学生互评内容',
  '查看老师评价': '查看老师评价',
  '成绩分析': '成绩分析',
  '修改密码': '修改密码',

  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
