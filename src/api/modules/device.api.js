export default ({ request }) => ({
  SYS_DEVICE_ALL () {
    // 接口请求
    return request({
      url: '/particle/device/query/all',
      method: 'get'
    })
  },
  SYS_DEVICE_DEL (data) {
    // 接口请求
    return request({
      url: `/particle/device/delete?id=${data.id}`,
      method: 'post',
      data: data
    })
  },
  SYS_DEVICE_START_ONE (data) {
    // 接口请求
    return request({
      url: `/particle/device/single/start?id=${data.id}`,
      method: 'post',
      data: data
    })
  },
  SYS_DEVICE_STOP_ONE (data) {
    // 接口请求
    return request({
      url: `/particle/device/single/stop?id=${data.id}`,
      method: 'post',
      data: data
    })
  },
  SYS_DEVICE_START_ALL (data) {
    // 接口请求
    return request({
      url: '/particle/device/all/start',
      method: 'post'
    })
  },
  SYS_DEVICE_STOP_ALL (data) {
    // 接口请求
    return request({
      url: '/particle/device/all/stop',
      method: 'post'
    })
  },
  SYS_DEVICE_GET (data) {
    // 接口请求
    return request({
      url: `/particle/device/get?id=${data.id}`,
      method: 'get'
    })
  },
  SYS_DEVICE_ADD (data = {}) {
    // 接口请求
    return request({
      url: '/particle/device/add',
      method: 'post',
      data: data
    })
  }
})
