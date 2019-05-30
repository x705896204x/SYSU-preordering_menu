const app = getApp();
Page({
  data: {
    navBar: ['全部', '待付款', '已完成', '已取消'],
    currTab: 0,
    orderStatus: ['待付款', '已完成', '已取消']
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    this.setData({
      thisOrder: prevPage.data.totalOrder.array.find(o => o.orderStamp === prevPage.data.detailOrderStamp)
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    const db = wx.cloud.database()
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        this.setData({
          thisOrder: res.data[0].totalOrder.array.find(o => o.orderStamp === prevPage.data.detailOrderStamp)
        })
      },
      fail: res => {
        console.log('failed')
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
