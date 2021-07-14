import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '监控中心', icon: 'table' },
  {
    title: '快捷',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '设备管理', icon: 'sitemap' },
      { path: '/page2', title: '监控中心2', icon: 'users' },
      { path: '/page3', title: '数据中心', icon: 'database' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '监控中心', icon: 'table' },
  { path: '/page1', title: '设备管理', icon: 'sitemap' },
  { path: '/page2', title: '监控中心2', icon: 'users' },
  { path: '/page3', title: '数据中心', icon: 'database' }
])
