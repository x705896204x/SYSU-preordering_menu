//获取应用实例
var app = getApp()
Page({
  data: {
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
    moneyInfo: [,,],
    nickName: '麦当劳',
    phoneNum: '18888888888',
    url: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
    statusImage: ['/images/order/daijiedai.png'],
    currentNavtab:0,
    statusText: ['待付款','已完成','已取消'],
    startPoint:[0,0]
  },

  catchtouchstart:function(e){
    var that = this;
    that.setData({
      startPoint: [e.touches[0].clientX,e.touches[0].clientY]
    })
  },

  catchtouchend:function(e){
    var that = this;
    var currentNum = parseInt(this.data.currentNavtab);

    // that.endX = e.changedTouches[0].clientX;
    // that.endY = e.changedTouches[0].clientY;

    // if(that.endX  - that.startX > 10 && currentNum > 0){
    //   currentNum -= 1;
    // }

    // if(that.endX - that.startX < -10 && currentNum< this.data.navTab.length -1){
    //   currentNum=currentNum + 1;
    // }

    var endPoint = [e.changedTouches[0].clientX,e.changedTouches[0].clientY];
    var startPoint = that.data.startPoint
    if(endPoint[0] <= startPoint[0]) {
      if(Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum< this.data.navTab.length -1) {
         currentNum=currentNum + 1;  
      }
    }else {
      if(Math.abs(endPoint[0] - startPoint[0]) >= Math.abs(endPoint[1] - startPoint[1]) && currentNum > 0) {
          currentNum -= 1;
      }
    }

    this.setData({
      currentNavtab: currentNum
    });
  },

  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },


callEvent: function (e) {
  console.log(e)
  wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
},

goDeatailEvent: function () {
  wx.navigateTo({
      url: '../orderManage/orderDeatail/orderDeatail'
    })
},

// 加载
  onLoad: function () {
    wx.setNavigationBarTitle({
        title: '我的订单'
    })
    var that = this
    //更新数据
      that.setData({
      })
  }
})
