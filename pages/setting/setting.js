import Toast from 'tdesign-miniprogram/toast/index';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    phoneError: false,
    phone: '',
    userName: '',
    place: '',
    picture: '',
    fileList: [],
    mode: '',
    dateVisible: false,
    date: new Date('2000-01-01').getTime(), // 支持时间戳传入
    dateText: '',
    // 指定选择区间起始值
    start: '1980-01-01 00:00:00',
    end: '2050-01-01 12:12:12',
  },
  release() {
    const { userName, phone, dateText, place, fileList, phoneError,picture } = this.data;
    if (userName == '' || phone == '' || dateText == '' || place == '' || fileList.length == 0 || phoneError == true) {
      Toast({
        context: this,
        selector: '#t-toast',
        theme: 'warning',
        message: '请校验数据完整性',
        direction: 'column',
      });
    } else {
      if(fileList[0].name == null){
        wx.request({
          url: 'https://swuyu.cn/user',
          method: "post",
          contentType: 'application/JSON',
          data: {
            openid: this.data.openid,
            userName: this.data.userName,
            phone: this.data.phone,
            birthday: this.data.dateText,
            place: this.data.place,
            picture: this.data.picture
          },
          success: ({ data: res }) => {
            console.log(res);
            Toast({
              context: this,
              selector: '#t-toast',
              message: '设置成功',
              direction: 'column',
            });
          },
        })
      }
      wx.uploadFile({
        //请求后台的路径
        url: 'https://swuyu.cn/imgs',
        methods: 'post',
        //小程序本地的路径
        filePath: this.data.fileList[0].url,
        //后台获取我们图片的key
        name: 'file',
        success: (res) => {
          this.setData({
            picture: res.data
          })
          //上传成功
          wx.request({
            url: 'https://swuyu.cn/user',
            method: "post",
            contentType: 'application/JSON',
            data: {
              openid: this.data.openid,
              userName: this.data.userName,
              phone: this.data.phone,
              birthday: this.data.dateText,
              place: this.data.place,
              picture: this.data.picture
            },
            success: ({ data: res }) => {
              console.log(res);
              Toast({
                context: this,
                selector: '#t-toast',
                message: '设置成功',
                direction: 'column',
              });
            },
          })
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
    console.log(userName, phone, dateText, place);
  },
  showPicker(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;
    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });
    this.hidePicker();
  },
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
  // 输入框双向绑定
  handleInputChange(e) {
    // 取出实时的变量值
    let value = e.detail.value;
    let fieldName = e.target.dataset.fieldName;
    this.setData({
      [`${fieldName}`]: value
    })
  },
  handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });
    console.log(this.data.fileList);
  },
  handleRemove(e) {
    const { index } = e.detail;
    const { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const userInof = wx.getStorageSync('userInfo')
    this.setData({
      openid: userInof.openid,
      phone: userInof.phone,
      userName: userInof.userName,
      place: userInof.place,
      picture: userInof.picture,
      dateText: userInof.birthday,
      phoneError: false,
      fileList:[{url:'https://img.swuyu.cn/'+userInof.picture}]
    })
  },
})