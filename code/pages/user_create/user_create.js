// pages/user_create/user_create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    university_name: ["中山大学","清华大学","北京大学"],
    object_university: [
      {
        id: 0,
        name: '中山大学'
      },
      {
        id: 1,
        name: '清华大学'
      },
      {
        id: 2,
        name: '北京大学'
      }
    ],
    index: 0,
    isSelected: false
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      isSelected: true
    })
  },

  bindToIndex(e){
    wx.navigateTo({
      url: '../index/index',
    })
  }

})