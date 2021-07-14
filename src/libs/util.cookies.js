const cookies = {}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  localStorage.setItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`, value)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return localStorage.getItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return localStorage.removeItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

export default cookies
