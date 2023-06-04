
Page({
  data: {
    id: 0,
    transaction: {},
    // 是否加载
    isLoading: false,
    // 轮播图数据
    autoplay: false,
    swiperList: [],
    // 图片预览数据
    visible: false,
    closeBtn: true,
    showIndex: true,
    index: 0,
    imgs: []
  },
  // 获取数据
  getList() {
    this.setData({
      isLoading: true
    })
    // 发送请求
    wx.request({
      url: 'https://swuyu.cn/transaction/' + this.data.id,
      method: "get",
      contentType: 'application/JSON',
      success: ({ data: res }) => {
        const r = res.data
        const elment = r.imgs
        r.imgs = elment.split('+')
        const imgs = []
        const imgs2 = []
        for (let i = 0; i < r.imgs.length; i++) {
          const img = r.imgs[i]
          const element = { value: 'https://img.swuyu.cn/' + img, ariaLabel: '图片' + i };
          imgs.push(element)
          const element2 = 'https://img.swuyu.cn/' + img
          imgs2.push(element2)
        }
        this.setData({
          swiperList: imgs,
          imgs: imgs2,
          transaction: r,
          isLoading: false
        })
      },
    })
  },
  // 点击轮播图事件
  swiperClick(e) {
    const { index } = e.detail;
    this.setData({
      visible: true,
      index: index
    })
  },
  // 关闭图片预览
  onClose() {
    this.setData({
      visible: false,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getList()
  },
})