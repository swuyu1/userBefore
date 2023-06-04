Component({
  //  组件的属性列表
  properties: {},
  //  组件的初始数据
  data: {
    value: '/pages/index/index',
    tabBar: [{
      value: '/pages/index/index',
      icon: 'home',
      label: '首页',
    },
    {
      value: '/pages/transaction/transaction',
      icon: 'shop',
      label: '交易',
    },
    {
      value: '/pages/create/create',
      icon: 'add',
      label: '创建',
    },
    {
      value: '/pages/order/order',
      icon: 'root-list',
      label: '订单',
    },
    {
      value: '/pages/user/user',
      icon: 'user',
      label: '我的',
    }
    ]
  },
  //  组件的方法列表
  methods: {
    onChange(e) {
      wx.switchTab({
        url: e.detail.value
      });
    }
  }
})
