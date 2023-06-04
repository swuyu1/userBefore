// pages/index.js
import Toast, { hideToast } from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    transaction: [], // 列表数组
    // 请求参数对象
    queryObj: {
      openId: '',
      query: '',   // 查询关键词
      state: '进行中',   // 状态类型
      pageNum: 1,// 页码值
      pageSize: 10 // 每页显示多少条数据
    },
    // 总数量，用来实现分页
    total: 0,
    // 是否正在请求数据
    isloading: false,
    search: '',
    nullData: false
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
      url: 'https://swuyu.cn/transaction',
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
        var f = this.data.transaction
        for (let i = 0; i < arr.length; i++) {
          f.push(arr[i])
        }
        this.setData({
          transaction: f,
          total: res.data.total,
          isLoading: false,
          search: '',
        })
        this.nulldata()
      },
      complete: () => {
        wx.stopPullDownRefresh();
        //隐藏 loading 效果
        hideToast({
          context: this,
          selector: '#t-toast',
        });
      }
    })
  },
  search(e) {
    const { value } = e.detail;
    this.setData({
      'queryObj.query': value,
      transaction: []
    })
    this.getList()// 重新获取列表数据
  },
  nulldata() {
    if (this.data.transaction.length === 0) {
      this.setData({
        nullData: true,
      })
    }else{
      this.setData({
        nullData: false,
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      queryObj: {
        openId: '',
        query: '',   // 查询关键词
        state: '进行中',   // 状态类型
        pageNum: 1,// 页码值
        pageSize: 10 // 每页显示多少条数据
      }, transaction: []
    })
    this.getList()
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