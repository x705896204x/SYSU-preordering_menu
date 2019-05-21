// pages/receiveOrder/orderdetailOwner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "11.5",
    totalIncome: 0.0,
    runningMoney: 0.0,
    publicWelfareMoney: 0.0,
    orderNum: 'A88820190501010101',
    actualTime: '2019年05月02日  01:01',
    appointmentTime: '2019年05月02日  01:01',
    orderTime: '2019年05月01日  12:05',
    hasData: true,
    navTab: ["全部", "待接单", "待取餐"],
    moneyInfo: [,],
    nickName: '顾客昵称',
    phoneNum: '18888888888',
    url: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
    statusImage: ['/images/order/daijiedai.png'],
    currentNavtab: 0,
    statusText: ['全部', '待接单', '待取餐'],
    startPoint: [0],

    itemName:"番茄鸡蛋炒面",
    itemPrice:10,
    itemNum:2
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})