//获取应用实例
var app = getApp()
Page({
  data: {
    navBar: ['全部', '待付款', '已完成', '已取消'],
    currTab: 0,





    price: "11.5",
    totalIncome: 0.0,
    runningMoney: 0.0,
    publicWelfareMoney: 0.0,
    orderNum: 'A88820190501010101',
    appointmentNum: 5,
    appointmentTime: '2019年05月02日  01:01',
    orderTime: '2019年05月01日  12:05',
    hasData: true,
    navTab: ["全部", "待评价", "退款"],
    moneyInfo: [,,,,],
    itemNum : [,,,],
    foodTotal: 3,
    orderStatus: ['待付款', '已完成', '已取消'],
    nickName: '麦当劳',
    food: '麦辣鸡',
    foodNum : 2,
    phoneNum: '18888888888',
    url: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
    statusImage: ['/images/order/daijiedai.png'],
    currentNavtab:0,
    statusText: ['待付款','已完成','已取消'],
    startPoint:[0,0]
    
    
  },

  navBarTap: function (e) {
    this.setData({
      currTab: e.currentTarget.dataset.idx
    })
  },

  onPullDownRefresh: function () {
    //this.myRecordingA(1, answerUrl);
    wx.stopPullDownRefresh();
  },

  goDeatailEvent: function () {
    wx.navigateTo({url: '../orderManage/orderDeatail/orderDeatail'});
  },

})
