Page({

  /**
   * 页面的初始数据
   */
  data: {
      openId: '',
    list: []
  },
  release(){
    wx.switchTab({
      url: '/pages/create/create'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const userInof = wx.getStorageSync('userInfo')
    this.setData({
      openId: userInof.openid
    })
    const arr = []
    wx.request({
      url: 'https://swuyu.cn/order',
      method: "get",
      data: { openId: this.data.openId },
      success: ({ data: res }) => {
        console.log(res);
        const data = res.data
        for(var i = 0;i < data.length;i++){
          for(var j = 0;j < data[i].length;j++){
            arr.push(data[i][j])
          }
        }
        this.setData({
          list:arr
        })
        console.log(this.data.list);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: '/' + page.route
      })
    }
  },
})