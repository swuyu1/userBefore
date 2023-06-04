Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInof:{},
    image: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png'
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const userInof = wx.getStorageSync('userInfo')
    this.setData({
      userInof:userInof
    })
    console.log(this.data.userInof);
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