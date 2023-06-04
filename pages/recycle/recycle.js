Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: [
      { content: "发布订单" },
      { content: "预约时间" },
      { content: "上门回收" },
    ]
  },
  release(){
    wx.switchTab({
      url: '/pages/create/create'
    })
  },
})