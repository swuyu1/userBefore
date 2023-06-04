import Toast, { hideToast } from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    found: [], // 列表数组
    // 请求参数对象
    queryObj: {
      openId:'',
      query: '',   // 查询关键词
      state: '进行中',   // 状态类型
      pageNum: 1,// 页码值
      pageSize: 10 // 每页显示多少条数据
    },
    // 总数量，用来实现分页
    total: 0,
    // 是否正在请求数据
    isloading: false
  },
  //获取商品列表数据方法
  getList() {
    this.setData({
      isLoading: true
    })
    //展示 loading 效果
    Toast({
      context: this,
      selector: '#t-toast',
      message: '加载中...',
      theme: 'loading',
      direction: 'column',
    });
    wx.request({
      url: 'https://swuyu.cn/found',
      method: "get",
      contentType: 'application/JSON',
      data: { queryObj: this.data.queryObj },
      success: ({ data: res }) => {
        const arr = []
        const r = res.data.records
        for (let index = 0; index < r.length; index++) {
          const element = r[index].imgs;
          r[index].imgs = element.split('+')
          arr.push(r[index])
        }
        var f = this.data.found
        for (let i = 0; i < arr.length; i++) {
          f.push(arr[i])
        }
        this.setData({
          found: f,
          total: res.data.total,
          isLoading: false
        })
      },
      complete: () => {
        //隐藏 loading 效果
        hideToast({
          context: this,
          selector: '#t-toast',
        });
      }
    })
  },
  btnClickRecycle(){
    wx.navigateTo({
      url: '/pages/recycle/recycle'
    })
  },

  btnClickMaintenance(){
    wx.navigateTo({
      url: '/pages/maintenance/maintenance'
    })
  },

  btnClickFound(){
    wx.navigateTo({
      url: '/pages/found/found'
    })
  },

  btnClickTransaction(){
    wx.switchTab({
      url: '/pages/transaction/transaction'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 判断是否还有下一页数据
    if (this.data.queryObj.pageNum * this.data.queryObj.pageSize >= this.data.total) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '暂无更多数据',
      });
      return
    }
    // 判断是否正在请求其它数据，如果是，则不发起额外的请求
    if (this.data.isLoading) return
    let pageNum = this.data.queryObj.pageNum
    this.setData({
      'queryObj.pageNum': pageNum += 1// 让页码值自增 +1
    })
    this.getList()// 重新获取列表数据
  },
})