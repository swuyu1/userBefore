import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    // 时间选择器数据
    mode: '',
    dateVisible: false,
    dateVisible1: false,
    date: new Date().getTime(), // 支持时间戳传入
    dateText: '',
    dateText1: '',
    // 指定选择区间起始值
    start: '2000-01-01 00:00:00',
    end: '2030-09-09 12:12:12',
    // 单选框数据
    checked: false,
    // 图片上传数据
    originFiles: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
    // 手机号提示
    phoneError: false,
    // 用户信息数据
    userInof: {},
    transaction: {
      initiator: '',
      title: '',
      imgs: '',
      type: '',
      introduce: '',
      price: 0,
      phone: ''
    },
    found: {
      initiator: '',
      title: '',
      imgs: '',
      type: '寻找',
      introduce: '',
      phone: ''
    },
    maintain: {
      initiator: '',
      place: '',
      time: '',
      type: '',
      phone: '',
      mode: '自送',
      remarks: ''
    },
    recycle: {
      initiator: '',
      place: '',
      time: '',
      type: '',
      phone: '',
      remarks: ''
    },
  },
  // 切换选项卡事件
  onTabsChange() {
    this.cleardata()
  },
  // 图片上传事件
  handleSuccess(e) {
    const { files } = e.detail;
    this.setData({
      originFiles: files,
    });
    console.log(this.data.originFiles);
  },
  handleRemove(e) {
    const { index } = e.detail;
    const { originFiles } = this.data;
    originFiles.splice(index, 1);
    this.setData({
      originFiles,
    });
    console.log(this.data.originFiles);

  },
  handleClick(e) {
    console.log(e.detail.file);
  },

  // 单选框事件
  handleChangeFound(e) {
    const value = e.detail.value
    console.log(e.detail.value);
    if (value == 0) {
      this.setData({
        'found.type': "寻找",
      });
    } else if (value == 1) {
      this.setData({
        'found.type': "捡到",
      });
    }
  },
  handleChangeMaintain(e) {
    const value = e.detail.value
    console.log(e.detail.value);
    if (value == 0) {
      this.setData({
        'maintain.mode': "自送",
      });
    } else if (value == 1) {
      this.setData({
        'maintain.mode': "上门",
      });
    }
  },
  // 打开时间选择器事件
  showPicker(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  showPicker1(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible1`]: true,
    });
  },
  // 关闭时间选择器事件
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  hidePicker1() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible1`]: false,
    });
  },
  // 时间选择器确定事件
  onConfirmRecycle(e) {
    const { value } = e.detail;
    const { mode } = this.data;
    this.setData({
      [mode]: value,
      'recycle.time': value,
      dateText1: value
    });
    this.hidePicker1();
  },
  onConfirmMaintain(e) {
    const { value } = e.detail;
    const { mode } = this.data;
    this.setData({
      [mode]: value,
      'maintain.time': value,
      dateText: value
    });
    this.hidePicker();
  },
  // 输入框双向绑定
  handleInputChange(e) {
    // 取出实时的变量值
    let value = e.detail.value;
    let fieldName = e.target.dataset.fieldName;
    this.setData({
      [`${fieldName}`]: value
    })
  },
  // 自动填充事件
  autoFillClick(e) {
    let value = this.data.userInof.phone;
    let fieldName = e.target.dataset.fieldName;
    this.setData({
      [`${fieldName}`]: value,
      phoneError: false
    })
  },
  autoFillClickPlace(e) {
    let value = this.data.userInof.place;
    let fieldName = e.target.dataset.fieldName;
    this.setData({
      [`${fieldName}`]: value,
      phoneError: false
    })
  },
  // 手机号输入事件
  handleInputChangePhone(e) {
    const { phoneError } = this.data;
    const isPhoneNumber = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(e.detail.value);
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
    // 取出实时的变量值
    let value = e.detail.value;
    let fieldName = e.target.dataset.fieldName;
    this.setData({
      [`${fieldName}`]: value
    })
  },
  // 价格输入事件（只能是数字且不为0开头）
  handleInputChangePrice(e) {
    let value = e.detail.value;
    let fieldName = e.target.dataset.fieldName;
    let price = value.replace(/\D/g, '').replace(/^0{1,}/g, '');
    this.setData({
      [`${fieldName}`]: price
    })
  },
  // 重置数据
  cleardata() {
    this.setData({
      // 数据
      'transaction.title': '',
      'transaction.imgs': '',
      'transaction.type': '',
      'transaction.introduce': '',
      'transaction.price': 0,
      'transaction.phone': '',
      'found.title': '',
      'found.imgs': '',
      'found.type': '寻找',
      'found.introduce': '',
      'found.phone': '',
      'maintain.place': '',
      'maintain.time': '',
      'maintain.type': '',
      'maintain.phone': '',
      'maintain.mode': '自送',
      'maintain.remarks': '',
      'recycle.place': '',
      'recycle.time': '',
      'recycle.type': '',
      'recycle.phone': '',
      'recycle.remarks': '',
      // 重置手机号提示
      phoneError: false,
      // 重置图片数组
      originFiles: [],
      // 时间显示
      dateText: '',
      dateText1: '',
    })
  },
  // 提交事件
  transactionSubmit() {
    const phoneError = this.data.phoneError
    const { initiator, title, type, introduce, price, phone } = this.data.transaction;
    console.log(this.data.transaction);
    if (initiator == '' || title == '' || type == '' || introduce == '' || price == 0 || phone == '' || phoneError == true) {
      Toast({
        context: this,
        selector: '#t-toast',
        theme: 'warning',
        message: '请校验数据完整性',
        direction: 'column',
      });
    } else {
      // 发送请求创建
      // 上传图片
      for (var i = 0; i < this.data.originFiles.length; i++) {
        wx.uploadFile({
          //请求后台的路径
          url: 'https://swuyu.cn/imgs',
          methods: 'post',
          //小程序本地的路径
          filePath: this.data.originFiles[i].url,
          //后台获取我们图片的key
          name: 'file',
          success: (res) => {
            var img = this.data.transaction.imgs
            this.setData({
              'transaction.imgs': img + "+" + res.data
            })
            console.log(this.data.transaction.imgs);
            //上传成功
          },
          fail: function (res) {
            Toast({
              context: this,
              selector: '#t-toast',
              theme: 'warning',
              message: '图片上传失败',
              direction: 'column',
            });
          },
        })
      }
      setTimeout(() => {
        this.setData({
          'transaction.imgs': this.data.transaction.imgs.slice(1)
        })
        wx.request({
          url: 'https://swuyu.cn/transaction',
          method: "post",
          contentType: 'application/JSON',
          data: {
            initiator: this.data.transaction.initiator,
            title: this.data.transaction.title,
            imgs: this.data.transaction.imgs,
            type: this.data.transaction.type,
            introduce: this.data.transaction.introduce,
            price: this.data.transaction.price,
            phone: this.data.transaction.phone
          },
          success: ({ data: res }) => {
            this.cleardata()
          },
        })
      }, "3000");
    }
  },
  foundSubmit() {
    const phoneError = this.data.phoneError
    const { initiator, title, type, introduce, phone } = this.data.found;
    console.log(this.data.found);
    if (initiator == '' || title == '' || type == '' || introduce == '' || phone == '' || phoneError == true) {
      Toast({
        context: this,
        selector: '#t-toast',
        theme: 'warning',
        message: '请校验数据完整性',
        direction: 'column',
      });
    } else {
      // 发送请求创建
      // 上传图片
      for (var i = 0; i < this.data.originFiles.length; i++) {
        wx.uploadFile({
          //请求后台的路径
          url: 'https://swuyu.cn/imgs',
          methods: 'post',
          //小程序本地的路径
          filePath: this.data.originFiles[i].url,
          //后台获取我们图片的key
          name: 'file',
          success: (res) => {
            var img = this.data.found.imgs
            this.setData({
              'found.imgs': img + "+" + res.data
            })
            console.log(this.data.found.imgs);
            //上传成功
          },
          fail: function (res) {
            Toast({
              context: this,
              selector: '#t-toast',
              theme: 'warning',
              message: '图片上传失败',
              direction: 'column',
            });
          },
        })
      }
      setTimeout(() => {
        this.setData({
          'found.imgs': this.data.found.imgs.slice(1)
        })
        wx.request({
          url: 'https://swuyu.cn/found',
          method: "post",
          contentType: 'application/JSON',
          data: {
            initiator: this.data.found.initiator,
            title: this.data.found.title,
            imgs: this.data.found.imgs,
            type: this.data.found.type,
            introduce: this.data.found.introduce,
            phone: this.data.found.phone
          },
          success: ({ data: res }) => {
            this.cleardata()
          },
        })
      }, "3000");
    }
  },
  recycleSubmit() {
    const phoneError = this.data.phoneError
    const { initiator, place, time, type, phone } = this.data.recycle;
    console.log(this.data.recycle);
    if (initiator == '' || place == '' || time == '' || type == '' || phone == '' || phoneError == true) {
      Toast({
        context: this,
        selector: '#t-toast',
        theme: 'warning',
        message: '请校验数据完整性',
        direction: 'column',
      });
    } else {
      wx.request({
        url: 'https://swuyu.cn/recycle',
        method: "post",
        contentType: 'application/JSON',
        data: {
          initiator: this.data.recycle.initiator,
          place: this.data.recycle.place,
          time: this.data.recycle.time,
          type: this.data.recycle.type,
          phone: this.data.recycle.phone,
          remarks: this.data.recycle.remarks
        },
        success: ({ data: res }) => {
          this.cleardata()
        },
      })
    }
  },
  maintainSubmit() {
    const phoneError = this.data.phoneError
    const { initiator, place, time, type, phone, mode } = this.data.maintain;
    console.log(this.data.maintain);
    if (initiator == '' || place == '' || time == '' || type == '' || phone == '' || mode == '' || phoneError == true) {
      Toast({
        context: this,
        selector: '#t-toast',
        theme: 'warning',
        message: '请校验数据完整性',
        direction: 'column',
      });
    } else {
      wx.request({
        url: 'https://swuyu.cn/maintain',
        method: "post",
        contentType: 'application/JSON',
        data: {
          mode: this.data.maintain.mode,
          initiator: this.data.maintain.initiator,
          place: this.data.maintain.place,
          time: this.data.maintain.time,
          type: this.data.maintain.type,
          phone: this.data.maintain.phone,
          remarks: this.data.maintain.remarks
        },
        success: ({ data: res }) => {
          this.cleardata()
        },
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const userInof = wx.getStorageSync('userInfo')
    this.setData({
      userInof: userInof,
      'transaction.initiator': userInof.openid,
      'found.initiator': userInof.openid,
      'recycle.initiator': userInof.openid,
      'maintain.initiator': userInof.openid
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