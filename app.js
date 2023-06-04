// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://swuyu.cn/login',
          method: "get",
          contentType: 'application/JSON',
          data: { code: res.code },
          success: ({ data: res }) => {
            wx.setStorageSync('openid', res.data)
            // 获取用户信息
            wx.request({
              url: 'https://swuyu.cn/user/' + res.data,
              method: "get",
              success: ({ data: res }) => {
                wx.setStorageSync('userInfo', res.data)
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
