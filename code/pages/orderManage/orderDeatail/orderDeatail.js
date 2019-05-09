// pages/orderManage/orderDeatail.js
Page({
  data:{
    price: "11.5",
    orderNum: 'A88820190501010101',
    appointmentNum: 5,
    appointmentTime: '2019年05月02日  01:01',
    orderTime: '2019年05月01日  12:05',
    hasData: true,
    navTab: ["全部", "待评价", "退款"],
    moneyInfo: [,,,,,,,],
    nickName: '麦当劳',
    phoneNum: '18202801506',
    url: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
    statusImage: ['/images/order/daijiedai.png'],
    statusText: ['待付款', '已完成', '已取消'],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
        title: '订单详情'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})