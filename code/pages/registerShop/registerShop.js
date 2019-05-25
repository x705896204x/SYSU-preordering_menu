// pages/registerShop/registerShop.js
let app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noRegister: true,
    tempFilePaths: ''
  },

  //点击
  onClickRegister: function (e) {
    var phone = e.detail.value.phone;
    var pwd = e.detail.value.pwd;
    var pwdAgain = e.detail.value.pwdAgain;
    var formID = e.detail.formId;
    console.log(e);

    if (!this.checkInput(phone, pwd, pwdAgain)) {
      return;
    }
    let that = this;
    let url = app.globalData.serverAddress + 'registerShoper';
    let data = {
      UserNo: app.globalData.userInfo.UserNo,
      Phone: phone,
      Password: pwd,
      FormID: formID,

    };
    util.HttpGet(url, data, "",
      function (successRes) {
        if (successRes.Code == 1) {
          wx.showToast({
            title: successRes.Message,
          });
          that.setData({
            noRegister: false
          });
        }

      },
      function (failRes) {

      });

  },

  //输入框内容校验
  checkInput: function (phone, pwd, pwdAgain) {
    if (phone == "") {
      wx.showToast({
        title: '手机号不能为空',
      });
      return false;
    } else {
      return true;
    }
  },


  //点击关闭本页
  onClickClose: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onLoad: function () {
  },
  chooseimage1: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  }, 

    chooseimage2: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },   

    chooseimage3: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },

    chooseimage4: function () {
    var _this = this;
    wx.chooseImage({
      count: 4, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  }    
})